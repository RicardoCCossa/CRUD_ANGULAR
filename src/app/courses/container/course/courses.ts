import { catchError, Observable, of } from 'rxjs';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared-module';

import { ActivatedRoute, Router } from '@angular/router';

import { Course } from '../../model/course';
import { CoursesServices } from '../../services/courses-services';

import { MatDialog } from '@angular/material/dialog';
import { ErrorDialog } from '../../../shared/components/error-dialog/error-dialog';
import { MatIconModule } from '@angular/material/icon';
import { CoursesList } from '../../componentes/courses-list/courses-list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, SharedModule, MatIconModule, CoursesList],
  templateUrl: './courses.html',
  styleUrls: ['./courses.scss'],
})
export class CoursesComponent {
  courses$: Observable<Course[]> | null = null;

  loading = true;

  constructor(
    private coursesServices: CoursesServices,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh() {
    this.courses$ = this.coursesServices.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar cursos.');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialog, {
      // É aqui que passamos os dados para o Dialog:
      data: errorMsg,
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], { relativeTo: this.route });
  }

  onRemove(course: Course) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: 'Tem certeza que deseja remover esse curso?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.coursesServices.remove(course._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Curso removido com sucesso!', 'X', {
              duration: 1000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          },
          (error) => this.onError('Erro ao tentar remover curso')
        );
      }
    });
  }
}
