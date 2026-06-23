import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/shell/app-shell.component').then((m) => m.AppShellComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/landing/landing-page.component').then((m) => m.LandingPageComponent),
        title: 'TokiDev · Recursos y Prompts de IA',
      },
      {
        path: 'resources',
        loadComponent: () =>
          import('./features/hub/hub-page.component').then((m) => m.HubPageComponent),
        title: 'Biblioteca · tokidev',
      },
      {
        path: 'resources/:id',
        loadComponent: () =>
          import('./features/resource-detail/resource-detail-page.component').then(
            (m) => m.ResourceDetailPageComponent,
          ),
        title: 'Recurso · tokidev',
      },
    ],
  },
];
