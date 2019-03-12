package com.empact.Empact.payload.Argument;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * The response object containing the data required to create the basis of an argument.
 */

@Data
public class ArgumentRequest {

	/** Indicates whether the argument is supporting or opposing another argument or petition. **/
	private @NotNull Boolean isSupporting;

	/** The ID of the petition that the argument belongs to. **/
	private Long rootPetitionId;

	/** The ID of the argument that this argument is created towards. **/
	private Long parentArgumentId;

	/** The set of URL sources that supports this argument. **/
	private List<String> sources;

	/** The ID of the critical question that the argument and its ancestors answers to. **/
	private @NotNull String criticalQuestionId;

	/** Indicates the critical question that the argument answers to. **/
	private String subCriticalQuestionId;

	/** Indicates whether the argument agrees or disagrees with a particular critical question. **/
	private @NotNull Boolean agreesWithCQ;

	/** Indicates whether the argument or petition was created with anonymity. **/
	private @NotNull Boolean isAnonymous;
}
