package com.empact.Empact.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static com.empact.Empact.util.AppConstants.MAX_AGE_IN_MS;

/**
 * Defines the configuration for the Spring MVC framework.
 *
 * This file was created as a result of following this tutorial by Rajeev Kumar Singh:
 * https://www.callicoder.com/spring-boot-spring-security-jwt-mysql-react-app-part-2/
 */

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

	/** Defines the Spring MVC framework configuration. **/
	public @Override void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedMethods("GET", "POST", "PUT", "DELETE")
				.allowedOrigins("*")
				.maxAge(MAX_AGE_IN_MS);
	}

	/** Redirects client side routes to index.html **/
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/help").setViewName("/index.html");
		registry.addViewController("/help/**").setViewName("/index.html");
		registry.addViewController("/search/**").setViewName("/index.html");
		registry.addViewController("/petition/**").setViewName("/index.html");
		registry.addViewController("/petitions").setViewName("/index.html");
		registry.addViewController("/argument/**").setViewName("/index.html");
		registry.addViewController("/login").setViewName("/index.html");
		registry.addViewController("/register").setViewName("/index.html");
		registry.addViewController("/settings").setViewName("/index.html");
		registry.addViewController("/admin-panel").setViewName("/index.html");
		registry.addViewController("/admin-panel/**").setViewName("/index.html");
		registry.addViewController("/user/**").setViewName("/index.html");
	}
}
