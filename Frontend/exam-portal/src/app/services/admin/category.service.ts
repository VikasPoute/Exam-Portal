import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/pages/admin/add-category/category';
import urlList from '../Urls';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public getCategories() {
    return this.http.get(`${urlList.category.GET_ALL_CATEGORIES}`)
  }

  public addNewCategory(category: Category) {
    return this.http.post(`${urlList.category.ADD_CATEGORY}`, category);
  }

  public updateCategory(category: Category) {
    return this.http.put(`${urlList.category.UPDATE_CATEGORY}`, category);
  }

  public deleteCategory(categoryId: number) {
    return this.http.delete(`${urlList.category.DELETE_CATEGORY}${categoryId}`);
  }

  public getCategoryById(categoryId: number) {
    return this.http.get(`${urlList.category.GET_CATEGORY}${categoryId}`);
  }


}
