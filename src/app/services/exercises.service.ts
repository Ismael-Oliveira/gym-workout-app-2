import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exercise } from '../personal/workout/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  apiURL: string= environment.apiURLBase + "/api/workouts";

  constructor(private http: HttpClient) { }

  save(exercise: Exercise) : Observable<Exercise> {
    return this.http.post<Exercise>(this.apiURL, exercise);
  }

  update(exercise: Exercise) : Observable<Exercise> {
    return this.http.put<Exercise>(`${this.apiURL}/${exercise.id}`, exercise);
  }

  getExercises() : Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.apiURL);
  }

  getExercise(id: number) : Observable<Exercise> {
    return this.http.get<Exercise>(`${this.apiURL}/${id}`);
  }

  deleteExercise(id: number) : Observable<any> {
    return this.http.delete<Exercise>(`${this.apiURL}/${id}`);
  }
}
