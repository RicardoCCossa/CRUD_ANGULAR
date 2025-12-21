import { Component} from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';


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
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      category: ['', [Validators.required]]
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
    this.snackBar.open("Erro ao salvar o curso.", "Fechar", {duration: 1000});
  }

  private onSuccess() {
    this.snackBar.open("Curso salvo com sucesso!", "", { duration: 1000 });
    this.onCancel();
  }

  errorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatorio';
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho minimo precisa ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return `Tamanho maximo excedido de ${requiredLength} caracteres.`;
    }

    return 'Erro';
  }
}
