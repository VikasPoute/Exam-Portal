import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/admin/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.scss']
})
export class ViewQuizzesComponent implements OnInit {

  panelOpenState = false;
  quizzes: any

  constructor(private router: Router, private quizService: QuizService) { }

  ngOnInit(): void {
    this.getAllQuizzes();
  }

  public getAllQuizzes() {
    this.quizService.getAllQuizzes().subscribe((data) => {
      this.quizzes = data;
      console.log(data);
    }, (error) => {
      console.log(error);
      Swal.fire('Error !!', 'Error in loading categories', 'error');
    })
  }

  deleteQuiz(quizId: number): void {
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
        this.quizService.deleteQuiz(quizId).subscribe(
          () => {
            Swal.fire('Deleted!', 'Quiz has been deleted.', 'success');
            this.getAllQuizzes();
          },
          (error) => {
            console.log(error);
            Swal.fire('Error!', 'Failed to delete quiz.', 'error');
          }
        );
      }
    });
  }

  editQuiz(quizId: number) {
    this.router.navigate(['/admin/update-quiz', quizId]);
  }
}
