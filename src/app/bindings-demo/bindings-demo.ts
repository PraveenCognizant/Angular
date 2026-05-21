import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

// ------------------------------------------------------------------
// DATA BINDING — How data flows between TypeScript class ↔ template
// ------------------------------------------------------------------
// 4 Types of binding:
//
//  1. INTERPOLATION     {{ expression }}         Class → Template (read)
//  2. PROPERTY BINDING  [htmlProperty]="expr"    Class → Template (set)
//  3. EVENT BINDING     (domEvent)="method()"    Template → Class (trigger)
//  4. TWO-WAY BINDING   [(ngModel)]="property"   Both directions (sync)
// ------------------------------------------------------------------

@Component({
  selector: 'app-bindings-demo',
  imports: [FormsModule],   // FormsModule is required for [(ngModel)]
  templateUrl: './bindings-demo.html',
})
export class BindingsDemo {

  // ─── For interpolation and property binding ──────────────────────
  userName = 'Praveen';
  isButtonDisabled = false;
  imageUrl = 'https://angular.io/assets/images/logos/angular/angular.svg';
  highlightColor = '#c8e6c9';

  // ─── For event binding ───────────────────────────────────────────
  clickCount = 0;
  mouseX = 0;
  mouseY = 0;
  lastKey = '';

  // ─── For two-way binding ─────────────────────────────────────────
  liveText = 'Edit me!';

  // ─── Event handlers (called from template via event binding) ─────

  onButtonClick() {
    this.clickCount++;
  }

  onMouseMove(event: MouseEvent) {
    this.mouseX = Math.round(event.offsetX);
    this.mouseY = Math.round(event.offsetY);
  }

  onKeyPress(event: KeyboardEvent) {
    this.lastKey = event.key;
  }

  toggleDisabled() {
    this.isButtonDisabled = !this.isButtonDisabled;
  }
}
