package com.empact.Empact.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * The exception for when an error occurred due to a bad request that was made.
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

