package com.exam.examserver.services;

import java.util.Set;

import com.exam.examserver.model.exam.Quiz;

public interface QuizService {

    public Quiz addQuiz(Quiz quiz);

    public Quiz updateQuiz(Quiz quiz);

    public void deleteQuiz(Long quizId);

    public Quiz getQuiz(Long quizId);

    public Set<Quiz> getQuizzes();
}
