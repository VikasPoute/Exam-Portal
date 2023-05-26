package com.exam.examserver.services;

import java.util.Set;

import com.exam.examserver.model.User;
import com.exam.examserver.model.UserRole;

public interface UserService {

    // Create a new user
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;
}
