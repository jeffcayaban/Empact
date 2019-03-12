package com.empact.Empact.payload.Argument;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * The response object containing the ID of the newly created argument.
 */

@Data
@AllArgsConstructor
public class CreateArgumentResponse {

	/** The ID of the newly created argument. **/
	private @NotNull String argumentId;
}
