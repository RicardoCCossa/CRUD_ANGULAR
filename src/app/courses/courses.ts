import { catchError, Observable, of } from 'rxjs';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared-module';

import { ActivatedRoute, Router } from '@angular/router';

import { Course } from './model/course';
import { CoursesServices } from './services/courses-services';

import { MatDialog } from '@angular/material/dialog';
import { ErrorDialog } from '../shared/components/error-dialog/error-dialog';
import { MatIconModule } from '@angular/material/icon';
import { CategoryPipe } from '../shared/pipes/category-pipe';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    CategoryPipe
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
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.courses$ = this.coursesServices.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos.');
        return of([])
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialog, {
      // É aqui que passamos os dados para o Dialog:
      data: errorMsg
    });
  }
  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}

