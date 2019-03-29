package com.empact.Empact.util;

import com.empact.Empact.model.Petition;
import com.empact.Empact.model.User;
import com.empact.Empact.payload.Petition.GetPetitionResponse;
import com.empact.Empact.payload.User.UserSummary;

/**
 * The ModelMapper provides the functions to transform data into data that is expected by the client.
 *
 * This file was created as a result of following this tutorial by Rajeev Kumar Singh:
 * https://www.callicoder.com/spring-boot-spring-security-jwt-mysql-react-app-part-3/
 */

public class ModelMapper {

	/**
	 * Transforms the Petition and User into a response object to be returned to clients.
	 *
	 * @param petition The petition to be transformed.
	 * @param creator The creator of the petition.
	 * @return The response object of all the relevant petition data.
	 */

	public static GetPetitionResponse mapPetitionToPetitionResponse(Petition petition, User creator) {

		UserSummary userSummary = new UserSummary(
				creator.getId(),
				creator.getUsername(),
				creator.getFirstName(),
				creator.getLastName(),
				creator.getRoles().stream().map(role -> role.getName().name()).toArray(String[]::new)
		);

		return new GetPetitionResponse(
				petition.getId(),
				petition.getTitle(),
				petition.getSituation(),
				petition.getAction(),
				petition.getGoal(),
				petition.getValue(),
				petition.getCreatedAt(),
				petition.getUpdatedAt(),
				userSummary,
				petition.getClosingDateTime(),
				petition.getIsAnonymous(),
				petition.getIsWinning()
		);
	}
}
