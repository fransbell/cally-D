---
name: zustand-elm-arch
description: >
  Zustand state management with reducer/dispatch pattern and Elm-like architecture
  for feature-driven React projects. Use this skill whenever you are creating or
  editing React components, state management logic, store definitions, or project
  structure. Triggers on: creating a new feature module, writing Zustand stores,
  defining actions/reducers, scaffolding folder structure, separating state from
  view, or when the user mentions "zustand", "store", "reducer", "dispatch",
  "elm architecture", "feature module", "model-driven", or "state management".
  Enforces the pattern: feature-driven folders, reducer-based Zustand stores,
  and strict separation of Model / Update / View.
---

# Zustand + Elm Architecture Skill

## Why This Exists

Most React projects suffer from two problems: **scattered state logic** and
**tightly coupled components**. This skill enforces a disciplined pattern that
solves both:

1. **Zustand with reducer/dispatch** — Centralized, predictable state updates
   using pure reducer functions instead of scattered `setState` calls.
2. **Elm-like architecture** — Strict separation of **Model** (state shape),
   **Update** (reducer logic), and **View** (render components) so that each
   concern is isolated, testable, and replaceable.
3. **Feature-driven folder structure** — Code is organized by business domain,
   not by technical role. Each feature is a self-contained module with its own
   components, hooks, and utilities.

## Architecture Overview

```
┌──────────────────────────────────────────────────┐
│                  Elm Architecture                │
│                                                  │
│   Model (State)     Update (Reducer)    View     │
│   ┌─────────┐      ┌────────────┐    ┌───────┐  │
│   │ State   │─────▶│ Action +   │───▶│ React │  │
│   │ Shape   │      │ Reducer    │    │ Comp  │  │
│   └─────────┘      └────────────┘    └───────┘  │
│       ▲                  │               │       │
│       │                  ▼               │       │
│       └──────────────────┘               │       │
│          (new state)              (dispatch)     │
└──────────────────────────────────────────────────┘
```

The data flows in one direction: **View dispatches Action → Reducer produces
new State → View re-renders**. There are no side effects in reducers. There are
no direct state mutations in components. This is the Elm Architecture applied
to React via Zustand.

## Project Structure

Every feature module lives under `src/features/` and follows this exact layout:

```
src/
├── features/
│   ├── {module_name}/
│   │   ├── components/          # View layer — pure render from state
│   │   │   ├── {Component}.tsx  # React component (template)
│   │   │   └── ...
│   │   ├── hook/                # State layer — Zustand store + actions
│   │   │   ├── use{Module}.ts   # Store definition with dispatch
│   │   │   └── ...
│   │   └── utils/               # Pure functions — business logic, helpers
│   │       ├── {function}.ts    # Stateless utility functions
│   │       └── ...
│   ├── another_module/
│   │   ├── components/
│   │   ├── hook/
│   │   └── utils/
│   └── ...
├── shared/                      # Cross-feature shared code
│   ├── components/              # Shared UI components
│   ├── hooks/                   # Shared hooks (not Zustand stores)
│   └── utils/                   # Shared utilities
├── App.tsx                      # Root component
└── main.tsx                     # Entry point
```

### What Goes Where

| Layer | Directory | Responsibility | Must Be Pure? |
|-------|-----------|---------------|---------------|
| **View** | `components/` | Render UI from state, dispatch actions | Yes (no logic) |
| **State** | `hook/` | Define Zustand store, state shape, dispatch | Reducers: yes |
| **Utils** | `utils/` | Pure business logic, formatters, calculators | Yes |

### File Naming Convention

| Type | Pattern | Example |
|------|---------|---------|
| Component | `{PascalCase}.tsx` | `CounterDisplay.tsx`, `TodoItem.tsx` |
| Store hook | `use{Module}.ts` | `useCounter.ts`, `useTodos.ts` |
| Utility | `{camelCase}.ts` | `formatDate.ts`, `calculateTotal.ts` |
| Action types | Co-located in store hook | Inside `use{Module}.ts` |
| Reducer | Co-located in store hook | Inside `use{Module}.ts` |

## Core Patterns

### 1. State Shape (Model)

Define your state as a plain TypeScript interface. The state should contain only
serializable data — no functions, no class instances, no React elements.

```typescript
// features/counter/hook/useCounter.ts

// ─── Model (State Shape) ───────────────────────────────

interface CounterState {
  count: number;
  step: number;
  history: number[];
}
```

### 2. Actions & Reducer (Update)

Define a discriminated union of actions, then write a **pure reducer function**
that produces the next state. The reducer must not perform side effects.

```typescript
// ─── Actions ───────────────────────────────────────────

type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'RESET' };

// ─── Reducer (pure function) ──────────────────────────

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + state.step,
        history: [...state.history, state.count + state.step],
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - state.step,
        history: [...state.history, state.count - state.step],
      };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}
```

### 3. Zustand Store with Dispatch

Wire the reducer into a Zustand store using a `dispatch` function. This is the
only place state transitions happen — components never call `set` directly.

```typescript
import { create } from 'zustand';

// ─── Initial State ─────────────────────────────────────

const initialState: CounterState = {
  count: 0,
  step: 1,
  history: [],
};

// ─── Store ─────────────────────────────────────────────

interface CounterStore extends CounterState {
  dispatch: (action: CounterAction) => void;
}

const useCounterStore = create<CounterStore>()((set) => ({
  ...initialState,
  dispatch: (action) => set((state) => counterReducer(state, action)),
}));
```

### 4. Custom Hook (Public API)

Wrap the store in a custom hook that exposes a curated API. Components consume
this hook — they never import the store directly.

```typescript
// ─── Public Hook API ───────────────────────────────────

export function useCounter() {
  const count = useCounterStore((s) => s.count);
  const step = useCounterStore((s) => s.step);
  const history = useCounterStore((s) => s.history);
  const dispatch = useCounterStore((s) => s.dispatch);

  return {
    // State (read-only)
    count,
    step,
    history,

    // Actions (dispatch wrappers for convenience)
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
    setStep: (n: number) => dispatch({ type: 'SET_STEP', payload: n }),
    reset: () => dispatch({ type: 'RESET' }),
  };
}
```

### 5. View Component (Template)

Components are pure templates. They read state from the hook and dispatch
actions. They contain **zero business logic** — not even a ternary that decides
formatting. Delegate all logic to `utils/` or the reducer.

```tsx
// features/counter/components/CounterDisplay.tsx

import { useCounter } from '../hook/useCounter';
import { formatCount } from '../utils/formatCount';

export function CounterDisplay() {
  const { count, step, history, increment, decrement, setStep, reset } = useCounter();

  return (
    <div>
      <h1>{formatCount(count)}</h1>
      <p>Step: {step}</p>
      <p>History length: {history.length}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
      <input
        type="number"
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
      />
    </div>
  );
}
```

### 6. Pure Utilities

All derived data, formatting, validation, and business calculations live in
`utils/`. These are plain functions that take input and return output — no
hooks, no state, no side effects.

```typescript
// features/counter/utils/formatCount.ts

export function formatCount(count: number): string {
  if (count < 0) return `-${Math.abs(count)}`;
  if (count === 0) return 'Zero';
  return String(count);
}

export function isCountEven(count: number): boolean {
  return count % 2 === 0;
}
```

## Advanced Patterns

### Async Actions (Effects)

Reducers must be pure. For async operations, use the **effect pattern**:
dispatch a "start" action, perform the async work, then dispatch a "success" or
"error" action.

```typescript
// features/todos/hook/useTodos.ts

type TodosAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Todo[] }
  | { type: 'FETCH_ERROR'; payload: string };

// In the custom hook:
export function useTodos() {
  const dispatch = useTodosStore((s) => s.dispatch);

  const fetchTodos = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const res = await fetch('/api/todos');
      const todos = await res.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: todos });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: String(err) });
    }
  };

  return { fetchTodos, /* ... */ };
}
```

### Cross-Feature Communication

Features should not import each other's stores. When feature A needs to react
to feature B's state, use one of these approaches:

1. **Pass as props** — A parent component reads from both hooks and passes data down.
2. **Shared store** — If two features are tightly coupled, extract a shared store
   into `src/shared/hooks/`.
3. **Event-based** — Use a lightweight event emitter or Zustand's `subscribe` API
   to react to changes without direct imports.

### Computed/Derived State

Do not store derived state in the store. Compute it in `utils/` or inline in
the hook's return value:

```typescript
export function useCounter() {
  const count = useCounterStore((s) => s.count);
  const history = useCounterStore((s) => s.history);

  return {
    count,
    // Derived — computed on every render, not stored
    isEven: isCountEven(count),
    average: calculateAverage(history),
  };
}
```

### Persisting State

Use Zustand's `persist` middleware for features that need localStorage survival:

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...initialSettings,
      dispatch: (action) => set((state) => settingsReducer(state, action)),
    }),
    { name: 'settings-storage' }
  )
);
```

## Dependencies

```json
{
  "dependencies": {
    "zustand": "^5"
  }
}
```

## Rules (Enforced)

These rules are non-negotiable when using this skill:

| # | Rule | Why |
|---|------|-----|
| 1 | **No direct `set` calls in components** | All state transitions go through `dispatch` |
| 2 | **Reducers must be pure** | No side effects, no async, no mutations — only `return newState` |
| 3 | **Components must not contain business logic** | Delegate to `utils/` or the reducer |
| 4 | **One store per feature** | Each feature module owns exactly one Zustand store |
| 5 | **State must be serializable** | No functions, classes, or React elements in state |
| 6 | **Features must not import other features' stores** | Use props or shared stores instead |
| 7 | **Every feature follows the 3-folder structure** | `components/`, `hook/`, `utils/` — no exceptions |
| 8 | **Action types are string enums or discriminated unions** | No numeric action types, no plain objects without `type` |

## Checklist: Creating a New Feature

When scaffolding a new feature module, verify each item:

- [ ] Created `src/features/{name}/` directory
- [ ] Created `components/` subdirectory with `.tsx` files
- [ ] Created `hook/` subdirectory with `use{Name}.ts` store
- [ ] Created `utils/` subdirectory with pure `.ts` functions
- [ ] State interface defined (Model)
- [ ] Action union type defined with `type` discriminant
- [ ] Reducer function is pure — no side effects
- [ ] Zustand store created with `dispatch` method
- [ ] Custom hook wraps store with curated public API
- [ ] Components import only the custom hook, never the raw store
- [ ] No business logic in components — all logic in `utils/` or reducer

## Reference Files

| File | Content |
|------|---------|
| `references/store-template.md` | Full copy-paste Zustand store template with reducer pattern |
| `references/feature-scaffold.md` | Step-by-step guide for creating a new feature module |
| `references/elm-architecture.md` | Deep dive into Elm Architecture principles and how they map to React + Zustand |
