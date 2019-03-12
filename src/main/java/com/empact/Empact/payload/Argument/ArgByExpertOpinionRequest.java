package com.empact.Empact.payload.Argument;

import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * The request object containing the data to create a new argument based on expert opinion.
 */

@Data
public class ArgByExpertOpinionRequest extends ArgumentRequest {

	/** The expert that is being referred to. **/
	private @NotNull String expert;

	/** The expert's domain. **/
	private @NotNull String expertDomain;

	/** The expert's assertion. **/
	private @NotNull String expertAssertion;
}
