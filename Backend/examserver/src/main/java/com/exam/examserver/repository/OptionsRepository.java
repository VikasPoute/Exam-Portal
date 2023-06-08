package com.exam.examserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.examserver.model.exam.Options;

public interface OptionsRepository extends JpaRepository<Options, Long> {

}
