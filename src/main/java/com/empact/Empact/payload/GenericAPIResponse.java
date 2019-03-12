package com.empact.Empact.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * The response object that informs the client-side of the success or failure of the requested operation.
 */

@Data
@AllArgsConstructor
public class GenericAPIResponse {

	/** Indicates whether the operation was successful. **/
	private @NotNull Boolean success;

	/** Describes the outcome of the operation. **/
	private @NotNull String message;
}
