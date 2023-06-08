package com.exam.examserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.exam.examserver.model.exam.Options;
import com.exam.examserver.model.exam.Question;
import com.exam.examserver.services.OptionService;
import com.exam.examserver.services.QuestionService;

@RestController
@CrossOrigin("*")
@RequestMapping("/option")
public class OptionsController {

    @Autowired
    private OptionService optionService;

    @Autowired
    private QuestionService questionService;

    // Add a new option
    @PostMapping("/add-option")
    public ResponseEntity<Options> addOption(@RequestBody Options options) {
        return ResponseEntity.ok(optionService.addOptions(options));
    }

    // update option
    @PutMapping("/update-option")
    public ResponseEntity<Options> updateOption(@RequestBody Options options) {
        return ResponseEntity.ok(optionService.updateOptions(options));
    }

    // get option by question id
    @GetMapping("/get-option/{questionId}")
    public ResponseEntity<Options> getOptionByQuestionId(@PathVariable("questionId") Long questionId) {
        Question question = questionService.getQuestion(questionId);
        return ResponseEntity.ok(optionService.getOption(question.getQuestionId()));
    }

    // delete option by question id
    @DeleteMapping("/delete-option/{questionId}")
    public ResponseEntity<Options> deleteOptionByQuestionId(@PathVariable("questionId") Long questionId) {
        Question question = questionService.getQuestion(questionId);
        this.optionService.deleteOption(question.getQuestionId());
        return ResponseEntity.ok().build();
    }
}
