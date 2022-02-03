import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from '../../category/category';

@Component({
  selector: 'app-spread-sheet-form',
  templateUrl: './spread-sheet-form.component.html',
  styleUrls: ['./spread-sheet-form.component.css']
})
export class SpreadSheetFormComponent implements OnInit {

  categories: Category[] = [];
  listExercisesByCategory: Category[] = [];

  constructor(private serviceCategory: CategoriesService, private router: Router) { }

  ngOnInit() {
    this.getCategories();
    this.listExercisesByCategory.push({id: 0, name: 'vazio', planning: []})
  }

  public selectedCategory(event) {
    this.fillExerciseByCategory(event.target.value);
  }

  public backToList() {
    this.router.navigate(["trainers/list"]);
  }

  private fillExerciseByCategory(categoryId) {
    if (this.listExercisesByCategory.length > 0) {
      this.listExercisesByCategory.pop();
    }
    this.listExercisesByCategory.push(this.categories.find(cat => cat.id == categoryId));
  }

  private getCategories() {
    this.serviceCategory.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response.content;
      }
    })
  }
}
