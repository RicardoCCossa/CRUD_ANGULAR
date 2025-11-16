import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CoursesServices {
  constructor(private http: HttpClient) {}

  private readonly API = '/public/assets/courses.json';


 list(): Observable<Course[]> {
    return this.http.get<Course[]>(this.API);
  }
}
