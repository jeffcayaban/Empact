package com.empact.Empact.model;

import com.empact.Empact.model.roles.Role;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

/**
 * Stores the data of a user.
 */

@Data
@Entity
@Table(name = "users", uniqueConstraints = { @UniqueConstraint(columnNames = { "username" }) })
@NoArgsConstructor
public class User {

	/** The ID of the user **/
	private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;

	// Contents of a User

	/** The username of the user **/
	private @NotBlank @Size(max = 15) String username;

	/** The first name of the user **/
	private @NotBlank String firstName;

	/** The last name of the user **/
	private @NotBlank String lastName;

	/** The password of the user **/
	private @NotBlank @Size(max = 100) String password;

	/** The roles for the user. **/
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "role_id"))
	private List<Role> roles = new ArrayList<>();

	public User(String username, String firstName, String lastName, String password, List<Role> roles) {
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password;
		this.roles = roles;
	}
}
