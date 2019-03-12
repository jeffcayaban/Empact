package com.empact.Empact.payload.Argument;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * The request object containing the new data to applied to an existing argument by expert opinion.
 */

@Data
public class EditExpertOpinionArgRequest {

	/** The ID for an argument **/
	private @NotNull Long id;

	/** The expert that is being referred to. **/
	private @NotNull String expert;

	/** The expert's domain. **/
	private @NotNull String expertDomain;

	/** The expert's assertion. **/
	private @NotNull String expertAssertion;

	/** The set of URL sources that supports this argument. **/
	private List<String> sources;

	/** Indicates whether the argument or petition was created with anonymity. **/
	private @NotNull Boolean isAnonymous;
}
