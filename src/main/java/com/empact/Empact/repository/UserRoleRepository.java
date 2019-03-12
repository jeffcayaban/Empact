package com.empact.Empact.repository;

import com.empact.Empact.model.roles.Role;
import com.empact.Empact.model.roles.UserRoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Provides an interface containing default methods for querying the User Role entity in the database.
 */

@Repository
public interface UserRoleRepository extends JpaRepository<Role, Long> {

	/**
	 * Fetches some user role given the name of the role.
	 *
	 * @param userRoleName The name of the role to be fetched.
	 * @return Some user role.
	 */

	Optional<Role> findByName(UserRoleName userRoleName);
}
