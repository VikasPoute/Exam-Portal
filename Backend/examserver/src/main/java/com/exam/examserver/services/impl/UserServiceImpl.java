package com.exam.examserver.services.impl;

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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    // This is a method in the `UserServiceImpl` class that implements the
    // `createUser` method of the
    // `UserService` interface. It takes in a `User` object and a set of `UserRole`
    // objects as
    // parameters and returns a `User` object.
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

        User ur = this.userRepository.findByUsername(user.getUsername());

        if (ur != null) {
            System.out.println("User is already registered with the server......");
            throw new Exception("User is already registered with the server.....");
        } else {
            for (UserRole userRole : userRoles) {
                roleRepository.save(userRole.getRole());
            }

            user.getUserRoles().addAll(userRoles);
            ur = userRepository.save(user);
        }

        return ur;
    }

}
