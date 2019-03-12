package com.empact.Empact.payload.Login;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * The response object containing the username of the user to be deleted.
 */

@Data
public class DeleteUserRequest {

	/** The username of the user to be deleted. **/
	private @NotBlank String username;
}
