
import { Course } from './courses/model/course';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  {
    path: 'courses',
    loadComponent: () => import('./courses/courses').then(m => m.CoursesComponent)
  }
];
