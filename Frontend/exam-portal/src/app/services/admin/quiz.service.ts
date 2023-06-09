import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../Urls';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  public getAllQuizzes() {
    return this.http.get(`${baseUrl}/quiz/all-quizzes`);
  }

  public addNewQuiz(quiz: any) {
    return this.http.post(`${baseUrl}/quiz/add-quiz`, quiz);
  }

  public updateQuiz(quiz: any) {
    return this.http.put(`${baseUrl}/quiz/update-quiz`, quiz);
  }

  public deleteQuiz(quizId: number) {
    return this.http.delete(`${baseUrl}/quiz/delete-quiz/${quizId}`);
  }

  getQuizById(quizId: number) {
    return this.http.get(`${baseUrl}/quiz/get-quiz/${quizId}`);
  }

}
