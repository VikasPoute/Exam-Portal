package com.exam.examserver.services;

import java.util.Set;

import com.exam.examserver.model.User;
import com.exam.examserver.model.UserRole;

public interface UserService {

    // Create a new user
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;

    public User getUser(String userName) throws Exception;

    public void deleteUser(Long userId) throws Exception;

    public User updateUser(String username, User user) throws Exception;

    public User findByUsername(String username) throws Exception;
}
