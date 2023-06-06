package com.exam.examserver.services;

import java.util.Set;

import com.exam.examserver.model.exam.Options;
import com.exam.examserver.model.exam.Question;

public interface OptionService {

    public Options addOptions(Options options);

    public Options updateOptions(Options options);

    public void deleteOption(Long optionId);

    public Options getOption(Long optionId);

    public Set<Options> getOptions(Question question);
}
