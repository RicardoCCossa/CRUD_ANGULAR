import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared-module';

import { ActivatedRoute, Router } from '@angular/router';

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
  displayedColumns = ['name', 'category', 'actions'];
  courses$: Observable<Course[]>;

  constructor(
    private coursesServices: CoursesServices,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courses$ = this.coursesServices.list();
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}

