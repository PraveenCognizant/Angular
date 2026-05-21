### Step 1 — Components (`/components`)

**Files:** `src/app/components-demo/`

A component is the building block of every Angular app.
Learn this first because everything else lives inside a component.

What you will learn:
- What `@Component` decorator does (selector, imports, templateUrl)
- How to pass data **down** from parent to child using `@Input()`
- How to send events **up** from child to parent using `@Output()` + `EventEmitter`
- The lifecycle hooks order: `ngOnChanges` → `ngOnInit` → `ngAfterViewInit` → `ngOnDestroy`

> **Most asked interview question:** *"What is the difference between `@Input` and `@Output`?"*

---

### Step 2 — Data Binding (`/bindings`)

**Files:** `src/app/bindings-demo/`

Binding is how data flows between your TypeScript class and the HTML template.

| Type | Syntax | Direction |
|---|---|---|
| Interpolation | `{{ value }}` | Class → Template |
| Property Binding | `[property]="expr"` | Class → Template |
| Event Binding | `(event)="method()"` | Template → Class |
| Two-Way Binding | `[(ngModel)]="prop"` | Both directions |

> **Most asked interview question:** *"What are the 4 types of data binding in Angular?"*

---

### Step 3 — Directives (`/directives`)

**Files:** `src/app/directives-demo/`

Directives extend HTML with Angular behavior.

- **Structural directives** — add or remove elements from the DOM
  - `@if` / `@else` — show/hide blocks conditionally
  - `@for` — loop over an array
  - `@switch` / `@case` — switch-case blocks
- **Attribute directives** — change appearance of existing elements
  - `[ngClass]` — add/remove CSS classes dynamically
  - `[ngStyle]` — set inline CSS styles dynamically

> **Most asked interview question:** *"What is the difference between structural and attribute directives?"*

---

### Step 4 — Services & Dependency Injection (`/services`)

**Files:** `src/app/services/todo.service.ts`, `src/app/services-demo/`

A Service is a reusable class that holds business logic or shared data.
It is a **singleton** — one instance is shared across the entire app.

What you will learn:
- `@Injectable({ providedIn: 'root' })` — register a singleton service
- `inject(ServiceName)` — modern way to use a service inside a component
- Why services exist: keep components thin, make logic reusable and testable

> **Most asked interview question:** *"What is Dependency Injection in Angular?"*

---

### Step 5 — Forms (`/forms`)

**Files:** `src/app/forms-demo/`

Angular has two ways to build forms:

**Template-Driven Forms** — simpler, logic lives in HTML
- Uses `[(ngModel)]`, `#form="ngForm"`, validation attributes (`required`, `email`)
- Import `FormsModule`

**Reactive Forms** — more powerful, logic lives in TypeScript
- Uses `FormGroup`, `FormControl`, `Validators`
- Import `ReactiveFormsModule`
- Better for complex forms, dynamic fields, and unit testing

> **Most asked interview question:** *"What is the difference between template-driven and reactive forms?"*

---

### Step 6 — Pipes (`/pipes`)

**Files:** `src/app/pipes-demo/`, `src/app/pipes/reverse.pipe.ts`

Pipes transform data for display in the template.
They do **not** change the original value in your class.

```html
{{ price | currency:'INR' }}
{{ name  | uppercase }}
{{ today | date:'dd/MM/yyyy' }}
{{ text  | reverse }}          <!-- custom pipe -->
```

> **Most asked interview question:** *"What is the difference between a pure and impure pipe?"*
> - **Pure (default):** recalculates only when the input value changes
> - **Impure:** recalculates on every change detection cycle (use carefully — expensive)

---

### Step 7 — Signals (`/signals`)

**Files:** `src/app/signals-demo/`

Signals are Angular's modern reactivity system (Angular 16+, stable in 17+).
They make state management simpler and more explicit than Zone.js.

```typescript
count = signal(0);              // create a signal
count()                         // READ  — call it like a function
count.set(5)                    // WRITE — replace value
count.update(n => n + 1)        // WRITE — transform current value

double = computed(() => count() * 2)    // derived signal, auto-updates
effect(() => console.log(count()))      // side effect, runs on change
```

> **Most asked interview question:** *"What are Angular Signals and how do they differ from RxJS Observables?"*

---

### Step 8 — Lifecycle Hooks (`/lifecycle`)

**Files:** `src/app/lifecycle-demo/`

Angular automatically calls these methods at specific moments in a component's life.

| Hook | When it fires | Best used for |
|---|---|---|
| `constructor()` | Class is created | Dependency injection only |
| `ngOnChanges()` | An `@Input()` changes | React to parent data changes |
| `ngOnInit()` | Once, after first render | **API calls, init data** ⭐ |
| `ngAfterViewInit()` | Template + children rendered | `@ViewChild` DOM queries |
| `ngOnDestroy()` | Before component is removed | **Unsubscribe, cleanup** ⭐ |

> **Most asked interview question:** *"What is the difference between `constructor` and `ngOnInit`?"*
>
> **Answer:** `constructor` is called by JavaScript when the class is instantiated — Angular has not yet set up inputs, bindings, or the template. Use it only for injecting services. `ngOnInit` is called by Angular after it has fully initialized the component — this is where you should put API calls, subscriptions, and any setup logic.

---

## Project Structure

```
src/app/
├── app.ts                    ← root component (shell)
├── app.html                  ← navbar + <router-outlet>
├── app.routes.ts             ← URL → component mapping (lazy loaded)
│
├── home/                     ← dashboard page with all links
│
├── components-demo/          ← Step 1: components, @Input, @Output
│
├── bindings-demo/            ← Step 2: interpolation, property, event, two-way
│
├── directives-demo/          ← Step 3: @if, @for, @switch, ngClass, ngStyle
│
├── services/
│   └── todo.service.ts       ← Step 4: the injectable service
├── services-demo/            ← Step 4: using services in a component
│
├── forms-demo/               ← Step 5: template-driven + reactive forms
│
├── pipes/
│   └── reverse.pipe.ts       ← Step 6: custom pipe
├── pipes-demo/               ← Step 6: built-in + custom pipes
│
├── signals-demo/             ← Step 7: signal(), computed(), effect()
│
└── lifecycle-demo/           ← Step 8: lifecycle hooks live demo
```

---

## Quick Interview Answers

**Q: What is Angular?**
A framework for building web applications using TypeScript. It provides components, routing, forms, HTTP, and DI out of the box.

**Q: What is a standalone component?**
A component with `standalone: true` (default in Angular 17+) that does not need an NgModule. It declares its own dependencies in `imports: []`.

**Q: What is lazy loading?**
A route's component bundle is downloaded only when the user navigates to it. In `app.routes.ts` every route uses `loadComponent()` — this is lazy loading.

**Q: What is `providedIn: 'root'`?**
It registers the service with the root injector. Angular creates one instance for the whole app. All components that inject it share the same instance.

**Q: What is the `async` pipe?**
It subscribes to an Observable or Promise and returns its latest value. It also automatically unsubscribes when the component is destroyed.

**Q: What is change detection?**
The process Angular uses to check if the UI needs to be updated. With Signals, Angular knows exactly which components changed. With Zone.js (the old way), it checked everything.

---

## Angular Version

This app uses **Angular 21** with standalone components (no NgModules required).