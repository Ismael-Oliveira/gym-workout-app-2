import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Constants } from 'src/app/constants';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from '../category';

@Component({
  selector: 'app-category-exercise-list',
  templateUrl: './category-exercise-list.component.html',
  styleUrls: ['./category-exercise-list.component.css']
})
export class CategoryExerciseListComponent implements OnInit {

  categories: Category[] = [];
  errorMessageDeleteCategory: String = "";
  selectedCategory: Category;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private service: CategoriesService, private router: Router) { }

  ngOnInit() {
    this.getAllCategories();
    this.dtOptions = Constants.CONFIG_DATA_TABLES;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
  newCategory() {
    this.router.navigate(["/personal-category/form"]);
  }

  getAllCategories(): void {
    this.service.getCategories()
          .subscribe((response: any) => {
            this.categories = response.content;
            // initiate our data table
            this.dtTrigger.next(true);
          });
  }

  deleteCategory(id) {
    this.service.deleteCategory(id)
          .subscribe({
            next: () => {
              this.dtTrigger.unsubscribe();
              this.ngOnInit();
            },
            error: () => {
              this.errorMessageDeleteCategory = "Erro ao tentar deletar esta categoria.";
            }
          });
  }

  prepareToDeleteCategory(category) {
    this.selectedCategory = category;
  }
}
