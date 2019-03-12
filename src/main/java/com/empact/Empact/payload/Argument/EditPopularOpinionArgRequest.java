package com.empact.Empact.payload.Argument;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * The request object containing the new data to applied to an existing argument by popular opinion.
 */

@Data
public class EditPopularOpinionArgRequest {

	/** The ID for an argument **/
	private @NotNull Long id;

	/** The set of URL sources that supports this argument. **/
	private List<String> sources;

	/** Indicates whether the argument or petition was created with anonymity. **/
	private @NotNull Boolean isAnonymous;

	/** The user's explanation **/
	private @NotNull String explanation;
}
