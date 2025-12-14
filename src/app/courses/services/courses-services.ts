import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CoursesServices {
  constructor(private http: HttpClient) {}

  private readonly API = '/api/courses';


 list(): Observable<Course[]> {
    return this.http.get<Course[]>(this.API).pipe(first(), delay(5000));
  }

  loadById(id: string) {
      return this.http.get<Course>(`${this.API}/${id}`);
  }

  save(record: Partial<Course>) {
    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Course>) {
      return this.http.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>) {
      return this.http.put<Course>(`${this.API}/${record._id}`, record).pipe(first());
  }

  remove(id: string) {
      return this.http.delete(`${this.API}/${id}`).pipe(first());
  }
}
