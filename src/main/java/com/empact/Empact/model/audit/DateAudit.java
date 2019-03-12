package com.empact.Empact.model.audit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;
import java.time.Instant;

/**
 * Stores the details of when a petition or argument is created and updated.
 */

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"}, allowGetters = true)
@Data
public abstract class DateAudit implements Serializable {

	/** The timestamp of when the content is created. **/
	private @CreatedDate @Column(nullable = false, updatable = false) Instant createdAt;

	/** The timestamp of when the content is last updated. **/
	private @LastModifiedDate @Column(nullable = false) Instant updatedAt;
}
