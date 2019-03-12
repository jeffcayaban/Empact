package com.empact.Empact.model.roles;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;

/**
 * Stores the user's role.
 */

@Data
@Entity
@Table(name = "roles")
@NoArgsConstructor
public class Role {

	/** The ID of the user role **/
	private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;

	/** The name of the user role **/
	private @Enumerated(EnumType.STRING) @NaturalId @Column(length = 60) UserRoleName name;

	public Role(UserRoleName name) {
		this.name = name;
	}
}
