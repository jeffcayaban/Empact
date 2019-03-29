package com.empact.Empact.config;

import com.empact.Empact.model.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * The configuration for auditing any modifications to the database.
 *
 * This file was created as a result of following this tutorial by Rajeev Kumar Singh:
 * https://www.callicoder.com/spring-boot-spring-security-jwt-mysql-react-app-part-3/
 */

@Configuration
@EnableJpaAuditing
public class AuditingConfig {

	/**
	 * Makes the application aware of the user who is using the system.
	 *
	 * @return A class containing methods to identify the user using the system.
	 */

	public @Bean AuditorAware<User> auditorProvider() {
		return new SpringSecurityAuditAwareImpl();
	}
}
