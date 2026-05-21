import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// ------------------------------------------------------------------
// ANGULAR FORMS — Two approaches
// ------------------------------------------------------------------
//
// 1. TEMPLATE-DRIVEN FORMS
//    • Logic lives in the HTML template (directives)
//    • Uses: NgModel, NgForm, template reference variables
//    • Good for: simple forms, quick prototypes
//    • Import: FormsModule
//
// 2. REACTIVE FORMS (Model-Driven / Programmatic)
//    • Logic lives in the TypeScript class
//    • Uses: FormGroup, FormControl, Validators
//    • Good for: complex forms, dynamic fields, unit testing
//    • Import: ReactiveFormsModule
// ------------------------------------------------------------------

@Component({
  selector: 'app-forms-demo',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './forms-demo.html',
})
export class FormsDemo {

  // ═══════════════════════════════════════════════════════════════
  //  TEMPLATE-DRIVEN FORM
  // ═══════════════════════════════════════════════════════════════
  // Simple object — bound to input fields via [(ngModel)]
  templateData = {
    username: '',
    email: '',
  };

  templateResult = '';

  // Called when the template form is submitted and valid
  onTemplateSubmit(form: any) {
    if (form.valid) {
      this.templateResult = JSON.stringify(this.templateData, null, 2);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  //  REACTIVE FORM
  // ═══════════════════════════════════════════════════════════════

  // FormGroup = container that groups multiple FormControls together
  reactiveForm = new FormGroup({

    // FormControl(initialValue, [validators])
    // Validators is built-in — no need to write custom logic
    fullName: new FormControl('', [
      Validators.required,        // cannot be empty
      Validators.minLength(3),    // minimum 3 characters
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.email,           // must match email format
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      // Validators.pattern = regular expression validation
      // This requires at least one uppercase letter and one digit
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
    ]),
  });

  reactiveResult = '';

  // ─── Getter shortcuts ─────────────────────────────────────────
  // Instead of typing reactiveForm.get('fullName') everywhere,
  // we create getters to keep the template clean.
  get fullName() { return this.reactiveForm.get('fullName')!; }
  get email()    { return this.reactiveForm.get('email')!; }
  get password() { return this.reactiveForm.get('password')!; }

  onReactiveSubmit() {
    if (this.reactiveForm.valid) {
      // .value gives an object with all form field values
      this.reactiveResult = JSON.stringify(this.reactiveForm.value, null, 2);
    } else {
      // markAllAsTouched() triggers validation errors to show
      // (normally errors only show after user touches a field)
      this.reactiveForm.markAllAsTouched();
    }
  }

  resetReactive() {
    this.reactiveForm.reset();
    this.reactiveResult = '';
  }
}
