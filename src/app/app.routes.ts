import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/shell/app-shell.component').then((m) => m.AppShellComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'recursos' },
      {
        path: 'recursos',
        loadComponent: () =>
          import('./features/hub/hub-page.component').then((m) => m.HubPageComponent),
        title: 'Recursos · tokidev',
      },
      {
        path: 'recursos/:id',
        loadComponent: () =>
          import('./features/resource-detail/resource-detail-page.component').then(
            (m) => m.ResourceDetailPageComponent,
          ),
        title: 'Recurso · tokidev',
      },
    ],
  },
];
