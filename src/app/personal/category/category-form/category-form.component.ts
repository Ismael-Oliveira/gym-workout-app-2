import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { UtilService } from 'src/app/services/util.service';
import { Category } from '../category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  category: Category;;
  controlHideMessageSuccess = {
    success: false
  }
  errors: Object[] = [];
  id: number;

  constructor(private service: CategoriesService, private util: UtilService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.category = new Category;
   }

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

  onSubmit() {
    if(this.category.id) {
      this.updateCategory();
    } else {
      this.saveCategory();
    }
  }
  
  cancelCreateCategories() {
    this.router.navigate(["/personal-category/list"]);
  }

  private saveCategory() {
    this.service.save(this.category)
          .subscribe({
            next: (response) => {
              this.controlHideMessageSuccess.success = true;
              this.errors = [];
              this.category = response;
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

  private updateCategory() {
    this.service.update(this.category)
          .subscribe({
            next: (response) => {
              this.controlHideMessageSuccess.success = true;
              this.errors = [];
              this.category = response;
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
