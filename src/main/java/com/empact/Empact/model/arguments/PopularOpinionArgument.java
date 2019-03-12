package com.empact.Empact.model.arguments;

import com.empact.Empact.model.Argument;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Stores the contents of an argument that is based on popular opinion.
 */

@Data
@Entity
@Table(name = "popular_opinion_arguments")
public class PopularOpinionArgument extends Argument {

	/** The user's explanation **/
	private @NotBlank @Size(max = 6000) @NotNull String explanation;
}
