import { Component} from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';


import { MatSnackBar } from '@angular/material/snack-bar';

import { Location } from '@angular/common';
import { CoursesServices } from '../../services/courses-services';
import { SharedModule } from '../../../shared/shared-module';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss',
})

export class CourseForm {
  form: FormGroup;

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesServices,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      _id: [''],
      name: [''],
      category: ['']
    });

    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    });
  }

  onSubmit() {
      this.service.save(this.form.value)
      .subscribe(result => this.onSuccess(), error => this.onError());
  }

  onCancel() {
      this.location.back();
  }

  private onError() {
    this.snackBar.open("Erro ao salvar o curso.", "Fechar", {duration: 5000});
  }

  private onSuccess() {
    this.snackBar.open("Curso salvo com sucesso!", "", { duration: 5000 });
    this.onCancel();
  }
}
