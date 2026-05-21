import {
  Component, Input, OnInit, OnChanges, OnDestroy,
  AfterViewInit, AfterContentInit, SimpleChanges, signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';

// ------------------------------------------------------------------
// LIFECYCLE HOOKS — Angular calls these at specific moments
// ------------------------------------------------------------------
// Full order:
//  1. constructor()           class instantiated (DI only, no logic)
//  2. ngOnChanges()           @Input values received/changed
//  3. ngOnInit()              component initialized (best for API calls)
//  4. ngAfterContentInit()    ng-content projected
//  5. ngAfterViewInit()       template + children rendered
//  6. [changes loop]:         ngOnChanges → ngAfterViewChecked
//  7. ngOnDestroy()           component about to be removed (cleanup!)
// ------------------------------------------------------------------


// ─── CHILD COMPONENT — demonstrates ngOnChanges ──────────────────
@Component({
  selector: 'app-lifecycle-child',
  standalone: true,
  template: `
    <div style="border:2px solid #7b1fa2; padding:12px; border-radius:8px; margin-top:10px;">
      <strong style="color:#7b1fa2;">Child Component</strong>
      <p style="margin:6px 0;">Received message: "<em>{{ message }}</em>"</p>
      <p style="font-size:0.8rem; color:#555; margin:0;">ngOnChanges fired: {{ changeCount() }} times</p>
    </div>
  `
})
export class LifecycleChild implements OnChanges, OnInit, OnDestroy {

  // @Input() — parent passes this down to child
  // Every time parent sends a new value, ngOnChanges fires
  @Input() message: string = '';

  changeCount = signal(0);

  ngOnChanges(changes: SimpleChanges) {
    // SimpleChanges has: previousValue, currentValue, firstChange
    const change = changes['message'];
    this.changeCount.update(n => n + 1);
    console.log(`Child ngOnChanges #${this.changeCount()}:`,
      `"${change?.previousValue}" → "${change?.currentValue}"`);
  }

  ngOnInit() {
    console.log('Child ngOnInit — child is ready');
  }

  ngOnDestroy() {
    console.log('Child ngOnDestroy — child removed, cleanup done!');
  }
}


// ─── PARENT / MAIN DEMO COMPONENT ────────────────────────────────
@Component({
  selector: 'app-lifecycle-demo',
  imports: [FormsModule, LifecycleChild],
  templateUrl: './lifecycle-demo.html',
})
export class LifecycleDemo implements OnInit, OnChanges, AfterViewInit, AfterContentInit, OnDestroy {

  logs   = signal<string[]>([]);
  showChild = signal(true);
  messageForChild = signal('First message');
  inputText = '';

  constructor() {
    // Constructor runs FIRST — before ANY Angular lifecycle hooks.
    // Only use it for dependency injection (inject services).
    // Avoid: HTTP calls, DOM access, heavy logic.
    this.log('1. constructor() fired — only use for DI!');
  }

  // ngOnChanges fires when this component receives @Input changes.
  // Since this is a top-level demo (no @Input), it won't fire here.
  ngOnChanges(changes: SimpleChanges) {
    this.log('2. ngOnChanges() — an @Input() changed');
  }

  // MOST IMPORTANT LIFECYCLE HOOK
  // Use for: API calls, initialization, setting up subscriptions
  ngOnInit() {
    this.log('3. ngOnInit() — BEST PLACE for API calls & init logic');
  }

  ngAfterContentInit() {
    this.log('4. ngAfterContentInit() — <ng-content> is ready');
  }

  // Template fully rendered — DOM elements are accessible
  // Use for: @ViewChild DOM queries, third-party library init (charts, maps)
  ngAfterViewInit() {
    this.log('5. ngAfterViewInit() — template rendered, @ViewChild safe to use');
  }

  // Called just before this component is removed from the DOM
  // Use for: unsubscribe from Observables, clearInterval, close WebSocket
  ngOnDestroy() {
    this.log('6. ngOnDestroy() — CLEANUP: unsubscribe, clearInterval, etc.');
  }

  sendMessage() {
    if (this.inputText.trim()) {
      // Updating this signal causes the child's @Input to change
      // → triggers ngOnChanges in the child
      this.messageForChild.set(this.inputText);
    }
  }

  toggleChild() {
    // When showChild becomes false, the child component is DESTROYED (ngOnDestroy fires)
    // When it becomes true again, a NEW child is created (ngOnInit fires)
    this.showChild.update(v => !v);
  }

  private log(msg: string) {
    this.logs.update(logs => [...logs, msg]);
  }
}
