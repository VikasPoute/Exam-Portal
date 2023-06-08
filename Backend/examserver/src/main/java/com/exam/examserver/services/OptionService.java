package com.exam.examserver.services;

import com.exam.examserver.model.exam.Options;

public interface OptionService {

    public Options addOptions(Options options);

    public Options updateOptions(Options options);

    public void deleteOption(Long optionId);

    public Options getOption(Long optionId);

    public Options getOptions(Long questionId);
}
