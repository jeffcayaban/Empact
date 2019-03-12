package com.empact.Empact.security;

import com.empact.Empact.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Id;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Stores the details of the user. Is used for Spring Security.
 */

@Data
@AllArgsConstructor
public class CustomUserDetails implements UserDetails {

	/** The ID of the user **/
	private @Id Long id;

	/** The username of the user **/
	private String username;

	/** The first name of the user **/
	private String firstName;

	/** The last name of the user **/
	private String lastName;

	/** The password of the user **/
	private @JsonIgnore String password;

	/** The authorities for the user. **/
	private List<GrantedAuthority> authorities;

	public CustomUserDetails(User user) {
		this.id = user.getId();
		this.username = user.getUsername();
		this.firstName = user.getFirstName();
		this.lastName = user.getLastName();
		this.password = user.getPassword();
		this.authorities = user.getRoles().stream().map(role ->
				new SimpleGrantedAuthority(role.getName().name())).collect(Collectors.toList());
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
