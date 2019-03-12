package com.empact.Empact.model;

import com.empact.Empact.model.audit.UserDateAudit;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Stores the common properties for an argument and petition.
 */

@MappedSuperclass
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"}, allowGetters = true)
@Data
public class BaseContent extends UserDateAudit  {

	/** Indicates whether the argument or petition was created with anonymity. **/
	private Boolean isAnonymous;

	/** Indicates whether the argument or petition is winning. **/
	private Boolean isWinning;

	/** The number of arguments that are opposing this petition or argument. **/
	private Integer numberOfAttackers;

	/** The number of arguments that are supporting this petition or argument. **/
	private Integer numberOfSupporters;

	/** The list of arguments that are attacking this petition or argument. **/
	private @ManyToMany List<Argument> attackers = new ArrayList<>();

	/** The list of arguments that are supporting this petition or argument. **/
	private @ManyToMany List<Argument> supporters = new ArrayList<>();
}
