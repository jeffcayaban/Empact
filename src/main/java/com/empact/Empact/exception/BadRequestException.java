package com.empact.Empact.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * The exception for when an error occurred due to a bad request that was made.
 *
 * This file was created as a result of following this tutorial by Rajeev Kumar Singh:
 * https://www.callicoder.com/spring-boot-spring-security-jwt-mysql-react-app-part-2/
 */

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException {

	/**
	 * Produces a new exception given a message.
	 *
	 * @param message The message to be inserted with the exception.
	 */

	public BadRequestException(String message) {
		super(message);
	}
}

