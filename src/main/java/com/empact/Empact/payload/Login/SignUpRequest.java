package com.empact.Empact.payload.Login;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * The request object containing the data required to create a new user account.
 */

@Data
public class SignUpRequest {

	/** The username for the new user account **/
	private @NotBlank @Size(min = 3, max = 15) String username;

	/** The first name for the new user account **/
	private @NotBlank @Size(min = 1, max = 40) String firstName;

	/** The last name for the new user account **/
	private @NotBlank @Size(min = 1, max = 40) String lastName;

	/** The password for the new user account **/
	private @NotBlank @Size(min = 5, max = 21) String password;
}
