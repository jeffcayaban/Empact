package com.empact.Empact.controller;

import com.empact.Empact.model.User;
import com.empact.Empact.payload.GenericAPIResponse;
import com.empact.Empact.payload.Login.DeleteUserRequest;
import com.empact.Empact.payload.Login.JwtAuthenticationResponse;
import com.empact.Empact.payload.Login.LoginRequest;
import com.empact.Empact.payload.Login.SignUpRequest;
import com.empact.Empact.payload.User.UserIdentityAvailability;
import com.empact.Empact.payload.User.UserSummary;
import com.empact.Empact.security.PresentUser;
import com.empact.Empact.security.CustomUserDetails;
import com.empact.Empact.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

/**
 * The UserController intercepts requests to fetch data regarding the User.
 */

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@RequestMapping("/api")
public class UserController {

	/** The service that handles the logic concerning the data for Users. **/
	private final UserService userService;

	// ------------------------------------- API Endpoints -------------------------------------

	/**
	 * Gets the details of the currently logged in user.
	 *
	 * @param currentUser The currently logged in user.
	 * @return An object containing the details of the logged in user.
	 */

	@GetMapping("/user/getCurrentUser")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public UserSummary getCurrentlyLoggedInUser(@PresentUser CustomUserDetails currentUser) {
		return new UserSummary(
				currentUser.getId(),
				currentUser.getUsername(),
				currentUser.getFirstName(),
				currentUser.getLastName(),
				currentUser.getAuthorities().stream().map(GrantedAuthority::getAuthority).toArray(String[]::new)
		);
	}

	/**
	 * Checks whether a given username is available.
	 *
	 * @param username A username
	 * @return An object containing a Boolean indicating whether the username is available.
	 */

	@GetMapping("/user/checkUsernameAvailability")
	public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
		return new UserIdentityAvailability(userService.checkUsernameAvailability(username));
	}

	/**
	 * Gets the details of a given user.
	 *
	 * @param username The username of an existing user.
	 * @return The details of the given user.
	 */

	@GetMapping("/user/getUserProfile")
	public UserSummary getUser(@RequestParam(value = "username") String username) {
		User user = userService.getUserProfile(username);

		return new UserSummary(
				user.getId(),
				user.getUsername(),
				user.getFirstName(),
				user.getLastName(),
				user.getRoles().stream().map(role -> role.getName().name()).toArray(String[]::new)
		);
	}

	/**
	 * Logs in the user to an existing user account.
	 *
	 * @param loginRequest The request containing the details of the account to be logged into.
	 * @return A response object identifying whether the login operation was successful.
	 */

	@PostMapping("/auth/signInUser")
	public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
		String JwtToken = userService.loginUser(loginRequest);
		return ResponseEntity.ok(new JwtAuthenticationResponse(JwtToken));
	}

	/**
	 * Creates a new user account within the system.
	 *
	 * @param signUpRequest The details of the new user account to be registered.
	 * @return A response object identifying whether the registration operation was successful.
	 */

	@PostMapping("/auth/signUpUser")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {

		if (userService.checkUsernameAvailability(signUpRequest.getUsername())) {
			// An account with the provided username already exists.

			return new ResponseEntity(
					new GenericAPIResponse(false, "An account with the provided username already exists."),
					HttpStatus.BAD_REQUEST
			);

		} else {
			// An account with the provided username does not exist, so create the new user account.

			User user = userService.createUser(signUpRequest);

			URI location = ServletUriComponentsBuilder
					.fromCurrentContextPath().path("/api/users/{username}")
					.buildAndExpand(user.getUsername()).toUri();

			return ResponseEntity.created(location).body(
					new GenericAPIResponse(true, "User registered successfully")
			);
		}
	}

	/**
	 * Deletes a user given the provided user details.
	 *
	 * @param deleteUserRequest The request containing the details of the user to be deleted.
	 * @return A response object identifying whether the deletion operation was successful.
	 */

	@DeleteMapping("/auth/deleteUser")
	public ResponseEntity<?> deleteUser(@Valid @RequestBody DeleteUserRequest deleteUserRequest) {

		// 1. Delete the user.
		userService.deleteUser(deleteUserRequest);

		// 2. Respond back with the outcome of the operation.
		return ResponseEntity.ok().body(new GenericAPIResponse(true,
				"The user's account has successfully been deleted")
		);
	}
}
