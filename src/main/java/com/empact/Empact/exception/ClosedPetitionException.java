package com.empact.Empact.exception;

import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * The exception for when an operation is to be performed on a closed operation.
 */

@ResponseStatus(HttpStatus.BAD_REQUEST)
@Data
public class ClosedPetitionException extends RuntimeException {

	/** The ID of the closed petition. **/
	private Long petitionId;

	/**
	 * Creates a new exception.
	 *
	 * @param petitionId The ID of the closed petition.
	 */

	public ClosedPetitionException(Long petitionId) {
		super(String.format("A closed rootPetition is found with ID: '%s'", petitionId));
		this.petitionId = petitionId;
	}

}
