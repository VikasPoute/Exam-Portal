package com.exam.examserver.services.impl;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.examserver.model.exam.Options;
import com.exam.examserver.model.exam.Question;
import com.exam.examserver.repository.OptionsRepository;
import com.exam.examserver.services.OptionService;

@Service
public class OptionsServiceImpl implements OptionService {

    @Autowired
    private OptionsRepository optionsRepository;

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
    public Set<Options> getOptions(Question question) {
        return new LinkedHashSet<>(this.optionsRepository.findByQuestion(question));
    }

}
