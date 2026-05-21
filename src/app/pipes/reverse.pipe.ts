import { Pipe, PipeTransform } from '@angular/core';

// ------------------------------------------------------------------
// CUSTOM PIPE — ReversePipe
// ------------------------------------------------------------------
// A Pipe transforms display data in templates.
// Template syntax:  {{ value | pipeName : arg1 : arg2 }}
//
// @Pipe marks this class as a pipe.
//   name:  identifier used in templates: {{ text | reverse }}
//   pure:  true (default) = only recalculates when INPUT changes
//          false = recalculates on every change detection cycle (expensive)
// ------------------------------------------------------------------

@Pipe({
  name: 'reverse',   // usage: {{ someString | reverse }}
  standalone: true,
  pure: true,
})
export class ReversePipe implements PipeTransform {

  // transform() is the required method — Angular calls it automatically.
  // First param  = the value being piped (left of |)
  // Extra params = optional arguments (after : in template)
  transform(value: string): string {
    if (!value) return '';
    // Split string into array of characters, reverse it, join back
    return value.split('').reverse().join('');
  }
}
