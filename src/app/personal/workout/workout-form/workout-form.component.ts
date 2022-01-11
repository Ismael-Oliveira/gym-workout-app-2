import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { ExercisesService } from 'src/app/services/exercises.service';
import { UtilService } from 'src/app/services/util.service';
import { Category } from '../../category/category';
import { Exercise } from '../exercise';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styles: []
})
export class WorkoutFormComponent implements OnInit {

  exercise: Exercise;
  category: Category;
  categories: Category[] = [];
  controlHideMessageSuccess = {
    success: false
  }
  errors: Object[] = [];
  id: number;

  constructor(private serviceCategory: CategoriesService, private service: ExercisesService, private util: UtilService, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.exercise = new Exercise();
    this.category = new Category();
    this.getCategories();
  }

  ngOnInit() {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe({
      next: (urlParams) => {
        this.id = urlParams['id'];
        if(this.id) {
          this.service.getExercise(this.id).subscribe({
            next: (response) => {
              this.exercise = response;
            },
            error: (errorResponse) => {
              this.errors = errorResponse.error;
            }
          });
        }
      }
    })
  }

  onSubmit() {
    if(this.exercise.id) {
      this.updateExercise();
    } else {
      this.saveExercise();
    }
  }

  cancelCreateExercise() {
    this.router.navigate(["/personal-workout/list"]);
  }

  getCategories() {
    this.serviceCategory.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response.content;
      }
    })
  }

  saveExercise() {
    this.exercise.category = {'id': 2, 'name': 'Pernas'};
    this.service.save(this.exercise)
    .subscribe({
      next: (response) => {
        this.controlHideMessageSuccess.success = true;
        this.errors = [];
        this.exercise = response;
        this.util.hideMessageSuccess(3000, this.controlHideMessageSuccess, () => {
          this.ngOnInit();
        });
      },
      error: (errorResponse) => {
        this.controlHideMessageSuccess.success = false;
        if (errorResponse.error.status == 400) {
          this.errors.push({error: errorResponse.error.message});
          return;
        }
        this.errors = errorResponse.error;
      }
    });
  }

  private createObjectTosave() {

  }

  private updateExercise() {
    this.service.update(this.exercise)
          .subscribe({
            next: (response) => {
              this.controlHideMessageSuccess.success = true;
              this.errors = [];
              this.exercise = response;
              this.util.hideMessageSuccess(3000, this.controlHideMessageSuccess, () => {
                this.ngOnInit();
              });            
            },
            error: (errorResponse) => {
              this.controlHideMessageSuccess.success = false;
              this.errors = errorResponse.error;
            }
          });
  }
}
