package com.exam.examserver;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.exam.examserver.model.Role;
import com.exam.examserver.model.User;
import com.exam.examserver.model.UserRole;
import com.exam.examserver.services.UserService;

@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;

	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Code starting...");

		// Creating a new User
		User user = new User();
		user.setEmail("vikaspoute@gmail.com");
		user.setFirstName("Vikas");
		user.setLastName("Poute");
		user.setPassword("123456");
		user.setProfile("default");
		user.setUsername("Vicky_07");
		user.setPhone("7972488994");

		// Creating role
		Role role = new Role();
		role.setRoleId(1001L);
		role.setRoleName("ADMIN");

		// Setting User and User Role
		UserRole userRole = new UserRole();
		userRole.setRole(role);
		userRole.setUser(user);

		// Setting all the role
		Set<UserRole> roles = new HashSet<UserRole>();
		roles.add(userRole);

		User result = this.userService.createUser(user, roles);
		System.out.println(result);

	}

}
