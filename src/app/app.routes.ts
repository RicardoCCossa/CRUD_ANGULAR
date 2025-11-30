
import { CourseForm } from './courses/container/course-form/course-form';
import { Routes } from '@angular/router';
import { courseResolver } from './courses/guards/course-resolver';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  { path: 'courses/new', component: CourseForm, resolve: {course: courseResolver} },
  { path: 'courses/edit/:id', component: CourseForm, resolve: {course: courseResolver} },
  {
    path: 'courses',
    loadComponent: () => import('./courses/container/course/courses').then(m => m.CoursesComponent)
  }
];
