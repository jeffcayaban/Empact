package com.empact.Empact.payload.User;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * The response object that identifies whether a username is available to be used for a new account.
 */

@Data
@AllArgsConstructor
public class UserIdentityAvailability {

	/** Indicates whether the username exists or not. **/
	private Boolean usernameExists;
}
