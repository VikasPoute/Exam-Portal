package com.exam.examserver.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.examserver.model.exam.Options;
import com.exam.examserver.model.exam.Question;
import com.exam.examserver.repository.OptionsRepository;
import com.exam.examserver.repository.QuestionRepository;
import com.exam.examserver.services.OptionService;

@Service
public class OptionsServiceImpl implements OptionService {

    @Autowired
    private OptionsRepository optionsRepository;

    @Autowired
    public QuestionRepository questionRepository;

    @Override
    public Options addOptions(Options options) {
        return this.optionsRepository.save(options);
    }

    @Override
    public Options updateOptions(Options options) {
        return this.optionsRepository.save(options);
    }

    @Override
    public void deleteOption(Long optionId) {
        this.optionsRepository.deleteById(optionId);
    }

    @Override
    public Options getOption(Long optionId) {
        return this.optionsRepository.findById(optionId).get();
    }

    @Override
    public Options getOptions(Long questionId) {
        Question question = this.questionRepository.findById(questionId).get();
        return optionsRepository.findById(question.getOptions().getOptionId()).get();
    }

}
