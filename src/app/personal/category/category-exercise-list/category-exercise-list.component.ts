import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from '../category';

@Component({
  selector: 'app-category-exercise-list',
  templateUrl: './category-exercise-list.component.html',
  styleUrls: ['./category-exercise-list.component.css']
})
export class CategoryExerciseListComponent implements OnInit {

  category: Category;
  errors: Object[] = [];
  id: number;

  constructor(private service: CategoriesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe({
      next: (urlParams) => {
        this.id = urlParams['id'];
        if(this.id) {
          this.service.getCategory(this.id).subscribe({
            next: (response) => {
              this.category = response;
            },
            error: (errorResponse) => {
              this.errors = errorResponse.error;
            }
          });
        }
      }
    })
  }
  
  backToList() {
    this.router.navigate(["/personal-category/list"]);
  }
}
