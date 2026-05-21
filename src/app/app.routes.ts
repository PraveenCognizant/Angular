import { Routes } from '@angular/router';

// ------------------------------------------------------------------
// ANGULAR ROUTING — URL → Component mapping
// ------------------------------------------------------------------
// loadComponent = LAZY LOADING:
//   The component's JavaScript bundle is downloaded ONLY when the user
//   navigates to that route. This makes initial app load faster.
//
// redirectTo = redirect one path to another
// pathMatch: 'full' = only redirect if the ENTIRE path matches
// path: '**' = wildcard — catches any URL that didn't match above
// ------------------------------------------------------------------

export const routes: Routes = [

  // Redirect empty URL → /home
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home',
    loadComponent: () => import('./home/home').then(m => m.Home)
  },
  {
    path: 'components',
    loadComponent: () => import('./components-demo/components-demo').then(m => m.ComponentsDemo)
  },
  {
    path: 'bindings',
    loadComponent: () => import('./bindings-demo/bindings-demo').then(m => m.BindingsDemo)
  },
  {
    path: 'directives',
    loadComponent: () => import('./directives-demo/directives-demo').then(m => m.DirectivesDemo)
  },
  {
    path: 'services',
    loadComponent: () => import('./services-demo/services-demo').then(m => m.ServicesDemo)
  },
  {
    path: 'forms',
    loadComponent: () => import('./forms-demo/forms-demo').then(m => m.FormsDemo)
  },
  {
    path: 'pipes',
    loadComponent: () => import('./pipes-demo/pipes-demo').then(m => m.PipesDemo)
  },
  {
    path: 'signals',
    loadComponent: () => import('./signals-demo/signals-demo').then(m => m.SignalsDemo)
  },
  {
    path: 'lifecycle',
    loadComponent: () => import('./lifecycle-demo/lifecycle-demo').then(m => m.LifecycleDemo)
  },

  // Catch-all: unknown URLs → redirect to home
  { path: '**', redirectTo: 'home' }
];
