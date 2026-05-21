import { Injectable, signal, computed } from '@angular/core';

// ------------------------------------------------------------------
// ANGULAR SERVICE
// ------------------------------------------------------------------
// A Service is a class designed for:
//   ✅ Sharing data/logic between multiple components
//   ✅ API calls (HTTP requests)
//   ✅ Keeping business logic out of components
//   ✅ Being a singleton — one instance shared across the whole app
//
// Services do NOT have templates. They are pure TypeScript.
// ------------------------------------------------------------------

// Defines the shape of a Todo object (TypeScript interface)
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

// @Injectable() marks this class so Angular's DI system can inject it.
// providedIn: 'root' → creates ONE instance for the entire application.
//   - All components that inject this service share the SAME instance.
//   - If Component A adds a todo, Component B will also see it.
@Injectable({ providedIn: 'root' })
export class TodoService {

  // signal() stores reactive state inside the service.
  // 'private' = only this service can directly modify todos.
  // Components call methods like addTodo() — they don't touch the signal directly.
  private todos = signal<Todo[]>([
    { id: 1, text: 'Learn Angular components', done: true },
    { id: 2, text: 'Understand services & DI',  done: false },
    { id: 3, text: 'Practice reactive forms',   done: false },
  ]);

  // computed() creates a DERIVED signal.
  // It automatically recalculates whenever the todos signal changes.
  // Think of it as a "live formula" like Excel.
  readonly completedCount = computed(() =>
    this.todos().filter(t => t.done).length
  );

  readonly totalCount = computed(() => this.todos().length);

  // Returns a read-only view of the signal.
  // Components can READ but cannot call .set() or .update() directly.
  getTodos() {
    return this.todos.asReadonly();
  }

  addTodo(text: string) {
    const newTodo: Todo = {
      id: Date.now(),   // simple unique ID using timestamp
      text: text.trim(),
      done: false,
    };
    // .update() transforms the current value and sets the new one.
    // Spread ...todos creates a new array (immutable update pattern).
    this.todos.update(todos => [...todos, newTodo]);
  }

  toggleTodo(id: number) {
    this.todos.update(todos =>
      // map creates a new array — never mutate the original signal value directly
      todos.map(t => t.id === id ? { ...t, done: !t.done } : t)
    );
  }

  deleteTodo(id: number) {
    this.todos.update(todos => todos.filter(t => t.id !== id));
  }
}
