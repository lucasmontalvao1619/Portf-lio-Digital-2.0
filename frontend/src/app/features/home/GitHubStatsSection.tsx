import { useEffect, useState } from "react";
import { ArrowUpRight, GitFork, Github, Star } from "lucide-react";
import { Reveal, SectionHeader } from "../../components/common/Common";
import type { Tr } from "../../data/content";

interface GitHubStatsPayload {
  profile: {
    login: string;
    name?: string | null;
    bio?: string | null;
    avatarUrl: string;
    htmlUrl: string;
    publicRepos: number;
    followers: number;
    following: number;
  };
  totals: {
    totalStars: number;
    totalForks: number;
    totalRepositories: number;
  };
  topLanguages: Array<{
    name: string;
    repositoryCount: number;
    percentage: number;
  }>;
  topRepositories: Array<{
    name: string;
    description?: string | null;
    stars: number;
    forks: number;
    language?: string | null;
    htmlUrl: string;
    updatedAt: string;
  }>;
  generatedAt: string;
}

function getStatsEndpoint(): string | null {
  const dotnetBase = import.meta.env.VITE_DOTNET_BASE_URL?.trim();
  if (dotnetBase) {
    return `${dotnetBase.replace(/\/+$/, "")}/api/github/stats`;
  }
  return import.meta.env.DEV ? "http://localhost:5272/api/github/stats" : null;
}

const ENDPOINT = getStatsEndpoint();

export function GitHubStatsSection({ tr }: { tr: Tr }) {
  const [stats, setStats] = useState<GitHubStatsPayload | null>(null);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!ENDPOINT) {
      setStatus("error");
      return;
    }

    const controller = new AbortController();

    (async () => {
      try {
        const response = await fetch(ENDPOINT, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload = (await response.json()) as GitHubStatsPayload;
        setStats(payload);
        setStatus("success");
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        setStatus("error");
      }
    })();

    return () => controller.abort();
  }, []);

  if (status === "error") {
    return null;
  }

  return (
    <section id="github" className="py-24 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={tr.github.title} subtitle={tr.github.subtitle} />

        {status === "loading" || !stats ? (
          <GitHubSkeleton />
        ) : (
          <GitHubContent stats={stats} tr={tr} />
        )}
      </div>
    </section>
  );
}

function GitHubContent({ stats, tr }: { stats: GitHubStatsPayload; tr: Tr }) {
  const displayName = stats.profile.name?.trim() || stats.profile.login;
  const bio = stats.profile.bio?.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).join(" · ");

  return (
    <div className="grid md:grid-cols-[280px_1fr] gap-10 md:gap-14 items-start">
      <Reveal>
        <a
          href={stats.profile.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-[20px] border p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_18px_44px_rgba(0,0,0,0.24)]"
          style={{ background: "var(--skills-card-background)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-4 mb-5">
            <img
              src={stats.profile.avatarUrl}
              alt={displayName}
              width={56}
              height={56}
              loading="lazy"
              className="rounded-full border"
              style={{ borderColor: "var(--border)" }}
            />
            <div className="min-w-0">
              <p className="font-medium text-foreground truncate">{displayName}</p>
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground/75 truncate">
                @{stats.profile.login}
              </p>
            </div>
          </div>
          {bio && <p className="text-xs leading-5 text-muted-foreground mb-5 line-clamp-3">{bio}</p>}
          <div className="grid grid-cols-3 gap-2 text-center">
            <ProfileMetric label={tr.github.repos} value={stats.profile.publicRepos} />
            <ProfileMetric label={tr.github.followers} value={stats.profile.followers} />
            <ProfileMetric label={tr.github.following} value={stats.profile.following} />
          </div>
          <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors">
            <Github size={11} strokeWidth={1.5} />
            <span>{tr.github.openProfile}</span>
            <ArrowUpRight size={11} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </div>
        </a>
      </Reveal>

      <div className="flex flex-col gap-10">
        <Reveal delay={80}>
          <div className="grid grid-cols-3 gap-4">
            <TotalCard label={tr.github.totalRepos} value={stats.totals.totalRepositories} />
            <TotalCard label={tr.github.totalStars} value={stats.totals.totalStars} icon={<Star size={12} strokeWidth={1.5} />} />
            <TotalCard label={tr.github.totalForks} value={stats.totals.totalForks} icon={<GitFork size={12} strokeWidth={1.5} />} />
          </div>
        </Reveal>

        {stats.topLanguages.length > 0 && (
          <Reveal delay={140}>
            <div className="rounded-[20px] border p-6 sm:p-7" style={{ background: "var(--skills-card-background)", borderColor: "var(--border)" }}>
              <p className="font-mono text-[10px] tracking-[0.26em] text-muted-foreground/75 uppercase mb-5">
                {tr.github.topLanguages}
              </p>
              <div className="flex flex-col gap-3">
                {stats.topLanguages.map((language) => (
                  <div key={language.name}>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-sm text-foreground">{language.name}</span>
                      <span className="font-mono text-[10px] text-muted-foreground/70">{language.percentage.toFixed(1)}%</span>
                    </div>
                    <div className="h-[3px] w-full overflow-hidden rounded-full" style={{ background: "var(--border)" }}>
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(100, language.percentage)}%`, background: "var(--foreground)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {stats.topRepositories.length > 0 && (
          <Reveal delay={200}>
            <div>
              <p className="font-mono text-[10px] tracking-[0.26em] text-muted-foreground/75 uppercase mb-5">
                {tr.github.topRepos}
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {stats.topRepositories.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-2 rounded-[16px] border p-5 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_18px_44px_rgba(0,0,0,0.22)]"
                    style={{ background: "var(--skills-card-background)", borderColor: "var(--border)" }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-sm font-medium text-foreground truncate">{repo.name}</span>
                      <ArrowUpRight size={12} className="text-muted-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                    {repo.description && (
                      <p className="text-xs leading-5 text-muted-foreground line-clamp-2">{repo.description}</p>
                    )}
                    <div className="flex items-center gap-3 mt-auto pt-2 text-[10px] font-mono text-muted-foreground/70 uppercase tracking-[0.15em]">
                      {repo.language && <span className="truncate">{repo.language}</span>}
                      <span className="inline-flex items-center gap-1">
                        <Star size={9} strokeWidth={1.5} />
                        {repo.stars}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <GitFork size={9} strokeWidth={1.5} />
                        {repo.forks}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}

function ProfileMetric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-lg font-medium text-foreground leading-none">{value}</p>
      <p className="mt-1 font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground/70">{label}</p>
    </div>
  );
}

function TotalCard({ label, value, icon }: { label: string; value: number; icon?: React.ReactNode }) {
  return (
    <div
      className="rounded-[16px] border px-5 py-6 text-center"
      style={{ background: "var(--skills-card-background)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center justify-center gap-1.5 text-muted-foreground/60 mb-2">
        {icon}
        <span className="font-mono text-[9px] tracking-[0.24em] uppercase">{label}</span>
      </div>
      <p className="text-2xl font-medium text-foreground leading-none">{value}</p>
    </div>
  );
}

function GitHubSkeleton() {
  return (
    <div className="grid md:grid-cols-[280px_1fr] gap-10 md:gap-14 items-start">
      <div
        className="rounded-[20px] border p-6 h-64 animate-pulse"
        style={{ background: "var(--skills-card-background)", borderColor: "var(--border)" }}
      />
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((n) => (
            <div
              key={n}
              className="rounded-[16px] border h-24 animate-pulse"
              style={{ background: "var(--skills-card-background)", borderColor: "var(--border)" }}
            />
          ))}
        </div>
        <div
          className="rounded-[20px] border h-40 animate-pulse"
          style={{ background: "var(--skills-card-background)", borderColor: "var(--border)" }}
        />
      </div>
    </div>
  );
}
