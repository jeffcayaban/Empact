package com.empact.Empact.repository;

import com.empact.Empact.model.Argument;
import com.empact.Empact.model.CriticalQuestion;
import com.empact.Empact.model.Petition;
import com.empact.Empact.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Contains the methods for fetching the data from the Argument table in the database.
 */

@Repository
public interface ArgumentRepository extends JpaRepository<Argument, Long> {

	/**
	 * Fetches an argument from a given argument ID.
	 *
	 * @param argumentId The ID of the argument to be fetched.
	 * @return Some argument object
	 */

	Optional<Argument> findById(Long argumentId);

	/**
	 * Fetches a page of arguments given a petition and parent argument.
	 *
	 * @param petition The petition of which arguments are to be fetched from.
	 * @param parentArgument The parent argument of which arguments are to be fetched from.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching arguments.
	 */

	Page<Argument> findByRootPetitionAndParentArgument(Petition petition, Argument parentArgument, Pageable pageable);

	/**
	 * Fetches all of the arguments given a petition and parent argument.
	 *
	 * @param petition The petition of which arguments are to be fetched from.
	 * @param argument The parent argument of which arguments are to be fetched from.
	 * @return The full list of matching arguments.
	 */

	List<Argument> findAllByRootPetitionAndParentArgument(Petition petition, Argument argument);

	/**
	 * Fetches all of the arguments for given a parent argument.
	 *
	 * @param argument The parent argument of which arguments are to be fetched from.
	 * @return The full list of matching arguments.
	 */

	List<Argument> findAllByParentArgument(Argument argument);


	/**
	 * Fetches a page of arguments for given a user and anonymity.
	 *
	 * @param createdBy The user to be matched against.
	 * @param isAnonymous Indicates whether to fetch arguments that are anonymous.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching arguments.
	 */

	Page<Argument> findByCreatedByAndIsAnonymous(User createdBy, Boolean isAnonymous, Pageable pageable);

	/**
	 * Fetches a page of arguments for given a user
	 *
	 * @param createdBy The user to be matched against.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching arguments.
	 */

	Page<Argument> findByCreatedBy(User createdBy, Pageable pageable);

	/**
	 * Fetches all of the arguments for given a user.
	 *
	 * @param createdBy The user to be matched against.
	 * @return The full list of matching arguments.
	 */

	List<Argument> findByCreatedBy(User createdBy);

	/**
	 * Fetches a page of arguments given a petition, whether it is supporting or opposing, and parent argument.
	 *
	 * @param petition The petition of which arguments are to be fetched from.
	 * @param isSupporting Indicates whether to fetch arguments that supports or opposes its parent.
	 * @param parentArgument The parent argument of which arguments are to be fetched from.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching arguments.
	 */

	Page<Argument> findByRootPetitionAndIsSupportingAndParentArgument(Petition petition, Boolean isSupporting,
																	  Argument parentArgument, Pageable pageable);

	/**
	 * Fetches a page of arguments given a parent argument and whether they support or oppose it.
	 *
	 * @param argumentId The ID of the parent argument.
	 * @param isSupporting Indicates whether to fetch arguments that supports or opposes its parent.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching arguments.
	 */

	Page<Argument> findByParentArgumentIdAndIsSupporting(Long argumentId, Boolean isSupporting, Pageable pageable);

	/**
	 * Fetches the ID of the parent argument of an argument.
	 *
	 * @param id The ID of the argument in focus.
	 * @return The ID of the parent argument of an argument.
	 */

	@Query("SELECT a.parentArgument.id FROM Argument a WHERE a.id = :argumentId")
	Long findParentArgumentIdById(@Param("argumentId") Long id);

	/**
	 * Fetches the number of arguments that belong to a petition and parent argument, and additionally those that are
	 * either supporting or opposing its parent.
	 *
	 * @param petition The petition for which the arguments belong under.
	 * @param isSupporting Indicates whether to fetch arguments that supports or opposes its parent.
	 * @param parentArgument The parent argument of which arguments are to be fetched from.
	 * @return The number of matching arguments.
	 */

	Long countAllByRootPetitionAndIsSupportingAndParentArgument(Petition petition, Boolean isSupporting,
																Argument parentArgument);

	/**
	 * Fetches the number of arguments that belong to parent argument, and additionally those that are either supporting
	 * or opposing its parent.
	 *
	 * @param argument The parent argument of which arguments are to be fetched from.
	 * @param isSupporting Indicates whether to fetch arguments that supports or opposes its parent.
	 * @return The number of matching arguments.
	 */

	Long countAllByParentArgumentAndIsSupporting(Argument argument, Boolean isSupporting);

	/**
	 * Fetches a page of the most discussed arguments.
	 *
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching arguments.
	 */

	@Query("SELECT a FROM Argument a ORDER BY size(a.arguments) DESC")
	Page<Argument> findMostDiscussedArguments(Pageable pageable);

	/**
	 * Fetches a page of the most discussed arguments from a petition that is not closed.
	 *
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching arguments.
	 */

	@Query("SELECT a FROM Argument a WHERE a.rootPetition.closingDateTime > CURRENT_TIMESTAMP ORDER BY size(a.arguments) DESC")
	Page<Argument> findMostDiscussedArgumentsAndIsNotClosed(Pageable pageable);

	/**
	 * Fetches a page of the most discussed arguments from a petition and is supporting or opposing its parent.
	 *
	 * @param petition The petition for which the arguments belong under.
	 * @param isSupporting Indicates whether to fetch arguments that supports or opposes its parent.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching arguments.
	 */

	@Query("SELECT a FROM Argument a WHERE a.rootPetition = :petition AND a.isSupporting = :isSupporting AND a.parentArgument IS NULL ORDER BY size(a.arguments) DESC")
	Page<Argument> findMostDiscussedForPetition(
			@Param("petition") Petition petition,
			@Param("isSupporting") Boolean isSupporting,
			Pageable pageable
	);

	/**
	 * Fetches a page of the least discussed arguments for a given petition and is supporting or opposing its parent.
	 *
	 * @param petition The petition for which the arguments belong under.
	 * @param isSupporting Indicates whether to fetch arguments that supports or opposes its parent.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching arguments.
	 */

	@Query("SELECT a FROM Argument a WHERE a.rootPetition = :petition AND a.isSupporting = :isSupporting AND a.parentArgument IS NULL ORDER BY size(a.arguments) ASC")
	Page<Argument> findLeastDiscussedForPetition(
			@Param("petition") Petition petition,
			@Param("isSupporting") Boolean isSupporting,
			Pageable pageable
	);

	/**
	 * Fetches a page of the most discussed arguments for a given argument and is supporting or opposing its parent.
	 *
	 * @param argument The parent argument of which arguments are to be fetched from.
	 * @param isSupporting Indicates whether to fetch arguments that supports or opposes its parent.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching arguments.
	 */

	@Query("SELECT a FROM Argument a WHERE a.parentArgument = :argument AND a.isSupporting = :isSupporting ORDER BY size(a.arguments) DESC")
	Page<Argument> findMostDiscussedForArgument(
			@Param("argument") Argument argument,
			@Param("isSupporting") Boolean isSupporting,
			Pageable pageable
	);

	/**
	 * Fetches a page of the least discussed arguments for a given argument and is supporting or opposing its parent.
	 *
	 * @param argument The parent argument of which arguments are to be fetched from.
	 * @param isSupporting Indicates whether to fetch arguments that supports or opposes its parent.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching arguments.
	 */

	@Query("SELECT a FROM Argument a WHERE a.parentArgument = :argument AND a.isSupporting = :isSupporting ORDER BY size(a.arguments) ASC")
	Page<Argument> findLeastDiscussedForArgument(
			@Param("argument") Argument argument,
			@Param("isSupporting") Boolean isSupporting,
			Pageable pageable
	);

	/**
	 * Fetches a page of the most discussed arguments for a given user and by anonymity.
	 *
	 * @param user The user for which the arguments are created by.
	 * @param isAnonymous Indicates whether to fetch arguments that are made anonymously or not.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching arguments.
	 */

	@Query("SELECT a FROM Argument a WHERE a.createdBy = :user AND a.isAnonymous = :isAnonymous ORDER BY size(a.arguments) DESC")
	Page<Argument> findMostDiscussedForUserAndIsAnonymous(
			@Param("user") User user,
			@Param("isAnonymous") Boolean isAnonymous,
			Pageable pageable
	);

	/**
	 * Fetches a page of the least discussed arguments for a given user and by anonymity.
	 *
	 * @param user The user for which the arguments are created by.
	 * @param isAnonymous Indicates whether to fetch arguments that are made anonymously or not.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching arguments.
	 */

	@Query("SELECT a FROM Argument a WHERE a.createdBy = :user AND a.isAnonymous = :isAnonymous ORDER BY size(a.arguments) ASC")
	Page<Argument> findLeastDiscussedForUserAndIsAnonymous(
			@Param("user") User user,
			@Param("isAnonymous") Boolean isAnonymous,
			Pageable pageable
	);

	/**
	 * Fetches a page of the most discussed arguments for a given user.
	 *
	 * @param user The user for which the arguments are created by.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching arguments.
	 */

	@Query("SELECT a FROM Argument a WHERE a.createdBy = :user ORDER BY size(a.arguments) DESC")
	Page<Argument> findMostDiscussedForUser(@Param("user") User user, Pageable pageable);

	/**
	 * Fetches a page of the least discussed arguments for a given user.
	 *
	 * @param user The user for which the arguments are created by.
	 * @param pageable The pageable containing the pagination options.
	 * @return A page of matching arguments.
	 */

	@Query("SELECT a FROM Argument a WHERE a.createdBy = :user ORDER BY size(a.arguments) ASC")
	Page<Argument> findLeastDiscussedForUser(@Param("user") User user, Pageable pageable);

	/**
	 * Fetches all the arguments that agrees or disagrees with a given critical question and belongs to a given
	 * petition.
	 *
	 * @param agreesWithCQ Indicates whether to fetch arguments that agrees or disagrees with a critical question.
	 * @param criticalQuestion The critical question for which the arguments are made towards.
	 * @param isWinning Indicates whether to fetch arguments that are labelled as winning.
	 * @param rootPetition The petition for which the arguments must belong under.
	 * @return The full list of matching arguments.
	 */

	List<Argument> findAllByAgreesWithCQAndCriticalQuestionAndIsWinningAndRootPetition(
			Boolean agreesWithCQ, CriticalQuestion criticalQuestion, Boolean isWinning, Petition rootPetition
	);

	// ---------------------------------------------- Method Wrappers ----------------------------------------------

	/**
	 * Fetches all the arguments required to generate the petition report on the client-side. This method represents
	 * a wrapper for the actual method, with the intention of using a method with a shorter name.
	 *
	 * @param agreesWithCQ Indicates whether to fetch arguments that agrees or disagrees with a critical question.
	 * @param criticalQuestion The critical question for which the arguments are made towards.
	 * @param isWinning Indicates whether to fetch arguments that are labelled as winning.
	 * @param rootPetition The petition for which the arguments must belong under.
	 * @return The full list of matching arguments.
	 */

	default List<Argument> findArgumentsForReport(Boolean agreesWithCQ, CriticalQuestion criticalQuestion,
												  Boolean isWinning, Petition rootPetition) {
		return findAllByAgreesWithCQAndCriticalQuestionAndIsWinningAndRootPetition(
				agreesWithCQ,
				criticalQuestion,
				isWinning,
				rootPetition
		);
	}
}
