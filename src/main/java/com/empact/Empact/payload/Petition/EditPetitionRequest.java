package com.empact.Empact.payload.Petition;

import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * The request object containing the new data to applied to an existing petition.
 */

@Data
public class EditPetitionRequest extends PetitionRequest {

	/** The ID of the petition to be modified. **/
	private @NotNull Long petitionId;
}
