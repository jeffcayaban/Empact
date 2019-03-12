package com.empact.Empact.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

/**
 * Stores the contents of a user argument.
 */

@Data
@Entity
@Table(name = "petitions")
public class Petition extends BaseContent {

	/** The ID of the petition. **/
	private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;

	// Contents of a Petition

	/** The title of the petition. **/
	private @NotBlank @Size(max = 90) String title;

	/** The situation of the petition. **/
	private @NotBlank @Size(max = 3000) String situation;

	/** The proposed action of the petition. **/
	private @NotBlank @Size(max = 3000) String action;

	/** The proposed action of the petition. **/
	private @NotBlank @Size(max = 3000) String goal;

	/** The proposed action of the petition. **/
	private @NotBlank @Size(max = 3000) String value;

	/** The closing  of the petition. **/
	private @NotNull Instant closingDateTime;

	/** The list of arguments that are made towards it. **/
	@OneToMany(mappedBy = "rootPetition", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Argument> arguments = new ArrayList<>();
}
