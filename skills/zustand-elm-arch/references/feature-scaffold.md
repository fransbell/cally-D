# Feature Scaffold Guide — Step-by-Step

This guide walks through creating a new feature module from scratch using the
Zustand + Elm Architecture pattern.

---

## Step 1: Create the Folder Structure

```bash
mkdir -p src/features/{module_name}/{components,hook,utils}
```

This creates:

```
src/features/{module_name}/
├── components/     # View layer
├── hook/           # State layer (Zustand store)
└── utils/          # Pure functions
```

---

## Step 2: Define the State Shape (Model)

Create `src/features/{module_name}/hook/use{ModuleName}.ts` and start with the
state interface and initial values.

**Ask yourself:**
- What data does this feature manage?
- What are the loading/error states for async operations?
- Is all data serializable (no functions, no classes)?

**Example:**

```typescript
// features/todos/hook/useTodos.ts

interface TodosState {
  items: Todo[];
  filter: 'all' | 'active' | 'completed';
  isLoading: boolean;
  error: string | null;
}

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

const initialState: TodosState = {
  items: [],
  filter: 'all',
  isLoading: false,
  error: null,
};
```

---

## Step 3: Define Actions & Reducer (Update)

Define every possible state transition as an action in a discriminated union,
then write a pure reducer.

**Ask yourself:**
- What user interactions change state?
- What server responses change state?
- Are there any side effects? (These do NOT go in the reducer.)

**Example:**

```typescript
// ─── Actions ───────────────────────────────────────────

type TodosAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: string }       // id
  | { type: 'REMOVE_TODO'; payload: string }       // id
  | { type: 'SET_FILTER'; payload: TodosState['filter'] }
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Todo[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'RESET' };

// ─── Reducer ───────────────────────────────────────────

function todosReducer(state: TodosState, action: TodosAction): TodosState {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, items: [...state.items, action.payload] };

    case 'TOGGLE_TODO':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, completed: !item.completed }
            : item
        ),
      };

    case 'REMOVE_TODO':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };

    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, items: action.payload };

    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        items: state.items.filter((item) => !item.completed),
      };

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
}
```

---

## Step 4: Create the Zustand Store

Wire the reducer into a Zustand store with a `dispatch` method.

```typescript
import { create } from 'zustand';

interface TodosStore extends TodosState {
  dispatch: (action: TodosAction) => void;
}

const useTodosStore = create<TodosStore>()((set) => ({
  ...initialState,
  dispatch: (action) => set((state) => todosReducer(state, action)),
}));
```

---

## Step 5: Create the Public Hook API

Wrap the store in a custom hook that curates what components can access.

```typescript
export function useTodos() {
  const items = useTodosStore((s) => s.items);
  const filter = useTodosStore((s) => s.filter);
  const isLoading = useTodosStore((s) => s.isLoading);
  const error = useTodosStore((s) => s.error);
  const dispatch = useTodosStore((s) => s.dispatch);

  // Derived state (computed, not stored)
  const filteredItems = filterTodos(items, filter);
  const activeCount = items.filter((i) => !i.completed).length;
  const completedCount = items.filter((i) => i.completed).length;

  // Action creators
  const addTodo = (text: string) => {
    const todo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_TODO', payload: todo });
  };

  const toggleTodo = (id: string) => dispatch({ type: 'TOGGLE_TODO', payload: id });
  const removeTodo = (id: string) => dispatch({ type: 'REMOVE_TODO', payload: id });
  const setFilter = (f: TodosState['filter']) => dispatch({ type: 'SET_FILTER', payload: f });
  const clearCompleted = () => dispatch({ type: 'CLEAR_COMPLETED' });
  const reset = () => dispatch({ type: 'RESET' });

  // Async action
  const fetchTodos = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const res = await fetch('/api/todos');
      const data = await res.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: String(err) });
    }
  };

  return {
    // State
    items: filteredItems,
    allItems: items,
    filter,
    isLoading,
    error,
    activeCount,
    completedCount,

    // Actions
    addTodo,
    toggleTodo,
    removeTodo,
    setFilter,
    clearCompleted,
    reset,
    fetchTodos,
  };
}
```

---

## Step 6: Create Pure Utilities

Put all business logic in `utils/` — filtering, formatting, validation, etc.

```typescript
// features/todos/utils/filterTodos.ts

import type { Todo } from '../hook/useTodos';

export function filterTodos(items: Todo[], filter: 'all' | 'active' | 'completed'): Todo[] {
  switch (filter) {
    case 'active':
      return items.filter((item) => !item.completed);
    case 'completed':
      return items.filter((item) => item.completed);
    case 'all':
    default:
      return items;
  }
}
```

```typescript
// features/todos/utils/formatTodoCount.ts

export function formatTodoCount(active: number, total: number): string {
  if (total === 0) return 'No tasks';
  if (active === 0) return 'All done!';
  return `${active} task${active === 1 ? '' : 's'} remaining`;
}
```

```typescript
// features/todos/utils/validateTodo.ts

export function validateTodoText(text: string): string | null {
  const trimmed = text.trim();
  if (trimmed.length === 0) return 'Task cannot be empty';
  if (trimmed.length > 200) return 'Task is too long (max 200 characters)';
  return null;
}
```

---

## Step 7: Create View Components

Components are pure templates — they read state and dispatch actions. No logic.

```tsx
// features/todos/components/TodoList.tsx

import { useTodos } from '../hook/useTodos';
import { formatTodoCount } from '../utils/formatTodoCount';

export function TodoList() {
  const {
    items,
    filter,
    activeCount,
    completedCount,
    isLoading,
    error,
    addTodo,
    toggleTodo,
    removeTodo,
    setFilter,
    clearCompleted,
    fetchTodos,
  } = useTodos();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>{formatTodoCount(activeCount, items.length)}</h2>

      <TodoInput onSubmit={addTodo} />

      <div>
        {(['all', 'active', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            data-active={filter === f}
          >
            {f}
          </button>
        ))}
      </div>

      <ul>
        {items.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            onToggle={() => toggleTodo(item.id)}
            onRemove={() => removeTodo(item.id)}
          />
        ))}
      </ul>

      {completedCount > 0 && (
        <button onClick={clearCompleted}>
          Clear completed ({completedCount})
        </button>
      )}
    </div>
  );
}
```

```tsx
// features/todos/components/TodoItem.tsx

import type { Todo } from '../hook/useTodos';

interface TodoItemProps {
  item: Todo;
  onToggle: () => void;
  onRemove: () => void;
}

export function TodoItem({ item, onToggle, onRemove }: TodoItemProps) {
  return (
    <li style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
      <span onClick={onToggle}>{item.text}</span>
      <button onClick={onRemove}>×</button>
    </li>
  );
}
```

```tsx
// features/todos/components/TodoInput.tsx

import { useState } from 'react';
import { validateTodoText } from '../utils/validateTodoText';

interface TodoInputProps {
  onSubmit: (text: string) => void;
}

export function TodoInput({ onSubmit }: TodoInputProps) {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateTodoText(text);
    if (validationError) {
      setError(validationError);
      return;
    }
    onSubmit(text);
    setText('');
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      {error && <span>{error}</span>}
      <button type="submit">Add</button>
    </form>
  );
}
```

---

## Step 8: Wire into the App

Import and render your feature's root component in `App.tsx`:

```tsx
// App.tsx

import { TodoList } from './features/todos/components/TodoList';

export function App() {
  return (
    <div>
      <h1>My App</h1>
      <TodoList />
    </div>
  );
}
```

---

## Complete Feature Tree

After all steps, the feature directory looks like:

```
src/features/todos/
├── components/
│   ├── TodoList.tsx       # Main list view
│   ├── TodoItem.tsx       # Single item view
│   └── TodoInput.tsx      # Input form view
├── hook/
│   └── useTodos.ts        # Store + reducer + public API
└── utils/
    ├── filterTodos.ts     # Filtering logic
    ├── formatTodoCount.ts # Formatting display text
    └── validateTodo.ts    # Input validation
```

---

## Quick Scaffold Command

To scaffold a new feature in one step:

```bash
#!/bin/bash
# Usage: ./scaffold-feature.sh <module_name> <ModuleName>

MODULE=$1  # e.g., "todos"
CLASS=$2   # e.g., "Todos"

mkdir -p src/features/$MODULE/{components,hook,utils}

# Create store hook with template
cat > src/features/$MODULE/hook/use${CLASS}.ts << EOF
import { create } from 'zustand';

interface ${CLASS}State {}

const initialState: ${CLASS}State = {};

type ${CLASS}Action =
  | { type: 'RESET' };

function ${MODULE}Reducer(state: ${CLASS}State, action: ${CLASS}Action): ${CLASS}State {
  switch (action.type) {
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

interface ${CLASS}Store extends ${CLASS}State {
  dispatch: (action: ${CLASS}Action) => void;
}

const use${CLASS}Store = create<${CLASS}Store>()((set) => ({
  ...initialState,
  dispatch: (action) => set((state) => ${MODULE}Reducer(state, action)),
}));

export function use${CLASS}() {
  const dispatch = use${CLASS}Store((s) => s.dispatch);

  return {
    reset: () => dispatch({ type: 'RESET' }),
  };
}
EOF

echo "Feature $MODULE scaffolded at src/features/$MODULE/"
```
