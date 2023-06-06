package com.exam.examserver.services;

import java.util.Set;

import com.exam.examserver.model.exam.Question;
import com.exam.examserver.model.exam.Quiz;

public interface QuestionService {

    public Question addQuestion(Question question);

    public Question updateQuestion(Question question);

    public void deleteQuestion(Long questionId);

    public Question getQuestion(Long questionId);

    public Set<Question> getQuestionsOfQuiz(Quiz quiz);
}
