import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { CategoryService } from 'src/app/services/admin/category.service';
import { Category } from '../add-category/category';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/admin/quiz.service';
import { Quiz } from './quiz';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {

  color: ThemePalette = 'primary';
  quizId: number | null = null;

  categories: any;
  quizData: Quiz = {
    quizName: '',
    quizDescription: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      categoryId: null
    }
  };
  quizForm!: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.buildQuizForm();
    this.getCategories();
    this.getQuizId();
  }

  buildQuizForm(): void {
    this.quizForm = this.formBuilder.group({
      quizName: ['', Validators.required],
      maxMarks: ['', Validators.required],
      numberOfQuestions: ['', Validators.required],
      quizDescription: ['', Validators.required],
      category: ['', Validators.required],
      active: [false]
    });
  }

  private getQuizId() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.quizId = +id;
        this.getQuiz();
      }
    });
  }

  private getCategories() {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
    }, (error) => {
      Swal.fire('Error !!', 'Error in loading categories', 'error');
    });
  }

  private getQuiz() {
    if (this.quizId) {
      this.quizService.getQuizById(this.quizId).subscribe((data: any) => {
        this.quizData = data;
        this.quizForm.patchValue({
          quizName: this.quizData.quizName,
          quizDescription: this.quizData.quizDescription,
          maxMarks: this.quizData.maxMarks,
          numberOfQuestions: this.quizData.numberOfQuestions,
          active: this.quizData.active,
          category: {
            categoryId: this.quizData.category.categoryId
          }
        });
      },
        (error: any) => {
          console.error(error);
          this.showErrorSnackbar('Failed to get category');
        }
      );
    }
  }

  submitQuiz() {
    if (this.quizForm.valid) {
      if (this.isEmpty(this.quizData.quizName) || this.isEmpty(this.quizData.quizDescription)) {
        this.showErrorSnackbar('Please fill in all required fields');
        return;
      }

      if (this.quizId) {
        this.updateQuiz();
      } else {
        this.addNewQuiz();
      }
    } else {
      this.showErrorSnackbar('Please fill in all required fields');
    }
  }

  addNewQuiz() {
    this.quizService.addNewQuiz(this.quizData).subscribe((data) => {
      console.log('Response:', data);
      this.showSuccessSweetAlert('Success', 'Quiz added successfully');
      this.resetForm();
      this.router.navigate(['/admin/quizzes']);
    },
      (error: any) => {
        console.error(error);
        this.showErrorSnackbar('Failed to add Quiz');
      }
    );
  }

  updateQuiz() {
    this.quizService.updateQuiz(this.quizData).subscribe((data) => {
      console.log('Response:', data);
      this.showSuccessSweetAlert('Success', 'Quiz updated successfully');
      this.resetForm();
      this.router.navigate(['/admin/quizzes']);
    },
      (error: any) => {
        console.error(error);
        this.showErrorSnackbar('Failed to update quiz');
      }
    );
  }

  private isEmpty(value: string): boolean {
    return value === null || value.trim() === '';
  }

  resetForm(): void {
    this.quizForm.reset();
    this.quizData = {
      quizName: '',
      quizDescription: '',
      maxMarks: '',
      numberOfQuestions: '',
      active: true,
      category: {
        categoryId: null
      }
    };
    this.quizId = null;
  }

  showSuccessSweetAlert(title: string, message: string): void {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      showConfirmButton: false,
      timer: 2000
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
