import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ═══════════════════════════════════════════════════════
//  MODEL — State Shape
// ═══════════════════════════════════════════════════════

export interface Task {
  id: string;
  title: string;
  description: string;
  laneId: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export interface Lane {
  id: string;
  title: string;
  color: string;
  order: number;
}

interface KanbanState {
  lanes: Lane[];
  tasks: Task[];
  searchQuery: string;
  editingTaskId: string | null;
}

const defaultLanes: Lane[] = [
  { id: 'backlog', title: 'Backlog', color: 'gray', order: 0 },
  { id: 'todo', title: 'To Do', color: 'blue', order: 1 },
  { id: 'in-progress', title: 'In Progress', color: 'yellow', order: 2 },
  { id: 'done', title: 'Done', color: 'green', order: 3 },
];

const defaultTasks: Task[] = [
  {
    id: '1',
    title: 'Set up memory skill',
    description: 'Created skills/memory/ with SKILL.md, bootstrap.sh, save-state.sh, and worklog-schema.md',
    laneId: 'done',
    priority: 'high',
    createdAt: '2026-05-10T08:00:00Z',
    updatedAt: '2026-05-10T08:00:00Z',
  },
  {
    id: '2',
    title: 'Add Vite + React + Mantine UI',
    description: 'Scaffolded Vite project with Mantine UI v7, PostCSS config, and dark theme',
    laneId: 'done',
    priority: 'high',
    createdAt: '2026-05-10T09:00:00Z',
    updatedAt: '2026-05-10T09:00:00Z',
  },
  {
    id: '3',
    title: 'Fix blank page & tree-shaking',
    description: 'Fixed createRoot/render and Rollup tree-shaking bug with React 19 + Mantine',
    laneId: 'done',
    priority: 'high',
    createdAt: '2026-05-10T10:00:00Z',
    updatedAt: '2026-05-10T10:00:00Z',
  },
  {
    id: '4',
    title: 'Create zustand-elm-arch skill',
    description: 'Built skill with SKILL.md, store-template, feature-scaffold, and elm-architecture references',
    laneId: 'done',
    priority: 'medium',
    createdAt: '2026-05-10T11:00:00Z',
    updatedAt: '2026-05-10T11:00:00Z',
  },
  {
    id: '5',
    title: 'Refactor /src to feature-driven',
    description: 'Moved from flat /src to features/{module}/components|hook|utils structure',
    laneId: 'done',
    priority: 'medium',
    createdAt: '2026-05-10T12:00:00Z',
    updatedAt: '2026-05-10T12:00:00Z',
  },
  {
    id: '6',
    title: 'Implement Kanban board',
    description: 'Build interactive Kanban with search, edit, move tasks between lanes',
    laneId: 'in-progress',
    priority: 'high',
    createdAt: '2026-05-10T13:00:00Z',
    updatedAt: '2026-05-10T13:00:00Z',
  },
  {
    id: '7',
    title: 'Add session analytics',
    description: 'Aggregate worklog data to produce usage reports and charts',
    laneId: 'todo',
    priority: 'low',
    createdAt: '2026-05-10T14:00:00Z',
    updatedAt: '2026-05-10T14:00:00Z',
  },
  {
    id: '8',
    title: 'GitHub Actions auto-deploy',
    description: 'Auto-deploy to GitHub Pages on merge to main instead of manual deploy',
    laneId: 'backlog',
    priority: 'medium',
    createdAt: '2026-05-10T15:00:00Z',
    updatedAt: '2026-05-10T15:00:00Z',
  },
  {
    id: '9',
    title: 'Branch protection rules',
    description: 'Enable GitHub branch protection on main to enforce PR-only merges',
    laneId: 'backlog',
    priority: 'low',
    createdAt: '2026-05-10T16:00:00Z',
    updatedAt: '2026-05-10T16:00:00Z',
  },
];

const initialState: KanbanState = {
  lanes: defaultLanes,
  tasks: defaultTasks,
  searchQuery: '',
  editingTaskId: null,
};

// ═══════════════════════════════════════════════════════
//  UPDATE — Actions & Reducer
// ═══════════════════════════════════════════════════════

type KanbanAction =
  | { type: 'ADD_TASK'; payload: { title: string; description: string; laneId: string; priority: Task['priority'] } }
  | { type: 'UPDATE_TASK'; payload: { id: string; title?: string; description?: string; priority?: Task['priority'] } }
  | { type: 'REMOVE_TASK'; payload: string }
  | { type: 'MOVE_TASK'; payload: { taskId: string; toLaneId: string } }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_EDITING'; payload: string | null }
  | { type: 'ADD_LANE'; payload: { title: string; color: string } }
  | { type: 'REMOVE_LANE'; payload: string }
  | { type: 'RESET' };

function kanbanReducer(state: KanbanState, action: KanbanAction): KanbanState {
  switch (action.type) {
    case 'ADD_TASK': {
      const now = new Date().toISOString();
      const task: Task = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        description: action.payload.description,
        laneId: action.payload.laneId,
        priority: action.payload.priority,
        createdAt: now,
        updatedAt: now,
      };
      return { ...state, tasks: [...state.tasks, task] };
    }

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id
            ? { ...t, ...action.payload, id: t.id, updatedAt: new Date().toISOString() }
            : t
        ),
      };

    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };

    case 'MOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.taskId
            ? { ...t, laneId: action.payload.toLaneId, updatedAt: new Date().toISOString() }
            : t
        ),
      };

    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };

    case 'SET_EDITING':
      return { ...state, editingTaskId: action.payload };

    case 'ADD_LANE': {
      const maxOrder = state.lanes.reduce((max, l) => Math.max(max, l.order), -1);
      const lane: Lane = {
        id: action.payload.title.toLowerCase().replace(/\s+/g, '-'),
        title: action.payload.title,
        color: action.payload.color,
        order: maxOrder + 1,
      };
      return { ...state, lanes: [...state.lanes, lane] };
    }

    case 'REMOVE_LANE':
      return {
        ...state,
        lanes: state.lanes.filter((l) => l.id !== action.payload),
        tasks: state.tasks.filter((t) => t.laneId !== action.payload),
      };

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
}

// ═══════════════════════════════════════════════════════
//  STORE — Zustand with dispatch + persist
// ═══════════════════════════════════════════════════════

interface KanbanStore extends KanbanState {
  dispatch: (action: KanbanAction) => void;
}

const useKanbanStore = create<KanbanStore>()(
  persist(
    (set) => ({
      ...initialState,
      dispatch: (action) => set((state) => kanbanReducer(state, action)),
    }),
    { name: 'cally-d-kanban' }
  )
);

// ═══════════════════════════════════════════════════════
//  PUBLIC API — Custom Hook
// ═══════════════════════════════════════════════════════

export function useKanban() {
  const lanes = useKanbanStore((s) => s.lanes);
  const tasks = useKanbanStore((s) => s.tasks);
  const searchQuery = useKanbanStore((s) => s.searchQuery);
  const editingTaskId = useKanbanStore((s) => s.editingTaskId);
  const dispatch = useKanbanStore((s) => s.dispatch);

  // Actions
  const addTask = (title: string, description: string, laneId: string, priority: Task['priority']) =>
    dispatch({ type: 'ADD_TASK', payload: { title, description, laneId, priority } });

  const updateTask = (id: string, updates: Partial<Pick<Task, 'title' | 'description' | 'priority'>>) =>
    dispatch({ type: 'UPDATE_TASK', payload: { id, ...updates } });

  const removeTask = (id: string) =>
    dispatch({ type: 'REMOVE_TASK', payload: id });

  const moveTask = (taskId: string, toLaneId: string) =>
    dispatch({ type: 'MOVE_TASK', payload: { taskId, toLaneId } });

  const setSearch = (query: string) =>
    dispatch({ type: 'SET_SEARCH', payload: query });

  const setEditing = (id: string | null) =>
    dispatch({ type: 'SET_EDITING', payload: id });

  const addLane = (title: string, color: string) =>
    dispatch({ type: 'ADD_LANE', payload: { title, color } });

  const removeLane = (id: string) =>
    dispatch({ type: 'REMOVE_LANE', payload: id });

  const reset = () =>
    dispatch({ type: 'RESET' });

  // Editing task (derived)
  const editingTask = editingTaskId ? tasks.find((t) => t.id === editingTaskId) ?? null : null;

  return {
    // State
    lanes,
    tasks,
    searchQuery,
    editingTaskId,
    editingTask,

    // Actions
    addTask,
    updateTask,
    removeTask,
    moveTask,
    setSearch,
    setEditing,
    addLane,
    removeLane,
    reset,
  };
}
