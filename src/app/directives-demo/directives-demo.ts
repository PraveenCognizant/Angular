import { Component } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ------------------------------------------------------------------
// DIRECTIVES — Extend HTML with Angular behavior
// ------------------------------------------------------------------
// Two types:
//
//  1. STRUCTURAL directives — add or remove elements from the DOM
//     New syntax (Angular 17+): @if, @for, @switch
//     Old syntax:              *ngIf, *ngFor (still valid)
//
//  2. ATTRIBUTE directives — change appearance/behavior of an element
//     ngClass — add/remove CSS classes conditionally
//     ngStyle — set inline CSS styles dynamically
// ------------------------------------------------------------------

@Component({
  selector: 'app-directives-demo',
  imports: [NgClass, NgStyle, FormsModule],
  templateUrl: './directives-demo.html',
})
export class DirectivesDemo {

  // ─── @if demo ────────────────────────────────────────────────────
  isLoggedIn = false;
  score = 75;

  // ─── @for demo ───────────────────────────────────────────────────
  fruits = ['Apple', 'Banana', 'Cherry', 'Dragonfruit', 'Elderberry'];

  // ─── @switch demo ────────────────────────────────────────────────
  status: 'active' | 'inactive' | 'pending' = 'active';

  // ─── ngClass / ngStyle demo ──────────────────────────────────────
  isHighlighted = false;
  fontSize = 16;

  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  deleteItem(index: number) {
    // splice(start, deleteCount) — removes 1 item at the given index
    this.fruits.splice(index, 1);
  }

  addFruit() {
    const newFruits = ['Mango', 'Grapes', 'Kiwi', 'Papaya'];
    const random = newFruits[Math.floor(Math.random() * newFruits.length)];
    this.fruits.push(random);
  }
}
