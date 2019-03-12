package com.empact.Empact.util;

import com.empact.Empact.exception.AppException;
import com.empact.Empact.model.User;
import com.empact.Empact.model.roles.Role;
import com.empact.Empact.model.roles.UserRoleName;
import com.empact.Empact.repository.UserRepository;
import com.empact.Empact.repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;

/**
 * Contains the methods that will be executed upon the initial execution of the application.
 */

@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Component
public class InitialApplicationRunner implements ApplicationRunner {

	/** The User data repository **/
	private final UserRepository userRepository;

	/** The User role data repository **/
	private final UserRoleRepository userRoleRepository;

	/** The password encoder **/
	private final PasswordEncoder passwordEncoder;

	/** The password for the default admin account **/
	private @Value("${app.admin.password}") String ADMIN_PASSWORD;

	/** The username for the default admin account **/
	private @Value("${app.admin.username}") String ADMIN_USERNAME;

	/**
	 * Executes the required operations when the application is executed.
	 *
	 * @param args The application arguments.
	 */

	public void run(ApplicationArguments args) {
		// Create an admin account on application initialisation.
		createAdminAccount();
	}

	/**
	 * Creates a default administrative account.
	 */

	private void createAdminAccount() {
		if (!userRepository.existsByUsername(ADMIN_USERNAME)) {
			// Only create a default admin account if one does not exist.

			Role role = userRoleRepository.findByName(UserRoleName.ROLE_ADMIN).orElseThrow(() ->
					new AppException("User Role not set."));
			String encodedPassword = passwordEncoder.encode(ADMIN_PASSWORD);

			User user = new User(ADMIN_USERNAME, "Admin", "Account", encodedPassword,
					Collections.singletonList(role));

			userRepository.save(user);
		}
	}
}
