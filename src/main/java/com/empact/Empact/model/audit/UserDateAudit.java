package com.empact.Empact.model.audit;

import com.empact.Empact.model.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.domain.AuditorAware;

import javax.persistence.Column;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.OneToOne;

/**
 * Stores the details of who created the petition or argument.
 */

@MappedSuperclass
@JsonIgnoreProperties(value = {"createdBy", "updatedBy"}, allowGetters = true)
@Data
public abstract class UserDateAudit extends DateAudit {

	/** The user who created the petition or argument. **/
	private @CreatedBy @ManyToOne User createdBy;
}