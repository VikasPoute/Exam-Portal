import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import urlList from '../Urls';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(
    private http: HttpClient
  ) { }

  public getQuestions(quizId: number) {
    return this.http.get(`${urlList.questions.GET_ALL_QUESTIONS}${quizId}`);
  }

}
