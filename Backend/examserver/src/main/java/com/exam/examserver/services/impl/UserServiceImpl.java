package com.exam.examserver.services.impl;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.examserver.model.User;
import com.exam.examserver.model.UserRole;
import com.exam.examserver.repository.RoleRepository;
import com.exam.examserver.repository.UserRepository;
import com.exam.examserver.services.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {
        User existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser != null) {
            throw new Exception("User is already registered with the server.");
        } else {
            for (UserRole userRole : userRoles) {
                roleRepository.save(userRole.getRole());
            }

            user.getUserRoles().addAll(userRoles);
            User createdUser = userRepository.save(user);
            return createdUser;
        }
    }

    @Override
    public User getUser(String username) throws Exception {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            return user;
        } else {
            throw new Exception("User not found.");
        }
    }

    @Override
    public void deleteUser(Long userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            userRepository.delete(user.get());
        } else {
            throw new Exception("User not found.");
        }
    }

    @Override
    public User updateUser(String username, User user) throws Exception {
        User oldUser = userRepository.findByUsername(username);
        if (oldUser != null) {
            user.setId(oldUser.getId());
            return userRepository.save(user);
        } else {
            throw new Exception("User not found.");
        }
    }
}
