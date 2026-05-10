import { create } from 'zustand';

// ═══════════════════════════════════════════════════════
//  MODEL — State Shape
// ═══════════════════════════════════════════════════════

export interface Session {
  id: string;
  date: string;
  summary: string;
  tasks: number;
}

interface DashboardState {
  sessions: Session[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  sessions: [
    { id: '1', date: '2026-05-10', summary: 'Set up memory skill & session persistence', tasks: 7 },
  ],
  isLoading: false,
  error: null,
};

// ═══════════════════════════════════════════════════════
//  UPDATE — Actions & Reducer
// ═══════════════════════════════════════════════════════

type DashboardAction =
  | { type: 'ADD_SESSION'; payload: Session }
  | { type: 'SET_SESSIONS'; payload: Session[] }
  | { type: 'RESET' };

function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'ADD_SESSION':
      return { ...state, sessions: [action.payload, ...state.sessions] };
    case 'SET_SESSIONS':
      return { ...state, sessions: action.payload };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

// ═══════════════════════════════════════════════════════
//  STORE — Zustand with dispatch
// ═══════════════════════════════════════════════════════

interface DashboardStore extends DashboardState {
  dispatch: (action: DashboardAction) => void;
}

const useDashboardStore = create<DashboardStore>()((set) => ({
  ...initialState,
  dispatch: (action) => set((state) => dashboardReducer(state, action)),
}));

// ═══════════════════════════════════════════════════════
//  PUBLIC API — Custom Hook
// ═══════════════════════════════════════════════════════

export function useDashboard() {
  const sessions = useDashboardStore((s) => s.sessions);
  const isLoading = useDashboardStore((s) => s.isLoading);
  const error = useDashboardStore((s) => s.error);
  const dispatch = useDashboardStore((s) => s.dispatch);

  return {
    // State (read-only)
    sessions,
    isLoading,
    error,

    // Actions
    addSession: (session: Session) => dispatch({ type: 'ADD_SESSION', payload: session }),
    setSessions: (sessions: Session[]) => dispatch({ type: 'SET_SESSIONS', payload: sessions }),
    reset: () => dispatch({ type: 'RESET' }),
  };
}
