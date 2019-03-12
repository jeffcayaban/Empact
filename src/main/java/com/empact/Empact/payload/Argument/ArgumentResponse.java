package com.empact.Empact.payload.Argument;

import com.empact.Empact.payload.User.UserSummary;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.List;

/**
 * The response object containing the data that forms the basis of the argument.
 */

@Data
public class ArgumentResponse {

	/** The ID for an argument **/
	private @NotNull Long id;

	/** Indicates whether the argument is supporting or opposing another argument or petition. **/
	private @NotNull Boolean isSupporting;

	/** The petition that the argument belongs to. **/
	private @NotNull Long rootPetitionId;

	/** The ID of the argument that this argument is created towards. **/
	private Long parentArgumentId;

	/** The ID of the critical question that the argument answers to. **/
	private String subCriticalQuestionId;

	/** Indicates whether the argument agrees or disagrees with a particular critical question. **/
	private @NotNull Boolean agreesWithCQ;

	/** Indicates the critical question that the argument and its ancestors answers to. **/
	private @NotNull String criticalQuestionId;

	/** The timestamp of when the content is created. **/
	private @NotNull Instant creationDateTime;

	/** The timestamp of when the content is last updated. **/
	private @NotNull Instant lastUpdatedDateTime;

	/** The user who created the argument. **/
	private @NotNull UserSummary createdBy;

	/** The type of argument. E.g. Argument by Expert Opinion **/
	private @NotNull String argumentType;

	/** Indicates whether the argument or petition was created with anonymity. **/
	private @NotNull Boolean isAnonymous;

	/** The set of URL sources that supports this argument. **/
	private List<String> sources;
}
