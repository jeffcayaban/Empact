package com.empact.Empact.repository;

import com.empact.Empact.model.arguments.PopularOpinionArgument;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Provides an interface containing default methods for querying the Arguments by Popular Opinion entity in the database.
 */

@Repository
public interface PopularOpinionArgumentRepository extends JpaRepository<PopularOpinionArgument, Long> {

	/**
	 * Deletes an argument by popular opinion given its ID.
	 *
	 * @param id The ID of the argument to be deleted.
	 */

	@Modifying
	@Query("DELETE FROM PopularOpinionArgument p where p.id = ?1")
	void deleteById(Long id);

}
