package com.empact.Empact.payload.Petition;

import com.empact.Empact.payload.User.UserSummary;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

/**
 * The response object containing the data of a given petition.
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetPetitionResponse {

	/** The ID of the petition. **/
	private Long id;

	/** The title of the petition. **/
	private String title;

	/** The situation of the petition. **/
	private String situation;

	/** The proposed action of the petition. **/
	private String action;

	/** The proposed action of the petition. **/
	private String goal;

	/** The proposed action of the petition. **/
	private String value;

	/** The timestamp of when the petition is created. **/
	private Instant creationDateTime;

	/** The timestamp of when the petition is last updated. **/
	private Instant lastUpdatedDateTime;

	/** The user who created the petition. **/
	private UserSummary createdBy;

	/** The closing date of the petition. **/
	private Instant closingDateTime;

	/** Indicates whether the petition was created with anonymity. **/
	private Boolean isAnonymous;

	/** Indicates whether the petition is winning. **/
	private Boolean isWinning;
}
