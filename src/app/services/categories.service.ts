import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../personal/category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiURL: string= environment.apiURLBase + "/api/categories";

  constructor(private http: HttpClient) { }

  save(category: Category) : Observable<Category> {
    return this.http.post<Category>(this.apiURL, category);
  }

  update(category: Category) : Observable<Category> {
    return this.http.put<Category>(`${this.apiURL}/${category.id}`, category);
  }

  getCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(this.apiURL);
  }

  getCategory(id: number) : Observable<Category> {
    return this.http.get<Category>(`${this.apiURL}/${id}`);
  }

  deleteCategory(id: number) : Observable<any> {
    return this.http.delete<Category>(`${this.apiURL}/${id}`);
  }
}
