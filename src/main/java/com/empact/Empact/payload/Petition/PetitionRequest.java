package com.empact.Empact.payload.Petition;

import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * The request object containing the data of the petition to be created.
 */

@Data
public class PetitionRequest {

	/** The title of the petition. **/
	private @NotNull String title;

	/** The situation of the petition. **/
	private @NotNull String situation;

	/** The proposed action of the petition. **/
	private @NotNull String action;

	/** The proposed action of the petition. **/
	private @NotNull String goal;

	/** The proposed action of the petition. **/
	private @NotNull String value;

	/** The closing date of the petition. **/
	private @NotNull Long closingDateTime;

	/** Indicates whether the petition was created with anonymity. **/
	private @NotNull Boolean isAnonymous;
}
