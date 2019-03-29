package com.empact.Empact.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Used to handle any authentication problems back to the client-side.
 *
 * This file was created as a result of following this tutorial by Rajeev Kumar Singh:
 * https://www.callicoder.com/spring-boot-spring-security-jwt-mysql-react-app-part-2/
 */

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

	private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationEntryPoint.class);

	/**
	 * Used for sending back to the client-side a message indicating that the user does not have the permissions to
	 * view a page or perform a specific action.
	 *
	 * @param httpServletRequest The request that was received.
	 * @param httpServletResponse The response to be sent back.
	 * @param e The authentication exception
	 * @throws IOException IO Exception
	 */

	@Override
	public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
						 AuthenticationException e) throws IOException {

		httpServletResponse.sendError(
				HttpServletResponse.SC_UNAUTHORIZED, "You are currently not permitted to view this resource."
		);

		logger.error("Generated unauthorized access error. Message: ", e.getMessage());
	}
}
