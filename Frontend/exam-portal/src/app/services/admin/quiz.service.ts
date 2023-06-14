import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import urlList from '../Urls';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  public getAllQuizzes() {
    return this.http.get(`${urlList.quiz.GET_ALL_QUIZZES}`);
  }

  public addNewQuiz(quiz: any) {
    return this.http.post(`${urlList.quiz.ADD_QUIZ}`, quiz);
  }

  public updateQuiz(quiz: any) {
    return this.http.put(`${urlList.quiz.UPDATE_QUIZ}`, quiz);
  }

  public deleteQuiz(quizId: number) {
    return this.http.delete(`${urlList.quiz.DELETE_QUIZ}/${quizId}`);
  }

  getQuizById(quizId: number) {
    return this.http.get(`${urlList.quiz.GET_QUIZ}/${quizId}`);
  }

}
