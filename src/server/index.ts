import { Hono } from "hono";
import { cors } from "hono/cors";
import { GoogleGenAI } from "@google/genai";

type Bindings = {
  GEMINI_API_KEY: string;
};

declare const caches:
  | {
      default: Cache;
    }
  | undefined;

const app = new Hono<{ Bindings: Bindings }>();

app.use("/api/*", cors());

const SYSTEM_INSTRUCTION = `
You are the personal AI Assistant for Abhinav Chalise, a highly skilled Software Engineer based in Kathmandu, Nepal.
Your persona is a blend of professional expertise, creative problem-solving, and a touch of witty, intellectual charm. You should reflect Abhinav's philosophy of "bridging the gap between concept and code" with scalable, intelligent solutions.

--- PORTFOLIO OWNER BIO ---
Name: Abhinav Chalise
Location: Kathmandu, Nepal
Contact: ac@chaliseabhinav.com.np
Matrix Chat: @chalisez:chaliseabhinav.com.np (https://matrix.to/#/@chalisez:chaliseabhinav.com.np)
Portfolio URL: chalisezabhinav.com.np
Github: github.com/ac17dollars
Linkedin: linkedin.com/in/ac17dollars

Current Role:
- Software Engineer at Lawpath (May 2026 - Present), based in Sydney, NSW, Australia. Works fully remote from Nepal.
  - Focus: Building and improving features across Lawpath's legal-tech platform and its suite of online legal services and offerings.

Work Experience:
- Associate Node Developer at E.K. Solutions (EKbana) (January 2026 - April 2026): Scalable backend architectures and high-performance Node.js systems.
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
1. Tone: Chat-like, casual, friendly, and ultra-concise! You're a brilliant, tech-savvy friend. Keep it punchy and direct.
2. Constraints:
   - BE BRIEF: Aim for under 50 words. Avoid unnecessary headers, fluff, or long intros. Get straight to the point.
   - Use markdown hyperlinks [text](url) for links.
   - For complex code/tasks, politely suggest the [Gemini website](https://gemini.google.com).
   - Use natural, punchy sentence structures.
   - SAFETY & SEARCH: Standard grounding rules apply.
3. Goal: Helpful, ultra-concise, human-like chat.
`;

app.get("/api/health", (c) => {
  return c.json({ status: "ok" });
});

app.post("/api/chat", async (c) => {
  const { history, message } = await c.req.json();
  const apiKey = c.env?.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return c.json({ error: "API Key not configured" }, 500);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.slice(-6).map((msg: any) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      })),
    });

    const result = await chat.sendMessage({
      message: message,
    });

    return c.json({ text: result.text || "I'm pondering... but no response." });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return c.json({ error: "Failed to generate response" }, 500);
  }
});

app.get("/api/github/activity", async (c) => {
  const cache = caches == undefined ? null : caches.default;

  if (cache) {
    const cacheKey = new Request(
      "https://cache.github-activity.local/api/github/activity",
      {
        method: "GET",
      },
    );

    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) {
      const response = new Response(cachedResponse.body, cachedResponse);
      response.headers.set("X-Worker-Cache", "HIT");
      return response;
    }
  }

  try {
    const githubResponse = await fetch(
      "https://api.github.com/users/ac17dollars/events/public",
      {
        headers: {
          "User-Agent": "ac17-portfolio",
        },
      },
    );

    if (!githubResponse.ok) {
      if (githubResponse.status === 403 || githubResponse.status === 429) {
        return c.json({ error: "GitHub API rate limit exceeded" }, 429);
      }
      return c.json({ error: "Failed to fetch GitHub activity" }, 500);
    }

    const events = await githubResponse.json();

    const relevantTypes = new Set([
      "PushEvent",
      "CreateEvent",
      "PullRequestEvent",
      "IssuesEvent",
      "WatchEvent",
    ]);

    const seenRepos = new Set<string>();

    const filteredEvents = events
      .filter((event: any) => {
        if (!relevantTypes.has(event.type)) return false;

        const isMundane = new Set([
          "PushEvent",
          "WatchEvent",
          "CreateEvent",
        ]).has(event.type);
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
          url: `https://github.com/${event.repo.name}`,
        },
        created_at: event.created_at,
        payload: {
          action: event.payload?.action,
          ref: event.payload?.ref,
          ref_type: event.payload?.ref_type,
        },
      }));

    const response = new Response(JSON.stringify(filteredEvents), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
        "X-Worker-Cache": "MISS",
      },
    });

    if (cache && c.executionCtx) {
      const cacheKey = new Request(
        "https://cache.github-activity.local/api/github/activity",
        {
          method: "GET",
        },
      );
      c.executionCtx.waitUntil(cache.put(cacheKey, response.clone()));
    }

    return response;
  } catch (error) {
    console.error("GitHub API Error:", error);
    return c.json({ error: "Failed to fetch GitHub activity" }, 500);
  }
});

export default app;
