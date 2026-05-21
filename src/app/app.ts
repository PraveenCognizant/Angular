import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

// ------------------------------------------------------------------
// ROOT COMPONENT — app.ts
// ------------------------------------------------------------------
// This is the ENTRY POINT of the Angular app.
// selector: 'app-root' is placed in index.html as <app-root></app-root>
// Every page component renders INSIDE the <router-outlet> in app.html.
// ------------------------------------------------------------------

@Component({
  selector: 'app-root',
  // RouterOutlet  → renders the current route's component
  // RouterLink    → enables [routerLink] directive for navigation links
  // RouterLinkActive → enables routerLinkActive directive (active class)
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // Top navigation links — looped in the template with @for
  navLinks = [
    { label: 'Home',       path: '/home' },
    { label: 'Components', path: '/components' },
    { label: 'Bindings',   path: '/bindings' },
    { label: 'Directives', path: '/directives' },
    { label: 'Services',   path: '/services' },
    { label: 'Forms',      path: '/forms' },
    { label: 'Pipes',      path: '/pipes' },
    { label: 'Signals',    path: '/signals' },
    { label: 'Lifecycle',  path: '/lifecycle' },
  ];
}
