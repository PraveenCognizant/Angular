import {
  Component, Input, Output, EventEmitter,
  OnInit, OnChanges, OnDestroy, AfterViewInit,
  SimpleChanges, signal
} from '@angular/core';

// ------------------------------------------------------------------
// ANGULAR COMPONENTS — THE BUILDING BLOCKS
// ------------------------------------------------------------------
// A component bundles:  HTML template  +  CSS styles  +  TS logic
// Every Angular app is a TREE of components:
//   <app-root>                ← root (always present)
//     <app-home>              ← page component
//       <app-counter-child>   ← reusable child component
// ------------------------------------------------------------------


// ─── CHILD COMPONENT ──────────────────────────────────────────────
// This is a simple child that receives data and fires events

@Component({
  selector: 'app-counter-child',  // used in parent as <app-counter-child>
  standalone: true,
  template: `
    <div style="border:2px solid #4CAF50; padding:14px; border-radius:8px; margin:8px 0;">
      <strong style="color:#2e7d32;">Child Component</strong>

      <!-- Reads @Input values via interpolation {{ }} -->
      <p style="margin:6px 0;">Message from parent: <em>{{ message }}</em></p>
      <p style="margin:6px 0;">Count from parent: <strong>{{ count }}</strong></p>

      <!-- (click) event binding → calls increment() in this component -->
      <button (click)="increment()"
              style="padding:8px 16px; background:#4CAF50; color:white;
                     border:none; border-radius:4px; cursor:pointer;">
        Increment (sends event UP to parent)
      </button>
    </div>
  `
})
export class CounterChild implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  // ─── @Input() ────────────────────────────────────────────────────
  // @Input() lets parent pass data DOWN to this child.
  // Parent template syntax: <app-counter-child [message]="parentMsg" />
  @Input() message: string = '';
  @Input() count: number = 0;

  // ─── @Output() ───────────────────────────────────────────────────
  // @Output() lets child send events UP to parent.
  // Uses EventEmitter<T> where T is the type of data emitted.
  // Parent template syntax: <app-counter-child (clicked)="onClicked($event)" />
  @Output() clicked = new EventEmitter<number>();

  // ─── LIFECYCLE HOOKS ─────────────────────────────────────────────
  // Angular calls these automatically at specific points in time.

  // 1️⃣  Called FIRST — whenever an @Input value changes
  //    SimpleChanges contains old and new value for each changed @Input
  ngOnChanges(changes: SimpleChanges) {
    console.log('Child ngOnChanges — an @Input changed:', changes);
  }

  // 2️⃣  Called ONCE after the first ngOnChanges
  //    Best place to: load data, call APIs, set up subscriptions
  ngOnInit() {
    console.log('Child ngOnInit — component is ready');
  }

  // 3️⃣  Called after the template and all child components are rendered
  //    Safe to use @ViewChild here (DOM elements exist)
  ngAfterViewInit() {
    console.log('Child ngAfterViewInit — template fully rendered');
  }

  // 4️⃣  Called just before component is removed from DOM
  //    Use for: unsubscribing, clearing intervals, releasing resources
  ngOnDestroy() {
    console.log('Child ngOnDestroy — CLEANUP HERE (unsubscribe, clearInterval, etc.)');
  }

  increment() {
    // emit() sends a value to the parent's (clicked) handler
    this.clicked.emit(this.count + 1);
  }
}


// ─── PARENT COMPONENT ─────────────────────────────────────────────
@Component({
  selector: 'app-components-demo',
  imports: [CounterChild],   // ← must import child component to use it
  templateUrl: './components-demo.html',
})
export class ComponentsDemo implements OnInit {

  parentMessage = 'Hello from Parent!';

  // signal() is the modern Angular way to hold reactive state
  // Reading: parentCount()    Writing: parentCount.set(value)
  parentCount = signal(0);

  ngOnInit() {
    console.log('Parent ComponentsDemo initialized');
  }

  // Called when child emits the (clicked) event
  // $event holds the emitted value (a number in this case)
  handleChildClick(newCount: number) {
    this.parentCount.set(newCount);
  }
}
