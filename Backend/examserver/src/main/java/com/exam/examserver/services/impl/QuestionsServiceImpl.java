package com.exam.examserver.services.impl;

import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.examserver.model.exam.Options;
import com.exam.examserver.model.exam.Question;
import com.exam.examserver.model.exam.Quiz;
import com.exam.examserver.repository.QuestionRepository;
import com.exam.examserver.services.QuestionService;

@Service
public class QuestionsServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Question addQuestion(Question question) {
        try {
            return questionRepository.save(question);
        } catch (Exception e) {
            // Handle exception
            // Log or throw custom exception
            throw new RuntimeException("Failed to add question", e);
        }
    }

    @Override
    public Question updateQuestion(Question question) {
        try {
            Optional<Question> existingQuestion = questionRepository.findById(question.getQuestionId());
            if (existingQuestion.isPresent()) {
                Question updatedQuestion = existingQuestion.get();

                // Update the question text
                updatedQuestion.setContent(question.getContent());

                // Update the options
                Options existingOptions = updatedQuestion.getOptions();
                Options updatedOptions = question.getOptions();

                // Update the option values
                existingOptions.setOption1(updatedOptions.getOption1());
                existingOptions.setOption2(updatedOptions.getOption2());
                existingOptions.setOption3(updatedOptions.getOption3());
                existingOptions.setOption4(updatedOptions.getOption4());
                existingOptions.setAnswer(updatedOptions.getAnswer());

                return questionRepository.save(updatedQuestion);
            } else {
                throw new IllegalArgumentException("Question not found");
            }
        } catch (IllegalArgumentException e) {
            // Handle specific exception
            // Log or throw custom exception
            throw e;
        } catch (Exception e) {
            // Handle other exceptions
            // Log or throw custom exception
            throw new RuntimeException("Failed to update question", e);
        }
    }

    @Override
    public void deleteQuestion(Long questionId) {
        try {
            questionRepository.deleteById(questionId);
        } catch (Exception e) {
            // Handle exception
            // Log or throw custom exception
            throw new RuntimeException("Failed to delete question", e);
        }
    }

    @Override
    public Question getQuestion(Long questionId) {
        try {
            Optional<Question> question = questionRepository.findById(questionId);
            if (question.isPresent()) {
                return question.get();
            } else {
                throw new IllegalArgumentException("Question not found");
            }
        } catch (IllegalArgumentException e) {
            // Handle specific exception
            // Log or throw custom exception
            throw e;
        } catch (Exception e) {
            // Handle other exceptions
            // Log or throw custom exception
            throw new RuntimeException("Failed to retrieve question", e);
        }
    }

    @Override
    public Set<Question> getQuestionsOfQuiz(Quiz quiz) {
        try {
            return new LinkedHashSet<>(questionRepository.findByQuiz(quiz));
        } catch (Exception e) {
            // Handle exception
            // Log or throw custom exception
            throw new RuntimeException("Failed to retrieve questions of quiz", e);
        }
    }
}
