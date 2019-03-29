package com.empact.Empact.config;

import com.empact.Empact.model.User;
import com.empact.Empact.repository.UserRepository;
import com.empact.Empact.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

/**
 * Provides methods to identify the user who is currently using the system.
 *
 * This file was created as a result of following this tutorial by Rajeev Kumar Singh:
 * https://www.callicoder.com/spring-boot-spring-security-jwt-mysql-react-app-part-3/
 */

public class SpringSecurityAuditAwareImpl implements AuditorAware<User>  {

	/** The user data repository **/
	private @Autowired UserRepository userRepository;

	/**
	 * Gets the current user.
	 *
	 * @return Some user.
	 */

	public @Override Optional<User> getCurrentAuditor() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		if (authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
			return Optional.empty();
		} else {
			// Locate the user.
			return userRepository.findById(((CustomUserDetails) authentication.getPrincipal()).getId());
		}
	}
}
