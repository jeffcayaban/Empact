package com.empact.Empact.payload.Petition;

import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * The request object containing the ID of the petition to be modified.
 */

@Data
public class ModifyPetitionRequest {

	/** The ID of the petition to be modified. **/
	private @NotNull Long petitionId;
}
