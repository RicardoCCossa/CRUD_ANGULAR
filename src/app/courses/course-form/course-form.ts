import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from "../../shared/shared-module";
import { CoursesServices } from '../services/courses-services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss',
})

export class CourseForm {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private service: CoursesServices,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    })
  }

  onSubmit() {
      this.service.save(this.form.value)
      .subscribe(result => this.onSuccess, error => this.onError())
  }

  onCancel() {

  }

  private onError() {
    this.snackBar.open("Erro ao salvar o curso.", "Fechar", {duration: 5000});
  }

  private onSuccess() {
    this.snackBar.open("Curso salvo com sucesso!", "", { duration: 5000 });
  }
}
