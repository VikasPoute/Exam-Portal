package com.exam.examserver.services;

import java.util.Set;

import com.exam.examserver.model.exam.Category;

public interface CategoryService {
    public Category addCategory(Category category);

    public Category updateCategory(Category category);

    public void removeCategory(Long categoryId);

    public Category getCategory(Long categoryId);

    public Set<Category> getAllCategories();
}
