import { create } from 'zustand';
import { parseReleases, type ReleaseEntry } from '../utils/parseReleases';

// ═══════════════════════════════════════════════════════
//  MODEL — State Shape
// ═══════════════════════════════════════════════════════

interface ReleasesState {
  releases: ReleaseEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: ReleasesState = {
  releases: [],
  loading: false,
  error: null,
};

// ═══════════════════════════════════════════════════════
//  UPDATE — Actions & Reducer
// ═══════════════════════════════════════════════════════

type ReleasesAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_RELEASES'; payload: ReleaseEntry[] }
  | { type: 'SET_ERROR'; payload: string };

function releasesReducer(state: ReleasesState, action: ReleasesAction): ReleasesState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_RELEASES':
      return { ...state, releases: action.payload, loading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

// ═══════════════════════════════════════════════════════
//  STORE — Zustand with dispatch
// ═══════════════════════════════════════════════════════

interface ReleasesStore extends ReleasesState {
  dispatch: (action: ReleasesAction) => void;
}

const useReleasesStore = create<ReleasesStore>()((set) => ({
  ...initialState,
  dispatch: (action) => set((state) => releasesReducer(state, action)),
}));

// ═══════════════════════════════════════════════════════
//  PUBLIC API — Custom Hook
// ═══════════════════════════════════════════════════════

const RELEASES_URL = '/cally-D/RELEASES.md';

export function useReleases() {
  const releases = useReleasesStore((s) => s.releases);
  const loading = useReleasesStore((s) => s.loading);
  const error = useReleasesStore((s) => s.error);
  const dispatch = useReleasesStore((s) => s.dispatch);

  const fetchReleases = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const res = await fetch(RELEASES_URL);
      if (!res.ok) throw new Error(`Failed to fetch RELEASES.md (${res.status})`);
      const text = await res.text();
      const parsed = parseReleases(text);
      dispatch({ type: 'SET_RELEASES', payload: parsed });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err instanceof Error ? err.message : 'Unknown error' });
    }
  };

  return { releases, loading, error, fetchReleases };
}
