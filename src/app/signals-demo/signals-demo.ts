import { Component, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';

// ------------------------------------------------------------------
// ANGULAR SIGNALS — Modern Reactivity (Angular 16+ stable)
// ------------------------------------------------------------------
// Before Signals, Angular used Zone.js to detect changes (magic!).
// Signals are explicit — you declare WHAT state exists and Angular
// knows EXACTLY which components to update.
//
//  signal(value)      → reactive state container
//  computed(() => …)  → derived signal, auto-updates when deps change
//  effect(() => …)    → side effect that runs when signals change
//
// Reading a signal:   count()       ← call it like a function
// Writing a signal:   count.set(5)  or  count.update(n => n + 1)
// ------------------------------------------------------------------

@Component({
  selector: 'app-signals-demo',
  imports: [FormsModule],
  templateUrl: './signals-demo.html',
})
export class SignalsDemo {

  // ─── Basic counter signal ─────────────────────────────────────
  count = signal(0);

  // computed() automatically recalculates when count() changes.
  // It is LAZY and CACHED — only recalculates when read after a dep changed.
  double    = computed(() => this.count() * 2);
  isPositive = computed(() => this.count() > 0);
  label     = computed(() => `Count is ${this.count()} (double: ${this.double()})`);

  // ─── Editable name signal ─────────────────────────────────────
  name     = signal('Praveen');
  editMode = signal(false);
  tempName = '';   // plain string (not a signal) — used only during editing

  // ─── Shopping cart with array signal ─────────────────────────
  cart = signal([
    { name: 'Angular Book',     price: 500, qty: 1 },
    { name: 'TypeScript Guide', price: 350, qty: 2 },
    { name: 'RxJS Handbook',    price: 420, qty: 1 },
  ]);

  // computed() works on arrays too — recalculates whenever cart() changes
  cartTotal = computed(() =>
    this.cart().reduce((sum, item) => sum + item.price * item.qty, 0)
  );

  cartCount = computed(() =>
    this.cart().reduce((sum, item) => sum + item.qty, 0)
  );

  constructor() {
    // effect() runs automatically whenever any signal it reads changes.
    // Great for: logging, localStorage sync, analytics, etc.
    // Note: Angular manages effect cleanup automatically.
    effect(() => {
      // This reads count() → so it re-runs every time count changes
      console.log(`[effect] count changed to: ${this.count()}`);
    });
  }

  // ─── Counter methods ─────────────────────────────────────────
  increment() {
    // .update() receives the current value and returns the new value
    this.count.update(n => n + 1);
  }

  decrement() {
    this.count.update(n => n - 1);
  }

  reset() {
    // .set() directly replaces the value
    this.count.set(0);
  }

  // ─── Name edit methods ───────────────────────────────────────
  startEdit() {
    this.tempName = this.name();  // copy current name into temp variable
    this.editMode.set(true);
  }

  saveName() {
    if (this.tempName.trim()) {
      this.name.set(this.tempName);
    }
    this.editMode.set(false);
  }

  cancelEdit() {
    this.editMode.set(false);
  }

  // ─── Cart methods ────────────────────────────────────────────
  changeQty(index: number, delta: number) {
    this.cart.update(items =>
      items.map((item, i) =>
        // Math.max(1, ...) prevents qty from going below 1
        i === index ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  }

  removeItem(index: number) {
    this.cart.update(items => items.filter((_, i) => i !== index));
  }
}
