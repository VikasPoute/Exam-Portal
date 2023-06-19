import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { QuestionsService } from 'src/app/services/admin/questions.service';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.scss']
})
export class ViewQuizQuestionsComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;

  quizName: String | null = null;
  quizId: string | null = null;
  panelOpenState = false;
  questions: any[] = [];
  paginatedQuestions: any[] = [];
  step = 0;
  itemsPerPage = 10;
  currentPageIndex = 0;

  constructor(
    private _route: ActivatedRoute,
    private _questionService: QuestionsService
  ) {}

  ngOnInit(): void {
    this.getRoutes();
    this.getQuestions(this.quizId);
  }

  private getRoutes() {
    this._route.paramMap.subscribe((parm) => {
      this.quizName = parm.get('quizName');
      this.quizId = parm.get('quizId');
    })
  }

  private getQuestions(quizId: any) {
    this._questionService.getQuestions(quizId).subscribe((data:any) => {
      console.log(data);
      this.questions = data;
      this.paginatedQuestions = this.questions.slice(0, this.itemsPerPage);
    })
  }

  handlePageEvent(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedQuestions = this.questions.slice(startIndex, endIndex);
    this.step = 0;
    this.currentPageIndex = event.pageIndex;
  }

  getQuestionIndex(i: number): number {
    return this.currentPageIndex * this.itemsPerPage + i + 1;
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
