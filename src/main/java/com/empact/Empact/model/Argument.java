package com.empact.Empact.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Stores the contents of a user argument.
 */

@Data
@Entity
@Table(name = "arguments")
@Inheritance(strategy = InheritanceType.JOINED)
public class Argument extends BaseContent {

	/** The ID for an argument **/
	private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;

	/** Indicates whether the argument is supporting or opposing another argument or petition. **/
	private Boolean isSupporting;

	/** Indicates whether the argument agrees or disagrees with a particular critical question. **/
	private Boolean agreesWithCQ;

	/** Indicates the critical question that the argument and its ancestors answers to. **/
	private @Enumerated(EnumType.STRING) CriticalQuestion criticalQuestion;

	/** Indicates the critical question that the argument answers to. **/
	private @Enumerated(EnumType.STRING) CriticalQuestion subCriticalQuestion;

	/** The petition that the argument belongs to. Many arguments can belong to one root petition. **/
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "root_petition_id")
	@JsonIgnore
	private Petition rootPetition;

	/** The argument that this argument is created towards. Many arguments can belong to one parent argument. **/
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "parent_argument_id")
	@JsonIgnore
	private Argument parentArgument;

	/** The list of supporting and opposing arguments that are made towards this argument. The arguments that are made
	 * to this parent argument. **/
	@OneToMany(mappedBy = "parentArgument", fetch = FetchType.LAZY)
	private List<Argument> arguments = new ArrayList<>();

	/** The set of URL sources that supports this argument. **/
	@ElementCollection
	private List<String> sources;
}
