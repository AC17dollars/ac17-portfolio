import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { GoogleGenAI } from "@google/genai";

type Bindings = {
    GEMINI_API_KEY: string;
}

declare const caches: {
    default: Cache;
} | undefined;

const app = new Hono<{ Bindings: Bindings }>();

app.use('/api/*', cors());

const SYSTEM_INSTRUCTION = `
You are the personal AI Assistant for Abhinav Chalise, a highly skilled Software Engineer based in Kathmandu, Nepal.
Your persona is a blend of professional expertise, creative problem-solving, and a touch of witty, intellectual charm. You should reflect Abhinav's philosophy of "bridging the gap between concept and code" with scalable, intelligent solutions.

--- PORTFOLIO OWNER BIO ---
Name: Abhinav Chalise
Location: Kathmandu, Nepal
Contact: abhinav@chalisezabhinav.com.np
Portfolio URL: chalisezabhinav.com.np
Github: github.com/ac17dollars
Linkedin: linkedin.com/in/ac17dollars

Current Role:
- Associate Node Developer at E.K. Solutions (EKbana) (January 2026 - Present)
  - Focus: Scalable backend architectures, high-performance Node.js systems.

Work Experience:
- Frontend Developer at cellapp | Smartpalika (Sept 2025 - Dec 2025): Responsive UIs for digital solutions.
- Software Coordinator at ECAST, Thapathali (April 2023 - May 2024): Led coordination and deployment of software projects.

Education:
- Bachelor of Engineering in Electronics, Communication & Information Engineering
  - Thapathali Campus, IOE, TU (2021 - 2025)
  - Achievement: 80.01% cumulative percentage.
- High School / +2 (Science Stream)
  - Valmiki Shiksha Sadan, NEB (2018 - 2020)
  - Achievement: 3.82 CGPA.

Technical Skills: 
- Backend: Node.js, Python, C++, C#, Embedded Systems.
- Frontend: React, TypeScript, Svelte.
- AI/Vision: YOLOv8, Computer Vision integration.
- Infrastructure: Cloudflare DNS automation, Cloud Infrastructure.
- Tools: TeX/LaTeX (IOE Template author).

--- INTERACTION RULES ---
1. Tone: Professional yet witty. Think "Modern Engineer".
2. Constraints:
   - Keep responses concise (under 100 words) unless asked to elaborate on a technical project.
   - Properly put spacing and paragraph breaks on responses if it is slightly long.
   - For contact details, point to the 'Contact' section or provide the email above.
   - Do not write code for users unless it's a very simple snippet related to his projects.
   - If asked about "Vision Cube", emphasize the YOLOv8 + C# integration provide a demo link https://youtu.be/rlcDXjqy2Vs.
   - If asked about "IOE LaTeX", mention it's the standardized template for Thapathali Campus.
3. Goal: Be a helpful first point of contact for recruiters or curious visitors.
`;

app.get('/api/health', (c) => {
    return c.json({ status: 'ok' });
});

app.post('/api/chat', async (c) => {
    const { history, message } = await c.req.json();
    const apiKey = c.env?.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return c.json({ error: 'API Key not configured' }, 500);
    }

    try {
        const ai = new GoogleGenAI({ apiKey });

        const chat = ai.chats.create({
            model: 'gemini-2.5-flash-lite',
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            },
            history: history.slice(-6).map((msg: any) => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }],
            })),
        });

        const result = await chat.sendMessage({
            message: message
        });

        return c.json({ text: result.text || "I'm pondering... but no response." });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return c.json({ error: 'Failed to generate response' }, 500);
    }
});

app.get('/api/github/activity', async (c) => {
    const cache = typeof caches !== 'undefined' ? caches.default : null;

    if (cache) {
        const cacheKey = new Request('https://cache.github-activity.local/api/github/activity', {
            method: 'GET'
        });

        const cachedResponse = await cache.match(cacheKey);
        if (cachedResponse) {
            const response = new Response(cachedResponse.body, cachedResponse);
            response.headers.set('X-Worker-Cache', 'HIT');
            return response;
        }
    }

    try {
        const githubResponse = await fetch('https://api.github.com/users/ac17dollars/events/public');

        if (!githubResponse.ok) {
            if (githubResponse.status === 403 || githubResponse.status === 429) {
                return c.json({ error: 'GitHub API rate limit exceeded' }, 429);
            }
            return c.json({ error: 'Failed to fetch GitHub activity' }, 500);
        }

        const events = await githubResponse.json();

        const relevantTypes = ['PushEvent', 'CreateEvent', 'PullRequestEvent', 'IssuesEvent', 'WatchEvent'];

        const seenRepos = new Set<string>();

        const filteredEvents = events
            .filter((event: any) => {
                if (!relevantTypes.includes(event.type)) return false;

                const isMundane = ['PushEvent', 'WatchEvent', 'CreateEvent'].includes(event.type);
                if (isMundane) {
                    if (seenRepos.has(event.repo.name)) {
                        return false;
                    }
                    seenRepos.add(event.repo.name);
                }

                return true;
            })
            .slice(0, 4)
            .map((event: any) => ({
                id: event.id,
                type: event.type,
                repo: {
                    name: event.repo.name,
                    url: `https://github.com/${event.repo.name}`
                },
                created_at: event.created_at,
                payload: {
                    action: event.payload?.action,
                    ref: event.payload?.ref,
                    ref_type: event.payload?.ref_type
                }
            }));

        const response = new Response(JSON.stringify(filteredEvents), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=3600',
                'X-Worker-Cache': 'MISS'
            }
        });

        if (cache && c.executionCtx) {
            const cacheKey = new Request('https://cache.github-activity.local/api/github/activity', {
                method: 'GET'
            });
            c.executionCtx.waitUntil(cache.put(cacheKey, response.clone()));
        }

        return response;
    } catch (error) {
        console.error('GitHub API Error:', error);
        return c.json({ error: 'Failed to fetch GitHub activity' }, 500);
    }
});

export default app;
