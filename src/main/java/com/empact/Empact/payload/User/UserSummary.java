package com.empact.Empact.payload.User;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * The response object that contains the details of an individual user.
 */

@Data
@AllArgsConstructor
public class UserSummary {

	/** The ID of the user. **/
	private @NotNull Long id;

	/** The username of the user. **/
	private @NotNull String username;

	/** The first name of the user. **/
	private @NotNull String firstName;

	/** The last name of the user. **/
	private @NotNull String lastName;

	/** The user roles/authorities of the user. **/
	private @NotNull String[] authorities;
}
