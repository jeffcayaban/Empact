package com.empact.Empact.repository;

import com.empact.Empact.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Provides an interface containing default methods for querying the User entity in the database.
 */

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	/**
	 * Fetches some user given its username.
	 *
	 * @param username The username of the user to be fetched.
	 * @return Some user
	 */

	Optional<User> findByUsername(String username);

	/**
	 * Checks whether a given username is available.
	 *
	 * @param username The username to be checked.
	 * @return Whether the username is available or not.
	 */

	Boolean existsByUsername(String username);

}
