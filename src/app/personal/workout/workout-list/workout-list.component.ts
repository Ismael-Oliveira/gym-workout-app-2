import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Constants } from 'src/app/constants';
import { ExercisesService } from 'src/app/services/exercises.service';
import { Exercise } from '../exercise';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {

  exercises: Exercise[] = [];
  errorMessageDeleteExercise: String = "";
  selectedExercise: Exercise;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private service: ExercisesService, private router: Router) { }

  ngOnInit() {
    this.getAllExercises();
    this.dtOptions = Constants.CONFIG_DATA_TABLES;
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  newExercise() {
    this.router.navigate(["/personal-workout/form"]);
  }

  getAllExercises(): void {
    this.service.getExercises()
          .subscribe((response: any) => {
            this.exercises = response.content;
            // initiate our data table
            this.dtTrigger.next(true);
          });
  }

  deleteExercise(id) {
    this.service.deleteExercise(id)
          .subscribe({
            next: () => {
              this.dtTrigger.unsubscribe();
              this.ngOnInit();
            },
            error: () => {
              this.errorMessageDeleteExercise = "Erro ao tentar deletar este exercício.";
            }
          });
  }

  prepareToDeleteExercise(exercise) {
    this.selectedExercise = exercise;
  }

}
