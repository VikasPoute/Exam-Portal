import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../Urls';
import { Category } from 'src/app/pages/admin/add-category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public getCategories() {
    return this.http.get(`${baseUrl}/category/all-categories`)
  }

  public addNewCategory(category: Category) {
    return this.http.post(`${baseUrl}/category/add-category`, category);
  }

}
