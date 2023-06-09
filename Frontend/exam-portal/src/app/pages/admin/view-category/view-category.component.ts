import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/admin/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {

  panelOpenState = false;
  categories: any;

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  editCategory(categoryId: number) {
    this.router.navigate(['/admin/update-category', categoryId]);
  }

  deleteCategory(categoryId: number): void {
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to delete this category?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(categoryId).subscribe(
          () => {
            Swal.fire('Deleted!', 'Category has been deleted.', 'success');
            this.getAllCategories();
          },
          (error) => {
            console.log(error);
            Swal.fire('Error!', 'Failed to delete category.', 'error');
          }
        );
      }
    });
  }

  getAllCategories(): void {
    this.categoryService.getCategories().subscribe(
      (category: any) => {
        this.categories = category;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in loading categories', 'error');
      }
    );
  }
}
