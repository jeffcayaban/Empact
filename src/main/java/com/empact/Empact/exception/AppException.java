package com.empact.Empact.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * A generic application exception.
 */

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class AppException extends RuntimeException {

	/**
	 * Produces a new application exception given a message.
	 *
	 * @param message The message to be inserted with the exception.
	 */

	public AppException(String message) {
		super(message);
	}
}
