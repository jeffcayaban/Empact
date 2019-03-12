package com.empact.Empact.payload.Login;

import lombok.Data;

import javax.validation.constraints.NotNull;

import static com.empact.Empact.util.AppConstants.BEARER;

/**
 * The response object containing the bearer token that is required to be passed with selected requests to the APIs.
 */

@Data
public class JwtAuthenticationResponse {

	/** The user's access token **/
	private @NotNull String accessToken;

	/** The access token type **/
	private final String TOKEN_TYPE = BEARER;

	public JwtAuthenticationResponse(String accessToken) {
		this.accessToken = accessToken;
	}
}
