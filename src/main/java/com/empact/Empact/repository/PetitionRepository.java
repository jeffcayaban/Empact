package com.empact.Empact.repository;

import com.empact.Empact.model.Petition;
import com.empact.Empact.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Contains the methods for fetching the data from the Argument table in the database.
 */

@Repository
public interface PetitionRepository extends JpaRepository<Petition, Long> {

	/**
	 * Fetches an petition from a given petition ID.
	 *
	 * @param petitionId The ID of the petition to be fetched.
	 * @return Some petition object
	 */

	Optional<Petition> findById(Long petitionId);

	/**
	 * Fetches the list of petitions that are created by a given user.
	 *
	 * @param createdBy The user for which the petitions are created by.
	 * @return The list of petitions.
	 */

	List<Petition> findByCreatedBy(User createdBy);

	/**
	 * Fetches a page of closed petitions for a given user.
	 *
	 * @param createdBy The user for which the petitions are created by.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching petitions.
	 */

	@Query("SELECT p FROM Petition p WHERE p.createdBy = :createdBy AND p.closingDateTime < CURRENT_TIMESTAMP ")
	Page<Petition> findAllByCreatedByAndIsClosed(User createdBy, Pageable pageable);

	/**
	 * Fetches a page of open petitions for a given user.
	 *
	 * @param createdBy The user for which the petitions are created by.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching petitions.
	 */

	@Query("SELECT p FROM Petition p WHERE p.createdBy = :createdBy AND p.closingDateTime > CURRENT_TIMESTAMP ")
	Page<Petition> findAllByCreatedByAndIsNotClosed(User createdBy, Pageable pageable);

	/**
	 * Fetches a page of the most discussed closed petitions for a given user.
	 *
	 * @param createdBy The user for which the petitions are created by.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching petitions.
	 */

	@Query("SELECT p FROM Petition p WHERE p.createdBy = :createdBy AND p.closingDateTime < CURRENT_TIMESTAMP ORDER BY size(p.arguments) DESC")
	Page<Petition> findMostDiscussedAndIsClosedForUser(User createdBy, Pageable pageable);

	/**
	 * Fetches a page of the least discussed closed petitions for a given user.
	 *
	 * @param createdBy The user for which the petitions are created by.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching petitions.
	 */

	@Query("SELECT p FROM Petition p WHERE p.createdBy = :createdBy AND p.closingDateTime < CURRENT_TIMESTAMP ORDER BY size(p.arguments) ASC")
	Page<Petition> findLeastDiscussedAndIsClosedForUser(User createdBy, Pageable pageable);

	/**
	 * Fetches a page of the most discussed open petitions for a given user.
	 *
	 * @param createdBy The user for which the petitions are created by.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching petitions.
	 */

	@Query("SELECT p FROM Petition p WHERE p.createdBy = :createdBy AND p.closingDateTime > CURRENT_TIMESTAMP ORDER BY size(p.arguments) DESC")
	Page<Petition> findMostDiscussedAndIsNotClosedForUser(User createdBy, Pageable pageable);

	/**
	 * Fetches a page of the least discussed open petitions for a given user.
	 *
	 * @param createdBy The user for which the petitions are created by.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching petitions.
	 */

	@Query("SELECT p FROM Petition p WHERE p.createdBy = :createdBy AND p.closingDateTime > CURRENT_TIMESTAMP ORDER BY size(p.arguments) ASC")
	Page<Petition> findLeastDiscussedAndIsNotClosedForUser(User createdBy, Pageable pageable);

	/**
	 * Fetches a page of closed petitions for a given user and their anonymity.
	 *
	 * @param createdBy The user for which the petitions are created by.
	 * @param isAnonymous Indicates whether to fetch petitions that are made anonymously or not.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching petitions.
	 */

	@Query("SELECT p FROM Petition p WHERE p.createdBy = :createdBy AND p.isAnonymous = :isAnonymous AND p.closingDateTime < CURRENT_TIMESTAMP")
	Page<Petition> findAllByCreatedByAndIsAnonymousAndIsClosed(User createdBy, Boolean isAnonymous, Pageable pageable);

	/**
	 * Fetches a page of open petitions for a given user and their anonymity.
	 *
	 * @param createdBy The user for which the petitions are created by.
	 * @param isAnonymous Indicates whether to fetch petitions that are made anonymously or not.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching petitions.
	 */

	@Query("SELECT p FROM Petition p WHERE p.createdBy = :createdBy AND p.isAnonymous = :isAnonymous AND p.closingDateTime > CURRENT_TIMESTAMP")
	Page<Petition> findAllByCreatedByAndIsAnonymousAndIsNotClosed(User createdBy, Boolean isAnonymous, Pageable pageable);

	/**
	 * Fetches a page of the most discussed closed petitions for a given user and their anonymity.
	 *
	 * @param createdBy The user for which the petitions are created by.
	 * @param isAnonymous Indicates whether to fetch petitions that are made anonymously or not.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching petitions.
	 */

	@Query("SELECT p FROM Petition p WHERE p.createdBy = :createdBy AND p.isAnonymous = :isAnonymous AND p.closingDateTime < CURRENT_TIMESTAMP ORDER BY size(p.arguments) DESC")
	Page<Petition> findMostDiscussedAndIsAnonymousAndIsClosedForUser(User createdBy, Boolean isAnonymous, Pageable pageable);

	/**
	 * Fetches a page of the least discussed closed petitions for a given user and their anonymity.
	 *
	 * @param createdBy The user for which the petitions are created by.
	 * @param isAnonymous Indicates whether to fetch petitions that are made anonymously or not.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching petitions.
	 */

	@Query("SELECT p FROM Petition p WHERE p.createdBy = :createdBy AND p.isAnonymous = :isAnonymous AND p.closingDateTime < CURRENT_TIMESTAMP ORDER BY size(p.arguments) ASC")
	Page<Petition> findLeastDiscussedAndIsAnonymousAndIsClosedForUser(User createdBy, Boolean isAnonymous, Pageable pageable);

	/**
	 * Fetches a page of the most discussed open petitions for a given user and their anonymity.
	 *
	 * @param createdBy The user for which the petitions are created by.
	 * @param isAnonymous Indicates whether to fetch petitions that are made anonymously or not.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching petitions.
	 */

	@Query("SELECT p FROM Petition p WHERE p.createdBy = :createdBy AND p.isAnonymous = :isAnonymous AND p.closingDateTime > CURRENT_TIMESTAMP ORDER BY size(p.arguments) DESC")
	Page<Petition> findMostDiscussedAndIsAnonymousAndIsNotClosedForUser(User createdBy, Boolean isAnonymous, Pageable pageable);

	/**
	 * Fetches a page of the least discussed open petitions for a given user and their anonymity.
	 *
	 * @param createdBy The user for which the petitions are created by.
	 * @param isAnonymous Indicates whether to fetch petitions that are made anonymously or not.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching petitions.
	 */

	@Query("SELECT p FROM Petition p WHERE p.createdBy = :createdBy AND p.isAnonymous = :isAnonymous AND p.closingDateTime > CURRENT_TIMESTAMP ORDER BY size(p.arguments) ASC")
	Page<Petition> findLeastDiscussedAndIsAnonymousAndIsNotClosedForUser(User createdBy, Boolean isAnonymous, Pageable pageable);

	/**
	 * Fetches the page of open petitions.
	 *
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching petitions.
	 */

	@Query( "SELECT p from Petition p WHERE p.closingDateTime > CURRENT_TIMESTAMP" )
	Page<Petition> findAllByIsNotClosed(Pageable pageable);

	/**
	 * Fetches the page of closed petitions.
	 *
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching petitions.
	 */

	@Query( "SELECT p from Petition p WHERE p.closingDateTime < CURRENT_TIMESTAMP" )
	Page<Petition> findAllByIsClosed(Pageable pageable);

	/**
	 * Fetches the page of open petitions and sort them with the most discussed on the top.
	 *
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching petitions.
	 */

	@Query("SELECT p FROM Petition p WHERE p.closingDateTime > CURRENT_TIMESTAMP ORDER BY size(p.arguments) DESC")
	Page<Petition> findAllByMostArgumentsAndIsNotClosed(Pageable pageable);

	/**
	 * Fetches the page of close petitions and sort them with the most discussed on the top.
	 *
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching petitions.
	 */

	@Query("SELECT p FROM Petition p WHERE p.closingDateTime < CURRENT_TIMESTAMP ORDER BY size(p.arguments) DESC")
	Page<Petition> findAllByMostArgumentsAndIsClosed(Pageable pageable);

	/**
	 * Fetches the page of open petitions and sort them with the least discussed on the top.
	 *
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching petitions.
	 */

	@Query("SELECT p FROM Petition p WHERE p.closingDateTime > CURRENT_TIMESTAMP ORDER BY size(p.arguments) ASC")
	Page<Petition> findAllByLeastArgumentsAndIsNotClosed(Pageable pageable);

	/**
	 * Fetches the page of closed petitions and sort them with the least discussed on the top.
	 *
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching petitions.
	 */

	@Query("SELECT p FROM Petition p WHERE p.closingDateTime < CURRENT_TIMESTAMP ORDER BY size(p.arguments) ASC")
	Page<Petition> findAllByLeastArgumentsAndIsClosed(Pageable pageable);

	/**
	 * Fetches the page of closed petitions that match a given query.
	 *
	 * @param query The query to be searched.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching petitions.
	 */

	@Query("SELECT p FROM Petition p WHERE p.closingDateTime < CURRENT_TIMESTAMP AND (p.title LIKE %:query% OR p.situation LIKE %:query% OR p.action LIKE %:query% OR p.goal LIKE %:query% OR p.value LIKE %:query%)")
	Page<Petition> findAllByKeywordAndIsClosed(String query, Pageable pageable);

	/**
	 * Fetches the page of open petitions that match a given query.
	 *
	 * @param query The query to be searched.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching petitions.
	 */

	@Query("SELECT p FROM Petition p WHERE p.closingDateTime > CURRENT_TIMESTAMP AND (p.title LIKE %:query% OR p.situation LIKE %:query% OR p.action LIKE %:query% OR p.goal LIKE %:query% OR p.value LIKE %:query%)")
	Page<Petition> findAllByKeywordAndIsOpen(String query, Pageable pageable);
}
