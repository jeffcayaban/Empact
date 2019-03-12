package com.empact.Empact.payload.Argument;

import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * The response object containing the data for an argument based on expert opinion.
 */

@Data
public class ArgByExpertOpinion extends ArgumentResponse {

	/** The expert that is being referred to. **/
	private @NotNull String expert;

	/** The expert's domain. **/
	private @NotNull String expertDomain;

	/** The expert's assertion. **/
	private @NotNull String expertAssertion;
}
