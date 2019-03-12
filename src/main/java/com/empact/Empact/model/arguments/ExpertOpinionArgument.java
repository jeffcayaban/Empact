package com.empact.Empact.model.arguments;

import com.empact.Empact.model.Argument;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Stores the contents of an argument that is based on expert opinion.
 */

@Data
@Entity
@Table(name = "expert_opinion_arguments")
public class ExpertOpinionArgument extends Argument {

	/** The expert that is being referred to. **/
	private @NotBlank @Size(max = 90) @NotNull String expert;

	/** The expert's domain. **/
	private @NotBlank @Size(max = 6000) @NotNull String expertDomain;

	/** The expert's assertion. **/
	private @NotBlank @Size(max = 6000) @NotNull String expertAssertion;
}
