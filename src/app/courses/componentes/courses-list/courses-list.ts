import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from '../../../shared/shared-module';
import { CategoryPipe } from '../../../shared/pipes/category-pipe';
import { Course } from '../../model/course';

@Component({
  selector: 'app-courses-list',
  imports: [CommonModule,
    SharedModule,
    MatIconModule,
    CategoryPipe,],
  templateUrl: './courses-list.html',
  styleUrl: './courses-list.scss',
})
export class CoursesList {

  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);

  readonly displayedColumns = ['name', 'category', 'actions'];

  //constructor(private route: ActivatedRoute,
    //public dialog: MatDialog, private router: Router,) {}

  onAdd() {
    this.add.emit(true);
  }

  onEdit(course: Course) {
    this.edit.emit(course);
  }

}
