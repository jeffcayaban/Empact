package com.empact.Empact.payload.Petition;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * The response object containing the data that denotes the result of the petition creation operation.
 */

@Data
@AllArgsConstructor
public class CreatePetitionResponse {

	/** Indicates whether the operation was successful. **/
	private Boolean success;

	/** A message describing the outcome of the operation. **/
	private String message;

	/** The ID of the newly created petition. **/
	private Long petitionId;
}
