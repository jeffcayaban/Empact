package com.empact.Empact.payload.Argument;

import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * The request object containing the ID of the argument to be modified.
 */

@Data
public class ModifyArgumentRequest {

	/** The ID of the argument to be modified. **/
	private @NotNull Long argumentId;
}
