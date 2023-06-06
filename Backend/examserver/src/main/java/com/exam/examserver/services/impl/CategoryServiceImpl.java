package com.exam.examserver.services.impl;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.examserver.model.exam.Category;
import com.exam.examserver.repository.CategoryRepository;
import com.exam.examserver.services.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category addCategory(Category category) {
        return this.categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        return this.categoryRepository.save(category);
    }

    @Override
    public void removeCategory(Long categoryId) {
        this.categoryRepository.deleteById(categoryId);
    }

    @Override
    public Category getCategory(Long categoryId) {
        return this.categoryRepository.findById(categoryId).get();
    }

    @Override
    public Set<Category> getAllCategories() {
        return new LinkedHashSet<>(this.categoryRepository.findAll());
    }

}
