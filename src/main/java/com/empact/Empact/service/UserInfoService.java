package com.empact.Empact.service;

import com.empact.Empact.model.User;
import com.empact.Empact.repository.UserRepository;
import com.empact.Empact.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * The UserInfoService is used to help provide the function of locating a user to JwtAuthenticationFilter.
 */

@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Service
public class UserInfoService implements UserDetailsService {

	/** The User data repository **/
	private final UserRepository userRepository;

	/**
	 * Loads a user by a username.
	 *
	 * @param username The username of the user to be loaded.
	 * @return The details of the matching user.
	 */

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User foundUser = userRepository.findByUsername(username).orElseThrow(() ->
			new UsernameNotFoundException("Unable to locate the user with the username: " + username));

		return new CustomUserDetails(foundUser);
	}

	/**
	 * This method is used by JWTAuthenticationFilter for loading an existing User.
	 *
	 * @param userId The ID of the user to be loaded.
	 * @return The details of the matching user.
	 */

	@Transactional
	public UserDetails loadUserById(Long userId) throws UsernameNotFoundException {
		User foundUser = userRepository.findById(userId).orElseThrow(() ->
				new UsernameNotFoundException("Unable to locate the user with the ID : " + userId));

		return new CustomUserDetails(foundUser);
	}
}
