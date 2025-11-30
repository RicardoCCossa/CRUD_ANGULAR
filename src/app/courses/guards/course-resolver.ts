import { Course } from './../model/course';
import { ResolveFn } from '@angular/router';
import { CoursesServices } from '../services/courses-services';
import { inject } from '@angular/core';
import { of } from 'rxjs';

export const courseResolver: ResolveFn<Course | boolean> = (route, state) => {

  const service = inject(CoursesServices);

  if (route.params && route.params['id']) {
      return service.loadById(route.params['id']);
  }

  return of({_id: '', name: '', category: ''});
};
