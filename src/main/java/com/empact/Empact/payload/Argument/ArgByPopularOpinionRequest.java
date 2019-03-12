package com.empact.Empact.payload.Argument;

import lombok.Data;
import javax.validation.constraints.NotNull;

/**
 * The request object containing the data to create a new argument based on popular opinion.
 */

@Data
public class ArgByPopularOpinionRequest extends ArgumentRequest {

	/** The user's explanation **/
	private @NotNull String explanation;
}
