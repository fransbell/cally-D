# Zustand Store Template — Reducer/Dispatch Pattern

This is a complete, copy-paste-ready template for creating a new Zustand store
using the reducer/dispatch pattern. Replace all `{Module}` and `{module}`
placeholders with your feature name.

---

## Full Template

```typescript
// features/{module}/hook/use{Module}.ts

import { create } from 'zustand';

// ═══════════════════════════════════════════════════════
//  MODEL — State Shape
// ═══════════════════════════════════════════════════════

interface {Module}State {
  // Add your state fields here
  // Rules:
  //   - Only serializable data (primitives, arrays, plain objects)
  //   - No functions, no class instances, no React elements
  //   - Include loading/error states for async operations
  data: unknown[];
  isLoading: boolean;
  error: string | null;
}

const initialState: {Module}State = {
  data: [],
  isLoading: false,
  error: null,
};

// ═══════════════════════════════════════════════════════
//  UPDATE — Actions & Reducer
// ═══════════════════════════════════════════════════════

type {Module}Action =
  | { type: 'SET_DATA'; payload: unknown[] }
  | { type: 'ADD_ITEM'; payload: unknown }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: unknown[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'RESET' };

function {module}Reducer(state: {Module}State, action: {Module}Action): {Module}State {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };

    case 'ADD_ITEM':
      return { ...state, data: [...state.data, action.payload] };

    case 'REMOVE_ITEM':
      return {
        ...state,
        data: state.data.filter((item: any) => item.id !== action.payload),
      };

    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };

    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, data: action.payload };

    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
}

// ═══════════════════════════════════════════════════════
//  STORE — Zustand with dispatch
// ═══════════════════════════════════════════════════════

interface {Module}Store extends {Module}State {
  dispatch: (action: {Module}Action) => void;
}

const use{Module}Store = create<{Module}Store>()((set) => ({
  ...initialState,
  dispatch: (action) => set((state) => {module}Reducer(state, action)),
}));

// ═══════════════════════════════════════════════════════
//  PUBLIC API — Custom Hook
// ═══════════════════════════════════════════════════════

export function use{Module}() {
  // Select only what you need — avoids unnecessary re-renders
  const data = use{Module}Store((s) => s.data);
  const isLoading = use{Module}Store((s) => s.isLoading);
  const error = use{Module}Store((s) => s.error);
  const dispatch = use{Module}Store((s) => s.dispatch);

  // Action creators (convenience wrappers around dispatch)
  const setData = (items: unknown[]) => dispatch({ type: 'SET_DATA', payload: items });
  const addItem = (item: unknown) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const reset = () => dispatch({ type: 'RESET' });

  // Async action (effect pattern — outside reducer)
  const fetchData = async (url: string) => {
    dispatch({ type: 'FETCH_START' });
    try {
      const res = await fetch(url);
      const json = await res.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: json });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: String(err) });
    }
  };

  return {
    // State (read-only)
    data,
    isLoading,
    error,

    // Actions
    setData,
    addItem,
    removeItem,
    reset,
    fetchData,
  };
}
```

---

## Minimal Template (No Async)

For simple, synchronous features:

```typescript
// features/{module}/hook/use{Module}.ts

import { create } from 'zustand';

// ─── Model ─────────────────────────────────────────────

interface {Module}State {
  value: number;
}

const initialState: {Module}State = {
  value: 0,
};

// ─── Update ────────────────────────────────────────────

type {Module}Action =
  | { type: 'SET'; payload: number }
  | { type: 'RESET' };

function {module}Reducer(state: {Module}State, action: {Module}Action): {Module}State {
  switch (action.type) {
    case 'SET':
      return { ...state, value: action.payload };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

// ─── Store ─────────────────────────────────────────────

interface {Module}Store extends {Module}State {
  dispatch: (action: {Module}Action) => void;
}

const use{Module}Store = create<{Module}Store>()((set) => ({
  ...initialState,
  dispatch: (action) => set((state) => {module}Reducer(state, action)),
}));

// ─── Public API ────────────────────────────────────────

export function use{Module}() {
  const value = use{Module}Store((s) => s.value);
  const dispatch = use{Module}Store((s) => s.dispatch);

  return {
    value,
    set: (n: number) => dispatch({ type: 'SET', payload: n }),
    reset: () => dispatch({ type: 'RESET' }),
  };
}
```

---

## With Persistence

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const use{Module}Store = create<{Module}Store>()(
  persist(
    (set) => ({
      ...initialState,
      dispatch: (action) => set((state) => {module}Reducer(state, action)),
    }),
    {
      name: '{module}-storage',  // localStorage key
      // Optionally pick which fields to persist:
      // partialize: (state) => ({ value: state.value }),
    }
  )
);
```

---

## With Immer (Immutable Updates Made Easy)

If your state has deeply nested objects, use Immer to write "mutating" code
that produces immutable updates:

```typescript
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// Reducer can now use "mutations" — Immer converts them to immutable updates
function {module}Reducer(state: Draft<{Module}State>, action: {Module}Action) {
  switch (action.type) {
    case 'UPDATE_NESTED':
      // With Immer, direct mutation is safe:
      state.nested.deep.value = action.payload;
      // No need to spread: { ...state, nested: { ...state.nested, deep: { ... } } }
      break;
    default:
      return state;
  }
}

const use{Module}Store = create<{Module}Store>()(
  immer((set) => ({
    ...initialState,
    dispatch: (action) => set((state) => {module}Reducer(state, action)),
  }))
);
```

Note: When using Immer, the reducer receives a `Draft<T>` instead of `T`, and
you should mutate the draft directly rather than returning a new object (unless
you want to replace the entire state, in which case return the new value).
