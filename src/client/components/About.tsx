import React, { useRef, useState, useEffect } from "react";
import { useOnScreen } from "../hooks/useOnScreen";
import type { GitHubEvent } from "../../shared/types";
import {
  GitBranch,
  Star,
  GitPullRequest,
  AlertCircle,
  Code,
} from "lucide-react";

export const About: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);
  const [githubActivity, setGithubActivity] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [rateLimited, setRateLimited] = useState(false);

  useEffect(() => {
    const fetchGithubActivity = async () => {
      try {
        const response = await fetch("/api/github/activity");
        if (response.ok) {
          const data = await response.json();
          setGithubActivity(data);
        } else if (response.status === 429) {
          setRateLimited(true);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub activity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubActivity();
  }, []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case "PushEvent":
        return <GitBranch className="w-3 h-3" />;
      case "WatchEvent":
        return <Star className="w-3 h-3" />;
      case "PullRequestEvent":
        return <GitPullRequest className="w-3 h-3" />;
      case "IssuesEvent":
        return <AlertCircle className="w-3 h-3" />;
      case "CreateEvent":
        return <Code className="w-3 h-3" />;
      default:
        return <Code className="w-3 h-3" />;
    }
  };

  const renderGithubActivity = () => {
    if (loading) {
      return (
        <div className="space-y-2">
          {["gh-skel-a", "gh-skel-b", "gh-skel-c"].map((id) => (
            <div key={id} className="h-6 bg-white/5 rounded animate-pulse" />
          ))}
        </div>
      );
    }
    if (githubActivity.length > 0) {
      return (
        <div className="space-y-3">
          {githubActivity.map((event) => (
            <a
              key={event.id}
              href={event.repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-gray-400 hover:text-brand-accent transition-colors group"
            >
              <span className="text-gray-500 group-hover:text-brand-accent transition-colors">
                {getEventIcon(event.type)}
              </span>
              <span className="font-light">{getEventDescription(event)}</span>
            </a>
          ))}
        </div>
      );
    }
    if (rateLimited) {
      return (
        <p className="text-xs text-gray-500 font-light italic">
          GitHub activity unavailable due to heavy usage. Please allow some time
          for rate limits to reset.
        </p>
      );
    }
    return null;
  };

  const getEventDescription = (event: GitHubEvent) => {
    const repoName = event.repo.name.split("/")[1];
    switch (event.type) {
      case "PushEvent":
        return `Pushed to ${repoName}`;
      case "WatchEvent":
        return `Starred ${repoName}`;
      case "PullRequestEvent":
        return `${event.payload?.action || "Updated"} PR in ${repoName}`;
      case "IssuesEvent":
        return `${event.payload?.action || "Updated"} issue in ${repoName}`;
      case "CreateEvent":
        return `Created ${event.payload?.ref_type || "repo"} in ${repoName}`;
      default:
        return `Activity in ${repoName}`;
    }
  };

  return (
    <section
      id="about"
      className="relative min-h-[80vh] flex items-center justify-center py-20 px-6 md:px-12 bg-brand-dark"
    >
      <div ref={ref} className="max-w-6xl w-full">
        <div
          className={`transition-all duration-1000 ease-out transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] font-sans text-gray-200">
            As an{" "}
            <span className="font-serif italic text-brand-accent">
              Electronics, Communication and Information Engineer
            </span>
            , I specialize in designing{" "}
            <span className="text-gray-400">
              intelligent system architectures
            </span>{" "}
            with an emphasis on{" "}
            <span className="font-serif italic text-white">
              robust, elegant infrastructure.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-20">
          <div className="hidden md:block md:col-span-4 lg:col-span-5">
            <div className="w-full h-px bg-white/10 mt-6"></div>
          </div>
          <div
            className={`md:col-span-8 lg:col-span-7 transition-all duration-1000 delay-300 ease-out transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
          >
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light">
              I specialize in building full-stack applications using{" "}
              <span className="text-white">React</span>,{" "}
              <span className="text-white">Typescript</span>, and{" "}
              <span className="text-white">Node.js</span>, with hands-on
              experience in AI through computer vision projects and implicit
              neural networks.
            </p>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light mt-8">
              Currently working remotely as a{" "}
              <span className="text-brand-accent font-serif italic">
                Software Engineer
              </span>{" "}
              for{" "}
              <a
                href="https://lawpath.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline underline-offset-4"
              >
                Lawpath
              </a>
              , based in Sydney, NSW, Australia.
            </p>

            {/* GitHub Activity */}
            <div className="mt-12">
              <h3 className="text-sm font-sans tracking-widest uppercase text-gray-500 mb-4">
                Recent Activity
              </h3>
              {renderGithubActivity()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
