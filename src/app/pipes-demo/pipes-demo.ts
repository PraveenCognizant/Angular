import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReversePipe } from '../pipes/reverse.pipe';

// ------------------------------------------------------------------
// ANGULAR PIPES — Transform data for display in templates
// ------------------------------------------------------------------
// Pipes do NOT change the actual data — they only change how it LOOKS.
//
// Built-in pipes (from CommonModule / @angular/common):
//   uppercase, lowercase, titlecase, date, currency,
//   number, percent, json, slice, async
//
// Custom pipes: created with @Pipe decorator + PipeTransform
// ------------------------------------------------------------------

@Component({
  selector: 'app-pipes-demo',
  imports: [CommonModule, FormsModule, ReversePipe],
  templateUrl: './pipes-demo.html',
})
export class PipesDemo {

  name    = 'angular framework';
  today   = new Date();
  price   = 1234.5;
  pi      = 3.14159265;
  ratio   = 0.856;

  person = {
    name: 'Praveen',
    role: 'Developer',
    skills: ['Angular', 'TypeScript', 'RxJS']
  };

  textToReverse = 'Hello Angular!';
  customText = 'pipe me!';
}
