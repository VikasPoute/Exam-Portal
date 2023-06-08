package com.exam.examserver.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.examserver.model.exam.Question;
import com.exam.examserver.model.exam.Quiz;
import com.exam.examserver.services.QuestionService;
import com.exam.examserver.services.QuizService;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionsController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    // Add question
    @PostMapping("/add-question")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
        try {
            Question addedQuestion = questionService.addQuestion(question);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedQuestion);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // Update the question
    @PutMapping("/update-question")
    public ResponseEntity<Question> updateQuestion(@RequestBody Question question) {
        try {
            Question updatedQuestion = questionService.updateQuestion(question);
            return ResponseEntity.ok(updatedQuestion);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get all questions
    @GetMapping("/get-all-questions/{quizId}")
    public ResponseEntity<Set<Question>> getAllQuestions(@PathVariable Long quizId) {
        try {
            Quiz quiz = quizService.getQuiz(quizId);
            Set<Question> questions = quiz.getQuestions();
            List<Question> list = new ArrayList<>(questions);

            if (list.size() > quiz.getNumberOfQuestions()) {
                list = list.subList(0, quiz.getNumberOfQuestions() + 1);
            }

            Collections.shuffle(list);
            questions = new LinkedHashSet<>(list);
            return ResponseEntity.ok(questions);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get one question
    @GetMapping("/get-question/{questionId}")
    public ResponseEntity<Question> getQuestion(@PathVariable Long questionId) {
        try {
            Question question = questionService.getQuestion(questionId);
            if (question != null) {
                return ResponseEntity.ok(question);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Delete the question
    @DeleteMapping("/delete-question/{questionId}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long questionId) {
        try {
            questionService.deleteQuestion(questionId);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
