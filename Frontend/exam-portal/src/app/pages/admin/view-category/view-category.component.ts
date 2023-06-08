import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/admin/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {

  panelOpenState = false;
  categories: any

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((category: any) => {
      this.categories = category;
      console.log(this.categories);
    }, (error) => {
      console.log(error);
      Swal.fire('Error !!', 'Error in loading categories', 'error')
    })
  }
}
