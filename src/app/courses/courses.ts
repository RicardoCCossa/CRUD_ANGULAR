import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared-module';

import { Course } from './model/course';
import { CoursesServices } from './services/courses-services';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
  ],
  templateUrl: './courses.html',
  styleUrls: ['./courses.scss'],
})

export class CoursesComponent {
  displayedColumns = ['name', 'category'];
  courses: Observable<Course[]>;

  constructor(private coursesServices: CoursesServices) {
    this.courses = this.coursesServices.list();
  }
}

