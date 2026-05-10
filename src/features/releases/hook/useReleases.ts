// ═══════════════════════════════════════════════════════
//  STATIC DATA — RELEASES.md baked in at build time
//  Vite ?raw import inlines the file content as a string
// ═══════════════════════════════════════════════════════

import releasesRaw from '../../../../RELEASES.md?raw';
import { parseReleases, type ReleaseEntry } from '../utils/parseReleases';

/**
 * Parse RELEASES.md once at module load time (build-time inlined).
 * No runtime fetch, no async, no loading states needed.
 */
const releases: ReleaseEntry[] = parseReleases(releasesRaw);

/** Latest release entry (or null if none) */
const latestRelease: ReleaseEntry | null = releases[0] ?? null;

/** Current version tag (e.g. "v0.2") */
const currentVersion: string = latestRelease?.tag ?? 'v0.0';

/**
 * Static hook — returns pre-parsed release data.
 * All data is baked into the JS bundle at build time.
 */
export function useReleases() {
  return { releases, latestRelease, currentVersion };
}
