package com.empact.Empact.payload.Petition;

import com.empact.Empact.payload.Argument.ArgumentResponse;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

/**
 * The response object containing the lists of arguments that are made towards the different elements of a petition.
 */

@Data
@AllArgsConstructor
public class PetitionReportResponse {

	/** Indicates whether the argument or petition is winning. **/
	private Boolean isPetitionWinning;

	/** The list of arguments that supports the situation of the petition. **/
	private List<ArgumentResponse> supportingSituation;

	/** The list of arguments that supports the action in achieving the goal for the petition. **/
	private List<ArgumentResponse> supportingActionGoal;

	/** The list of arguments that does not support the situation of the petition. **/
	private List<ArgumentResponse> notSupportingSituation;

	/** The list of arguments that does not support the action in achieving the goal for the petition. **/
	private List<ArgumentResponse> notSupportingActionGoal;
}
