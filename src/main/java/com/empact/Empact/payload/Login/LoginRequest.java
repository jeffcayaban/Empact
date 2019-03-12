package com.empact.Empact.payload.Login;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * The response object containing the details required to log in into an existing user account.
 */

@Data
public class LoginRequest {

	/** The username of the account to be logged in to **/
	private @NotBlank String username;

	/** The password of the account to be logged in to **/
	private @NotBlank String password;
}
