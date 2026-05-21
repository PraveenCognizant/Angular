import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// ------------------------------------------------------------------
// HOME COMPONENT — Dashboard / Navigation Hub
// ------------------------------------------------------------------
// @Component is a DECORATOR — it turns a plain TypeScript class
// into an Angular component by adding metadata Angular needs.
//
// selector    → the HTML tag you use: <app-home />
// imports     → other components/modules this component needs
// templateUrl → path to the HTML template
// ------------------------------------------------------------------

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
})
export class Home {

  // Array of topic cards shown on the dashboard
  // Each topic links to a learning page
  topics = [
    { title: '1. Components',     route: '/components', desc: 'Decorators, @Input, @Output, lifecycle hooks' },
    { title: '2. Bindings',       route: '/bindings',   desc: 'Interpolation, property, event, two-way' },
    { title: '3. Directives',     route: '/directives', desc: '@if, @for, @switch, ngClass, ngStyle' },
    { title: '4. Services & DI',  route: '/services',   desc: '@Injectable, singleton, inject()' },
    { title: '5. Forms',          route: '/forms',      desc: 'Template-driven & Reactive forms' },
    { title: '6. Pipes',          route: '/pipes',      desc: 'Built-in pipes & custom pipes' },
    { title: '7. Signals',        route: '/signals',    desc: 'signal(), computed(), effect()' },
    { title: '8. Lifecycle Hooks',route: '/lifecycle',  desc: 'ngOnInit, ngOnDestroy & more' },
  ];
}
