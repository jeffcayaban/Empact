package com.empact.Empact.repository;

import com.empact.Empact.model.arguments.ExpertOpinionArgument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Provides an interface containing default methods for querying the Arguments by Expert Opinion entity in the database.
 */

@Repository
public interface ExpertOpinionArgumentRepository extends JpaRepository<ExpertOpinionArgument, Long>  {

}
