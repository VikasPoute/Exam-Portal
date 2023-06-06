package com.exam.examserver.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.examserver.model.exam.Options;
import com.exam.examserver.model.exam.Question;

public interface OptionsRepository extends JpaRepository<Options, Long> {

    public Set<Options> findByQuestion(Question question);

}
