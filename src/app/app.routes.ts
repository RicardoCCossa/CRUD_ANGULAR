
import { CourseForm } from './courses/course-form/course-form';
import { Course } from './courses/model/course';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  { path: 'courses/new', component: CourseForm  },
  {
    path: 'courses',
    loadComponent: () => import('./courses/courses').then(m => m.CoursesComponent)
  }
];
