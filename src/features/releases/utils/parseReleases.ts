// ═══════════════════════════════════════════════════════
//  PURE FUNCTIONS — Release parsing utilities
// ═══════════════════════════════════════════════════════

export interface ReleaseEntry {
  version: string;
  date: string;
  commit: string;
  message: string;
  author: string;
  tag: string;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  message: string;
  commit: string;
}

/**
 * Parse RELEASES.md content into structured release entries.
 * Expects sections in the format:
 *   ## v0.1 — 2026-05-10 06:54 UTC
 *   | **Commit** | `50ae7ca` |
 *   | **Message** | feat: ... |
 *   | **Author** | fransbell |
 *   | **Tag** | v0.1 |
 */
export function parseReleases(markdown: string): ReleaseEntry[] {
  const entries: ReleaseEntry[] = [];
  const sections = markdown.split(/^## /m).slice(1); // skip header before first ##

  for (const section of sections) {
    const headerMatch = section.match(/^(v[\d.]+)\s*[—–-]\s*(.+)$/m);
    if (!headerMatch) continue;

    const version = headerMatch[1].trim();
    const date = headerMatch[2].trim();

    const getField = (name: string): string => {
      const re = new RegExp(`\\|\\s*\\*\\*${name}\\*\\*\\s*\\|\\s*(.+?)\\s*\\|`);
      const m = section.match(re);
      if (!m) return '';
      return m[1].replace(/`/g, '').trim();
    };

    entries.push({
      version,
      date,
      commit: getField('Commit'),
      message: getField('Message'),
      author: getField('Author'),
      tag: getField('Tag'),
    });
  }

  return entries;
}

/**
 * Convert releases into a simplified changelog format.
 * Groups entries by version and extracts the message as the change description.
 */
export function releasesToChangelog(releases: ReleaseEntry[]): ChangelogEntry[] {
  return releases.map((r) => ({
    version: r.version,
    date: r.date,
    message: r.message,
    commit: r.commit,
  }));
}

/**
 * Derive a short change summary from a conventional commit message.
 * Strips the type prefix (feat:, fix:, chore:, etc.) for cleaner display.
 */
export function shortChangeSummary(message: string): string {
  const match = message.match(/^(?:feat|fix|refactor|docs|chore|perf|test|build|ci)(?:\([^)]*\))?:\s*(.+)$/i);
  return match ? match[1] : message;
}

/**
 * Derive the change type from a conventional commit message.
 */
export function changeType(message: string): string {
  const match = message.match(/^(feat|fix|refactor|docs|chore|perf|test|build|ci)(?:\([^)]*\))?:/i);
  return match ? match[1].toLowerCase() : 'other';
}
