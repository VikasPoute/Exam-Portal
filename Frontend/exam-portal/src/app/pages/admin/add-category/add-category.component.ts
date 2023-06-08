import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from './category';
import { CategoryService } from 'src/app/services/admin/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  categoryForm!: FormGroup;
  category = { categoryName: '', description: '' }
  characterCount: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  onDescriptionChange(value: string) {
    this.category.description = value;
    this.characterCount = value.length;
  }

  addNewCategory(): void {
    if (this.categoryForm.valid) {
      if (!this.isEmpty(this.category.categoryName) && !this.isEmpty(this.category.description)) {
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
      } else {
        this.showErrorSnackbar('Please fill in all required fields');
      }
    } else {
      this.showErrorSnackbar('Please fill in all required fields');
    }
  }

  private isEmpty(value: string): boolean {
    return value === null || value.trim() === '';
  }

  resetForm(): void {
    this.categoryForm.reset();
    this.category = new Category();
    this.characterCount = 0;
  }

  showSuccessSweetAlert(title: string, message: string): void {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
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
