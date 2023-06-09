import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from './category';
import { CategoryService } from 'src/app/services/admin/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  categoryForm!: FormGroup;
  category: Category = new Category();
  characterCount: number = 0;
  categoryId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.categoryId = +id;
        this.getCategory();
      }
    });
  }

  getCategory(): void {
    if (this.categoryId) {
      this.categoryService.getCategoryById(this.categoryId).subscribe(
        (data: any) => {
          this.category = data;
          this.categoryForm.patchValue({
            categoryName: this.category.categoryName,
            description: this.category.description
          });
        },
        (error: any) => {
          console.error(error);
          this.showErrorSnackbar('Failed to get category');
        }
      );
    }
  }

  onDescriptionChange(value: string) {
    this.category.description = value;
    this.characterCount = value.length;
  }

  addNewCategory(): void {
    if (this.categoryForm.valid) {
      if (!this.isEmpty(this.category.categoryName) && !this.isEmpty(this.category.description)) {
        if (this.categoryId) {
          this.updateCategory();
          this.router.navigate(['/admin/categories'])
        } else {
          this.createCategory();
          this.router.navigate(['/admin/categories'])
        }
      } else {
        this.showErrorSnackbar('Please fill in all required fields');
      }
    } else {
      this.showErrorSnackbar('Please fill in all required fields');
    }
  }

  createCategory(): void {
    this.categoryService.addNewCategory(this.category).subscribe(
      (data) => {
        console.log('Response:', data);
        this.showSuccessSweetAlert('Success', 'Category added successfully');
        this.resetForm();
      },
      (error: any) => {
        console.error(error);
        this.showErrorSnackbar('Failed to add category');
      }
    );
  }

  updateCategory(): void {
    this.categoryService.updateCategory(this.category).subscribe(
      (data) => {
        console.log('Response:', data);
        this.showSuccessSweetAlert('Success', 'Category updated successfully');
        this.resetForm();
      },
      (error: any) => {
        console.error(error);
        this.showErrorSnackbar('Failed to update category');
      }
    );
  }

  private isEmpty(value: string): boolean {
    return value === null || value.trim() === '';
  }

  resetForm(): void {
    this.categoryForm.reset();
    this.category = new Category();
    this.characterCount = 0;
    this.categoryId = null;
  }

  showSuccessSweetAlert(title: string, message: string): void {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      showConfirmButton: false,
    });
  }

  showErrorSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2000,
    });
  }

}
