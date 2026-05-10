# Elm Architecture — Deep Dive for React + Zustand

## What Is the Elm Architecture?

The Elm Architecture is a pattern for building web applications that enforces a
strict unidirectional data flow. It was popularized by the Elm programming
language, but the core idea is language-agnostic and applies perfectly to React
with Zustand.

The architecture divides every feature into three cleanly separated parts:

| Part | Name | Responsibility | Analogy |
|------|------|---------------|---------|
| **Model** | State | The data your application manages | A database row |
| **Update** | Reducer | How state changes in response to actions | A stored procedure |
| **View** | Component | What the user sees and interacts with | A template/page |

The data flows in a single direction:

```
    ┌──────────────────────────────────────────────┐
    │                                              │
    ▼                                              │
 ┌──────┐    dispatch     ┌────────┐   new state   │
 │ View │ ──────────────▶ │ Update │ ───────────── │
 └──────┘                 └────────┘                │
    │                                                │
    │  (user sees new state,                         │
    │   dispatches new actions)                      │
    └────────────────────────────────────────────────┘
```

## Why Elm Architecture Matters

### The Problem It Solves

In a typical React application without discipline:

- **State is scattered** across `useState`, `useReducer`, Context, and prop drilling
- **Logic is mixed** into components alongside rendering code
- **Side effects happen everywhere** — in event handlers, in effects, in callbacks
- **Testing is painful** because logic can't be isolated from the UI
- **Refactoring is risky** because everything is coupled

### What Elm Architecture Gives You

| Benefit | How |
|---------|-----|
| **Predictability** | State only changes through dispatched actions. Every transition is traceable. |
| **Testability** | Reducers are pure functions — test them with plain assertions, no mocking needed. |
| **Separation of concerns** | View renders state. Reducer transforms state. Utils compute derived data. Each layer has one job. |
| **Debuggability** | Log every action + state snapshot to reproduce any bug. |
| **Refactoring safety** | Change the view without touching state logic. Change state logic without touching the view. |

## Mapping Elm to React + Zustand

| Elm Concept | React + Zustand Equivalent | File Location |
|-------------|---------------------------|---------------|
| `type Model` | TypeScript `interface State` | `hook/use{Module}.ts` |
| `init : Model` | `const initialState: State = { ... }` | `hook/use{Module}.ts` |
| `type Msg` | TypeScript `type Action = ...` (discriminated union) | `hook/use{Module}.ts` |
| `update : Msg -> Model -> Model` | `function reducer(state, action): State` | `hook/use{Module}.ts` |
| `view : Model -> Html Msg` | React component using `use{Module}()` hook | `components/{Name}.tsx` |
| Helper functions | Pure utility functions in `utils/` | `utils/{name}.ts` |

### Elm Side-by-Side

**Elm:**
```elm
type Msg = Increment | Decrement

update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment -> { model | count = model.count + 1 }
    Decrement -> { model | count = model.count - 1 }

view : Model -> Html Msg
view model =
  div []
    [ button [ onClick Decrement ] [ text "-" ]
    , text (String.fromInt model.count)
    , button [ onClick Increment ] [ text "+" ]
    ]
```

**React + Zustand:**
```typescript
type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT': return { ...state, count: state.count + 1 };
    case 'DECREMENT': return { ...state, count: state.count - 1 };
  }
}

function CounterView() {
  const { count, increment, decrement } = useCounter();
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

The mapping is direct and mechanical. Every Elm concept has a one-to-one
equivalent in our React + Zustand pattern.

## The Three Layers in Detail

### Layer 1: Model (State)

The Model is the single source of truth for a feature. It is a plain TypeScript
interface containing only serializable data.

**Rules:**
1. **No functions** — State should be JSON-serializable. No callbacks, no class methods.
2. **No derived data** — Computed values (like `fullName` from `firstName + lastName`) are calculated in utils or the hook, not stored.
3. **Include UI state** — Loading indicators, error messages, selected items, form state — these are all part of the model.
4. **Flat is better than nested** — Prefer a flat structure with IDs referencing other entities over deeply nested objects.

**Good Model:**
```typescript
interface TodosState {
  items: Record<string, Todo>;    // Normalized by ID
  ids: string[];                  // Ordered list of IDs
  filter: 'all' | 'active' | 'completed';
  isLoading: boolean;
  error: string | null;
}
```

**Bad Model (avoid):**
```typescript
interface TodosState {
  items: Todo[];                          // Not normalized — slow lookups
  filteredItems: Todo[];                  // Derived — should be computed, not stored
  onItemClick: (id: string) => void;      // Function — not serializable
  formRef: React.RefObject<HTMLFormElement>; // React ref — not serializable
}
```

### Layer 2: Update (Reducer)

The Update layer is a **pure function** that takes the current state and an
action, and returns the next state. It is the only way state changes.

**Rules:**
1. **Must be pure** — Same input always produces same output. No `Date.now()`, no `Math.random()`, no API calls.
2. **Must return new state** — Never mutate the input. Always spread/create new objects.
3. **Must handle every action** — The `default` case returns state unchanged.
4. **No side effects** — No console.log, no DOM access, no network requests. Zero.
5. **One reducer per feature** — The reducer owns the entire state shape for its feature.

**When you need side effects** (async, random, timestamps), handle them in the
custom hook wrapper — dispatch a "start" action, perform the effect, then
dispatch "success" or "error":

```
User clicks "Fetch"
       │
       ▼
Component calls fetchTodos()
       │
       ▼
Hook dispatches FETCH_START ──▶ Reducer sets isLoading=true
       │
       ▼
Hook performs async fetch
       │
       ├── Success ──▶ dispatches FETCH_SUCCESS ──▶ Reducer sets data, isLoading=false
       │
       └── Error ────▶ dispatches FETCH_ERROR ────▶ Reducer sets error, isLoading=false
```

### Layer 3: View (Component)

The View is a **pure template** that renders state and dispatches actions. It
should contain zero business logic.

**Rules:**
1. **No business logic** — Calculations, formatting, and validation go in `utils/`.
2. **No direct state mutations** — All state changes go through the hook's action creators.
3. **Read state from hook only** — Components use `use{Module}()` to access state and actions.
4. **Keep components small** — One responsibility per component. Split when a component does too much.

**Good View:**
```tsx
function TodoItem({ item, onToggle, onRemove }: TodoItemProps) {
  return (
    <li>
      <span onClick={onToggle} style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
        {item.text}
      </span>
      <button onClick={onRemove}>×</button>
    </li>
  );
}
```

**Bad View (avoid):**
```tsx
function TodoItem({ item, onToggle, onRemove }: TodoItemProps) {
  // BAD: Business logic in the component
  const isOverdue = new Date(item.dueDate) < new Date();
  const priorityColor = item.priority > 5 ? 'red' : 'green';
  const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(item.dueDate));

  return (
    <li style={{ color: priorityColor }}>
      <span onClick={onToggle}>{item.text}</span>
      <span>Due: {formattedDate}</span>
      {isOverdue && <span>OVERDUE</span>}
      <button onClick={onRemove}>×</button>
    </li>
  );
}
```

**Refactored:**
```tsx
// utils/todoFormatting.ts
export function isOverdue(dueDate: string): boolean {
  return new Date(dueDate) < new Date();
}

export function getPriorityColor(priority: number): string {
  return priority > 5 ? 'red' : 'green';
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(date));
}

// components/TodoItem.tsx
import { isOverdue, getPriorityColor, formatDate } from '../utils/todoFormatting';

function TodoItem({ item, onToggle, onRemove }: TodoItemProps) {
  return (
    <li style={{ color: getPriorityColor(item.priority) }}>
      <span onClick={onToggle}>{item.text}</span>
      <span>Due: {formatDate(item.dueDate)}</span>
      {isOverdue(item.dueDate) && <span>OVERDUE</span>}
      <button onClick={onRemove}>×</button>
    </li>
  );
}
```

Now `isOverdue`, `getPriorityColor`, and `formatDate` are independently
testable, reusable, and don't require rendering a component to verify.

## Comparison with Alternatives

### vs. useState Scattered Across Components

| Aspect | useState (scattered) | Elm Architecture (Zustand) |
|--------|---------------------|---------------------------|
| State location | Spread across many components | Centralized in one store per feature |
| State transitions | Direct `setState` calls | Dispatched actions through reducer |
| Debuggability | Hard to trace state changes | Log actions + state snapshots |
| Testability | Must render component to test | Test reducer as pure function |
| Cross-component sharing | Prop drilling or Context | Import the same hook |

### vs. Redux

| Aspect | Redux | Elm Architecture (Zustand) |
|--------|-------|---------------------------|
| Boilerplate | Actions, reducers, selectors, thunks, slices | Actions, reducer, hook — all in one file |
| Provider wrapping | Must wrap app in `<Provider>` | No provider needed |
| Async | Requires middleware (thunk, saga) | Just `async` functions in the hook |
| Bundle size | ~7KB | ~1KB (Zustand) |
| Learning curve | High (middleware, selectors, connect) | Low (just Zustand + reducer) |

### vs. Jotai / Valtio

| Aspect | Jotai (atomic) | Valtio (proxy) | Elm Architecture (Zustand) |
|--------|---------------|----------------|---------------------------|
| Mental model | Atomic state (like signals) | Mutable state (like Vue) | Unidirectional data flow |
| State transitions | Any component can set | Any component can mutate | Only through dispatched actions |
| Predictability | Medium (scattered setters) | Low (hidden mutations) | High (all transitions in one place) |
| Debugging | Hard to trace mutations | Hard to trace mutations | Easy (log every action) |

## Common Mistakes

### 1. Putting Side Effects in the Reducer

```typescript
// ❌ WRONG
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SAVE':
      fetch('/api/save', { method: 'POST', body: JSON.stringify(state) });
      return { ...state, isSaving: true };
  }
}
```

```typescript
// ✅ CORRECT — Side effect in the hook, not the reducer
export function useModule() {
  const dispatch = useModuleStore((s) => s.dispatch);

  const save = async () => {
    dispatch({ type: 'SAVE_START' });
    try {
      await fetch('/api/save', { method: 'POST', body: JSON.stringify(state) });
      dispatch({ type: 'SAVE_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'SAVE_ERROR', payload: String(err) });
    }
  };

  return { save, /* ... */ };
}
```

### 2. Storing Derived Data in State

```typescript
// ❌ WRONG — fullName is derived from firstName + lastName
interface UserState {
  firstName: string;
  lastName: string;
  fullName: string;  // Stale if firstName/lastName change independently
}
```

```typescript
// ✅ CORRECT — Compute derived data in the hook or utils
interface UserState {
  firstName: string;
  lastName: string;
}

export function useUser() {
  const firstName = useUserStore((s) => s.firstName);
  const lastName = useUserStore((s) => s.lastName);

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,  // Always fresh
  };
}
```

### 3. Components Importing the Raw Store

```typescript
// ❌ WRONG — Component imports store directly
import { useCounterStore } from '../hook/useCounter';

function Counter() {
  const count = useCounterStore((s) => s.count);       // Fragile
  const dispatch = useCounterStore((s) => s.dispatch);  // Exposes too much
}
```

```typescript
// ✅ CORRECT — Component uses the curated public hook
import { useCounter } from '../hook/useCounter';

function Counter() {
  const { count, increment, decrement } = useCounter();  // Clean API
}
```

### 4. Cross-Feature Store Imports

```typescript
// ❌ WRONG — Feature A imports Feature B's store
// features/cart/hook/useCart.ts
import { useProductsStore } from '../../products/hook/useProducts';
```

```typescript
// ✅ CORRECT — Pass data via props from a shared parent
function CartPage() {
  const products = useProducts();
  const cart = useCart();

  return <Cart cart={cart} products={products} />;
}
```

Or extract a shared store into `src/shared/hooks/` if the features are
legimately coupled.
