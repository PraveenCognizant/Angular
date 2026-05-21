import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
x: any;
// Your array of items for the *ngFor loop
  name: string[] = ['Apple', 'Banana', 'Cherry'];

  // This function runs every time a button or list item is clicked
  fun(value: any) {
    this.x = value; // Assigns the clicked value to 'x'
  }
}
