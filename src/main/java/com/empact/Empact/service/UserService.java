package com.empact.Empact.service;

import com.empact.Empact.exception.AppException;
import com.empact.Empact.exception.ResourceNotFoundException;
import com.empact.Empact.model.Argument;
import com.empact.Empact.model.Petition;
import com.empact.Empact.model.User;
import com.empact.Empact.model.roles.Role;
import com.empact.Empact.model.roles.UserRoleName;
import com.empact.Empact.payload.Login.DeleteUserRequest;
import com.empact.Empact.payload.Login.LoginRequest;
import com.empact.Empact.payload.Login.SignUpRequest;
import com.empact.Empact.repository.ArgumentRepository;
import com.empact.Empact.repository.PetitionRepository;
import com.empact.Empact.repository.UserRepository;
import com.empact.Empact.repository.UserRoleRepository;
import com.empact.Empact.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.concurrent.CopyOnWriteArrayList;

import static com.empact.Empact.util.AppConstants.USER;
import static com.empact.Empact.util.AppConstants.USERNAME;

/**
 *  The UserService handles all data manipulation and transformation regarding Users. It also interacts with the
 *  data repositories and produces the response objects to be returned to the Controller layer.
 *
 * This file was created as a result of following this tutorial by Rajeev Kumar Singh:
 * https://www.callicoder.com/spring-boot-spring-security-jwt-mysql-react-app-part-2/
 */

@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Service
public class UserService {

	/** The User data repository **/
	private final UserRepository userRepository;

	/** The Petition data repository **/
	private final PetitionRepository petitionRepository;

	/** The Argument data repository **/
	private final ArgumentRepository argumentRepository;

	/** The argument service **/
	private final ArgumentService argumentService;

	/** Used for encoding passwords. **/
	private final PasswordEncoder passwordEncoder;

	/** The user role data repository **/
	private final UserRoleRepository userRoleRepository;

	/** For authenticating a user. **/
	private final AuthenticationManager authenticationManager;

	/** Used for processing JwT token. **/
	private final JwtTokenProvider tokenProvider;

	/**
	 * Deletes a user given the provided user details.
	 *
	 * @param deleteUserRequest The request containing the details of the user to be deleted.
	 */

	public void deleteUser(DeleteUserRequest deleteUserRequest) {

		// 1. Find the user.
		User user = userRepository.findByUsername(deleteUserRequest.getUsername()).orElseThrow(() ->
				new ResourceNotFoundException(USER, USERNAME, deleteUserRequest.getUsername())
		);

		// 3. Delete the user's petitions.
		CopyOnWriteArrayList<Petition> userPetitions = new CopyOnWriteArrayList<>(petitionRepository.findByCreatedBy(user));
		userPetitions.forEach(petitionRepository::delete);

		// 3. Delete the user's arguments.
		CopyOnWriteArrayList<Argument> userArguments = new CopyOnWriteArrayList<>(argumentRepository.findByCreatedBy(user));
		userArguments.forEach(argumentService::deleteArgument);

		// 4. Delete the user.
		userRepository.delete(user);
	}

	/**
	 * Creates a new user account within the system.
	 *
	 * @param signUpRequest The details of the new user account to be registered.
	 * @return The newly created user account/
	 */

	public User createUser(SignUpRequest signUpRequest) {

		// 1. Encodes the given password.
		String encodedPassword = passwordEncoder.encode(signUpRequest.getPassword());

		// 2. Locate the user's roles.
		Role role = userRoleRepository.findByName(UserRoleName.ROLE_USER).orElseThrow(() ->
				new AppException("User Role not set."));

		// 3. Create the new User.
		User user = new User(signUpRequest.getUsername(), signUpRequest.getFirstName(), signUpRequest.getLastName(),
				encodedPassword, Collections.singletonList(role));

		// 4. Save the user in the database.
		return userRepository.save(user);
	}

	/**
	 * Checks whether a given username exists.
	 *
	 * @param username A username to be checked.
	 * @return A boolean indicating whether the username exists.
	 */

	public Boolean checkUsernameAvailability(String username) {
		return userRepository.existsByUsername(username);
	}

	/**
	 * Gets the details of a given user.
	 *
	 * @param username The username of an existing user.
	 * @return The matching user.
	 */

	public User getUserProfile(String username) {
		return userRepository.findByUsername(username).orElseThrow(() ->
				new ResourceNotFoundException(USER, USERNAME, username));
	}

	/**
	 * Logs in the user to an existing user account.
	 *
	 * @param loginRequest The request containing the details of the account to be logged into.
	 * @return The JwT token to be used with future requests.
	 */

	public String loginUser(LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						loginRequest.getUsername(),
						loginRequest.getPassword()
				)
		);

		SecurityContextHolder.getContext().setAuthentication(authentication);
		return tokenProvider.generateToken(authentication);
	}
}
