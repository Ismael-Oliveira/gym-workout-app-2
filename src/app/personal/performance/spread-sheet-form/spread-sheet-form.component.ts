import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'src/app/admin/clients/clients';
import { CategoriesService } from 'src/app/services/categories.service';
import { ClientsService } from 'src/app/services/clients.service';
import { UtilService } from 'src/app/services/util.service';
import { Category } from '../../category/category';
import { Exercise } from '../../workout/exercise';

@Component({
  selector: 'app-spread-sheet-form',
  templateUrl: './spread-sheet-form.component.html',
  styleUrls: ['./spread-sheet-form.component.css']
})
export class SpreadSheetFormComponent implements OnInit {

  checkedIDs = [];
  categories: Category[] = [];
  listExercisesByCategory: Category[] = [];
  spreadSheetActualClient: Category[] = [];
  listExercisesByCategoryToSave: Category[] = [];
  selectedItemsList: Exercise[] = [];
  listExercises: Exercise[] = [];
  id: number;
  client: Client;
  controlHideMessageSuccess = {
    success: false
  }
  errors: Object[] = [];

  exercise: Exercise = {
    id: 0,
    nameExercise: 'vazio',
    loop: 0,
    weight: 0,
    series: 0,
    category: null,
    selectedExercise: false
  }

  constructor(private serviceCategory: CategoriesService, private clienteService: ClientsService,
    private util: UtilService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.listExercises.push(this.exercise);
    this.client = new Client();
  }

  ngOnInit() {
    this.getCategories();
    this.listExercisesByCategory.push({ id: 0, name: '', planning: this.listExercises });
    this.fetchSelectedItems();
    this.fetchCheckedIDs();
    this.loadClient();
  }

  private loadClient() {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe({
      next: (urlParams) => {
        this.id = urlParams['id'];
        if (this.id) {
          this.clienteService.getClient(this.id).subscribe({
            next: (response) => {
              this.client = response;
              if ( this.client.card == null ) {
                Object.defineProperty(this.client, 'card', {
                  value: {
                    categories: []
                  }
                })
              }
              if (this.client.card.categories.length > 0) {
                this.listExercisesByCategoryToSave = this.client.card.categories;
              }
            },
            error: (errorResponse) => {
              this.errors = errorResponse.error;
            }
          });
        }
      }
    });
  }

  public saveSpreadSheet() {
    // if ( this.client.card == null ) {
    //   Object.defineProperty(this.client, 'card', {
    //     value: {}
    //   })
    //   // this.client.card['categories'] = this.categories;
    // }
    this.client.card.categories = this.listExercisesByCategoryToSave;
    // console.log(this.client);
    this.clienteService.updateSpreadSheet(this.client)
      .subscribe({
        next: (response) => {
          this.controlHideMessageSuccess.success = true;
          this.errors = [];
          this.client = response;
          this.util.hideMessageSuccess(3000, this.controlHideMessageSuccess, () => {
            this.ngOnInit();
          });
        },
        error: (errorResponse) => {
          this.controlHideMessageSuccess.success = false;
          if (errorResponse.error.status == 400) {
            this.errors.push({ error: errorResponse.error.message });
            return;
          }
          this.errors = errorResponse.error;
        }
      });
  }

  public changeSelection() {
    this.fetchSelectedItems();
    this.addExerciseTolistCategories();
    this.fetchCheckedIDs();
  }

  public selectedCategory(event) {
    this.fillExerciseByCategory(event.target.value);
  }

  public backToList() {
    this.router.navigate(["trainers/list"]);
  }

  public fetchSelectedItems() {
    this.selectedItemsList = this.listExercisesByCategory[0].planning.filter((value, index) => {
      return value.selectedExercise;
    });
  }

  public fetchCheckedIDs() {
    this.checkedIDs = [];
    this.listExercisesByCategory[0].planning.forEach((value, index) => {
      if (value.selectedExercise) {
        this.checkedIDs.push(value.id);
      }
    });
  }

  public removeFromSpreadSheet(nameCategory) {
    let copyFilter = this.listExercisesByCategoryToSave.filter((cat) => {
      return cat.name != nameCategory;
    });

    this.listExercisesByCategoryToSave = copyFilter;
  }

  public addOnSpreadSheet() {
    let nameCategory = this.listExercisesByCategory[0].name;
    let idCategory = this.listExercisesByCategory[0].id;
    let category: Category = new Category();
    category.name = nameCategory;
    category.id = idCategory;

    this.fetchSelectedItems();
    category.planning = Object.assign(this.selectedItemsList);

    let addCategory = this.listExercisesByCategoryToSave.length == 0;
    let addNewCategory = this.listExercisesByCategoryToSave.length > 0;

    let containCategory = this.listExercisesByCategoryToSave.findIndex((cat) => {
      return cat.name == nameCategory;
    });

    if (addCategory || (addNewCategory && containCategory == -1)) {
      this.listExercisesByCategoryToSave.push(category);
    } else if (containCategory != -1) {
      this.listExercisesByCategoryToSave.map((cat, index) => {
        if (cat.name == nameCategory) {
          this.listExercisesByCategoryToSave[index].planning = category.planning;
          return;
        }
      });
    }
  }

  public addExerciseTolistCategories() {
    let nameCategory = this.listExercisesByCategory[0].name;
    let idCategory = this.listExercisesByCategory[0].id;
    let category: Category = new Category();
    category.name = nameCategory;
    category.id = idCategory;
    category.planning = Object.assign(this.selectedItemsList);

    let addCategory = this.listExercisesByCategoryToSave.length == 0;
    let addNewCategory = this.listExercisesByCategoryToSave.length > 0;

    let containCategory = this.listExercisesByCategoryToSave.findIndex((cat) => {
      return cat.name == nameCategory;
    });

    if (addCategory || (addNewCategory && containCategory == -1)) {
      this.listExercisesByCategoryToSave.push(category);
    } else if (containCategory != -1) {
      this.listExercisesByCategoryToSave.map((cat, index) => {
        if (cat.name == nameCategory) {
          this.listExercisesByCategoryToSave[index].planning = category.planning;
          return;
        }
      });
    }
  }

  private fillExerciseByCategory(categoryId) {
    if (this.listExercisesByCategory.length > 0) {
      this.listExercisesByCategory.pop();
    }
    this.listExercisesByCategory.push(this.categories.find(cat => cat.id == categoryId));
  }

  private async getCategories() {
    await this.serviceCategory.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response.content;
      }
    })
  }
}
