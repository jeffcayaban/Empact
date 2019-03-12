package com.empact.Empact.payload.Argument;

import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * The response object containing the data for an argument based on popular opinion.
 */

@Data
public class ArgByPopularOpinion extends ArgumentResponse {

	/** The user's explanation **/
	private @NotNull String explanation;
}
