package com.empact.Empact.exception;

import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * The exception for when an a resource could not be found within the database.
 */

@ResponseStatus(HttpStatus.NOT_FOUND)
@Data
public class ResourceNotFoundException extends RuntimeException {

	/** The name of the resource. **/
	private String resourceName;

	/** The name of the field within the resource. **/
	private String fieldName;

	/** The value of the field within the resource. **/
	private Object fieldValue;

	/**
	 * Creates a new exception.
	 *
	 * @param resourceName The name of the resource.
	 * @param fieldName The name of the field within the resource.
	 * @param fieldValue The value of the field within the resource.
	 */

	public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
		super(resourceName + " was not found with the field name: " + fieldName + " and value: " + fieldValue);

		this.resourceName = resourceName;
		this.fieldName = fieldName;
		this.fieldValue = fieldValue;
	}
}