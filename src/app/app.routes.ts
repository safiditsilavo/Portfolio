import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then(m => m.Home),
    title: 'Accueil — Dev Portal',
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about').then(m => m.About),
    title: 'À propos — Dev Portal',
  },
  {
    path: 'skills',
    loadComponent: () => import('./features/skills/skills').then(m => m.Skills),
    title: 'Compétences — Dev Portal',
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects').then(m => m.Projects),
    title: 'Projets — Dev Portal',
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then(m => m.Contact),
    title: 'Contact — Dev Portal',
  },
  { path: '**', redirectTo: '' },
];