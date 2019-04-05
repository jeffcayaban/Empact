package com.empact.Empact.service;

import com.empact.Empact.exception.ClosedPetitionException;
import com.empact.Empact.exception.ResourceNotFoundException;
import com.empact.Empact.model.*;
import com.empact.Empact.model.arguments.ExpertOpinionArgument;
import com.empact.Empact.model.arguments.PopularOpinionArgument;
import com.empact.Empact.payload.Argument.*;
import com.empact.Empact.payload.PagedResponse;
import com.empact.Empact.payload.Petition.PetitionReportResponse;
import com.empact.Empact.payload.TreeData.DataNode;
import com.empact.Empact.payload.TreeData.DataNodeShape;
import com.empact.Empact.payload.TreeData.DataNodeShapeProps;
import com.empact.Empact.payload.User.UserSummary;
import com.empact.Empact.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;

import static com.empact.Empact.util.AppConstants.*;
import static com.empact.Empact.util.Helpers.*;

/**
 *  The ArgumentService handles all data manipulation and transformation regarding Arguments. It also interacts with the
 *  data repositories and produces the response objects to be returned to the Controller layer.
 */

@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Service
public class ArgumentService {

	/** The User data repository **/
	private final UserRepository userRepository;

	/** The Argument data repository **/
	private final ArgumentRepository argumentRepository;

	/** The Petition data repository **/
	private final PetitionRepository petitionRepository;

	/** The "Argument by Expert Opinion" data repository **/
	private final ExpertOpinionArgumentRepository expertOpinionArgumentRepository;

	/** The "Argument by Popular Opinion" data repository **/
	private final PopularOpinionArgumentRepository popularOpinionArgumentRepository;

	/** The service that handles the logic concerning the data for Petitions. **/
	private final PetitionService petitionService;

	/**
	 * Gets the arguments for a given petition.
	 *
	 * @param petitionId The ID of the petition for which the arguments are to be retrieved from.
	 * @param page The page number.
	 * @param size The page size.
	 * @return The page of arguments.
	 */

	public PagedResponse<ArgumentResponse> getArgumentsByPetition(Long petitionId, int page, int size) {
		validatePageNumberAndSize(page, size);

		// 1. Find the petition.
		Petition petition = petitionRepository.findById(petitionId).orElseThrow(() ->
				new ResourceNotFoundException(PETITION, ID, petitionId));
		Pageable pageable = PageRequest.of(page, size, Sort.Direction.ASC, CREATED_AT);

		// 2. Fetch the petition's arguments.
		Page<Argument> arguments = argumentRepository.findByRootPetitionAndParentArgument(petition, null,
				pageable);

		if (arguments.getNumberOfElements() == 0) {
			// Return empty response object
			return new PagedResponse<>(Collections.emptyList(), arguments.getNumber(), arguments.getSize(),
					arguments.getTotalElements(), arguments.getTotalPages(), arguments.isLast());
		} else {
			// Transform and return the arguments into their response objects.
			return getArgumentResponses(arguments);
		}
	}

	/**
	 * Gets the arguments based on the creator's username and anonymity.
	 *
	 * @param page The page number.
	 * @param size The page size.
	 * @param sort How the results are to be sorted.
	 * @param username The username of the creator.
	 * @param showAnonymousContent Indicates whether anonymous arguments should be included.
	 * @return The page of arguments.
	 */

	public PagedResponse<ArgumentResponse> getArgumentsByUsernameAndAnonymity(int page, int size, String sort,
																			  String username, Boolean showAnonymousContent) {
		validatePageNumberAndSize(page, size);

		// 1. Find the user
		User user = userRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException(USER,
				USERNAME, username));

		// 2. Find the arguments
		Pageable pageable = createPageable(sort.toLowerCase(), page, size);
		Page<Argument> arguments = (showAnonymousContent)
				? argumentRepository.findByCreatedBy(user, pageable)
				: argumentRepository.findByCreatedByAndIsAnonymous(user, false, pageable);

		// 3. Produce the argument response objects.
		return getArgumentResponses(arguments);
	}

	/**
	 * Gets the argument by argument ID.
	 *
	 * @param argumentId The ID of the argument to be fetched.
	 * @return The argument response object.
	 */

	public ArgumentResponse getArgumentById(Long argumentId) {

		// 1. Find the argument with the provided ID.
		Argument argument = argumentRepository.findById(argumentId).orElseThrow(() ->
				new ResourceNotFoundException(ARGUMENT, ID, argumentId));

		// 2. Product the argument response object.
		return generateArgumentObject(argument);
	}

	/**
	 * Gets the arguments of a given petition.
	 *
	 * @param petitionId The ID of the petition to be fetched from.
	 * @param isSupporting Indicates whether the arguments fetched should be supporting or opposing.
	 * @param page The page number.
	 * @param size The page size.
	 * @param sort How the results are to be sorted.
	 * @return The page of arguments.
	 */

	public PagedResponse<ArgumentResponse> getArgumentsByRootPetitionId(Long petitionId, Boolean isSupporting, int page,
																		int size, String sort) {
		validatePageNumberAndSize(page, size);

		// 1. Find the root petition.
		Pageable pageable = createPageable(sort.toLowerCase(), page, size);
		Petition petition = petitionRepository.findById(petitionId).orElseThrow(() ->
				new ResourceNotFoundException(PETITION, ID, petitionId));

		// 2. Find arguments.
		Page<Argument> arguments = argumentRepository.findByRootPetitionAndIsSupportingAndParentArgument(
				petition, isSupporting, null, pageable);

		// 3. Produce the argument response objects.
		return getArgumentResponses(arguments);
	}

	/**
	 * Gets the arguments of a given argument.
	 *
	 * @param argumentId The ID of the argument to be fetched from.
	 * @param isSupporting Indicates whether the arguments fetched should be supporting or opposing.
	 * @param page The page number.
	 * @param size The page size.
	 * @param sort How the results are to be sorted.
	 * @return The page of arguments.
	 */

	public PagedResponse<ArgumentResponse> getArgumentsByArgumentId(Long argumentId, Boolean isSupporting, int page,
																	int size, String sort) {
		validatePageNumberAndSize(page, size);

		// 1. Find Arguments
		Pageable pageable = createPageable(sort.toLowerCase(), page, size);
		Page<Argument> arguments = argumentRepository.findByParentArgumentIdAndIsSupporting(argumentId, isSupporting,
				pageable);

		// 2. Produce the argument response objects.
		return getArgumentResponses(arguments);
	}

	/**
	 * Creates a new argument based on popular opinion.
	 *
	 * @param argByPopularOpinionRequest The details of the new argument.
	 * @return The newly created argument.
	 */

	public PopularOpinionArgument createArgumentByPopularOpinion(ArgByPopularOpinionRequest argByPopularOpinionRequest) {

		Long rootPetitionId = argByPopularOpinionRequest.getRootPetitionId();

		if (rootPetitionId == null && argByPopularOpinionRequest.getParentArgumentId() != null) {
			// If the root petition ID is not present in the request then locate the ID through the parent argument.

			rootPetitionId = getArgumentById(argByPopularOpinionRequest.getParentArgumentId()).getRootPetitionId();
			argByPopularOpinionRequest.setRootPetitionId(rootPetitionId);
		}

		if (!petitionService.isPetitionClosed(argByPopularOpinionRequest.getRootPetitionId())) {
			// Create the argument if the root petition is not closed.

			PopularOpinionArgument popularOpinionArgument = new PopularOpinionArgument();
			popularOpinionArgument.setExplanation(argByPopularOpinionRequest.getExplanation());
			setArgumentProperties(argByPopularOpinionRequest, popularOpinionArgument);

			PopularOpinionArgument newArg = popularOpinionArgumentRepository.save(popularOpinionArgument);
			updatePetitionTree(newArg.getRootPetition());

			return newArg;

		} else {
			// Assumes the petition is closed, so throw exception.
			throw new ClosedPetitionException(argByPopularOpinionRequest.getRootPetitionId());
		}
	}

	/**
	 * Edit the details of an existing argument (based on popular opinion).
	 *
	 * @param editPopularOpinionArgRequest The details of the new modifications.
	 * @return The updated argument.
	 */

	public PopularOpinionArgument editPopularOpinionArgument(EditPopularOpinionArgRequest editPopularOpinionArgRequest) {

		// 1. Find Argument.

		PopularOpinionArgument arg = (PopularOpinionArgument) argumentRepository.findById(
				editPopularOpinionArgRequest.getId()).orElseThrow(() ->
				new ResourceNotFoundException(ARGUMENT, ID, editPopularOpinionArgRequest.getId()));

		Petition petition = arg.getRootPetition();

		if (!isDateBeforeNow(petition.getClosingDateTime())) {
			// 2. If the petition is not closed, apply the requested modifications.

			arg.setExplanation(editPopularOpinionArgRequest.getExplanation());
			arg.setSources(editPopularOpinionArgRequest.getSources());
			arg.setIsAnonymous(editPopularOpinionArgRequest.getIsAnonymous());

			// 3. Save the modified argument
			return argumentRepository.save(arg);

		} else {
			// Assumes the petition is closed, so throw exception.
			throw new ClosedPetitionException(petition.getId());
		}
	}

	/**
	 * Edit the details of an existing argument (based on expert opinion).
	 *
	 * @param editExpertOpinionArgRequest The details of the new modifications.
	 * @return The updated argument.
	 */

	public ExpertOpinionArgument editExpertOpinionArgument(EditExpertOpinionArgRequest editExpertOpinionArgRequest) {

		// 1. Find Argument.

		ExpertOpinionArgument arg = (ExpertOpinionArgument) argumentRepository.findById(
				editExpertOpinionArgRequest.getId()).orElseThrow(() ->
				new ResourceNotFoundException(ARGUMENT, ID, editExpertOpinionArgRequest.getId()));

		Petition petition = arg.getRootPetition();

		if (!isDateBeforeNow(petition.getClosingDateTime())) {
			// 2. If the petition is not closed, apply the requested modifications.

			arg.setExpert(editExpertOpinionArgRequest.getExpert());
			arg.setExpertDomain(editExpertOpinionArgRequest.getExpertDomain());
			arg.setExpertAssertion(editExpertOpinionArgRequest.getExpertAssertion());
			arg.setSources(editExpertOpinionArgRequest.getSources());
			arg.setIsAnonymous(editExpertOpinionArgRequest.getIsAnonymous());

			// 3. Save the modified argument
			return argumentRepository.save(arg);

		} else {
			// Assumes the petition is closed, so throw exception.
			throw new ClosedPetitionException(petition.getId());
		}
	}

	/**
	 * Create a new argument based on expert opinion.
	 *
	 * @param argByExpertOpinionRequest The request object containing all the data of the new argument.
	 * @return The newly created argument.
	 */

	public ExpertOpinionArgument createArgumentByExpertOpinion(ArgByExpertOpinionRequest argByExpertOpinionRequest) {

		Long rootPetitionId = argByExpertOpinionRequest.getRootPetitionId();

		if (rootPetitionId == null && argByExpertOpinionRequest.getParentArgumentId() != null) {
			// If the root petition ID is not present in the request then locate the ID through the parent argument.

			rootPetitionId = getArgumentById(argByExpertOpinionRequest.getParentArgumentId()).getRootPetitionId();
			argByExpertOpinionRequest.setRootPetitionId(rootPetitionId);
		}

		if (!petitionService.isPetitionClosed(rootPetitionId)) {

			// 1. If the petition is not closed, then create the new argument
			ExpertOpinionArgument expertOpinionArgument = new ExpertOpinionArgument();
			expertOpinionArgument.setExpert(argByExpertOpinionRequest.getExpert());
			expertOpinionArgument.setExpertDomain(argByExpertOpinionRequest.getExpertDomain());
			expertOpinionArgument.setExpertAssertion(argByExpertOpinionRequest.getExpertAssertion());
			setArgumentProperties(argByExpertOpinionRequest, expertOpinionArgument);

			// 2. Save the new argument into the data repository.
			ExpertOpinionArgument newArg = expertOpinionArgumentRepository.save(expertOpinionArgument);

			// 3. Update each argument in the network to check if one is winning or losing.
			updatePetitionTree(newArg.getRootPetition());

			return newArg;

		} else {
			// Assumes the petition is closed, so throw exception.
			throw new ClosedPetitionException(argByExpertOpinionRequest.getRootPetitionId());
		}
	}

	/**
	 * Handles the request to delete an argument.
	 *
	 * @param modifyArgumentRequest Request object containing the ID of the argument to be deleted.
	 */

	public void deleteArgument(ModifyArgumentRequest modifyArgumentRequest) {
		// 1. Find the argument.
		Argument argument = argumentRepository.findById(modifyArgumentRequest.getArgumentId())
				.orElseThrow(() -> new ResourceNotFoundException(ARGUMENT, ID, modifyArgumentRequest.getArgumentId()));

		// 2. Delete the argument.
		deleteArgument(argument);
	}

	/**
	 * Deletes an existing argument.
	 *
	 * @param argument The argument to be deleted.
	 */

	public void deleteArgument(Argument argument) {

		// 1. Remove the argument from the supporters and attackers lists of the petition's arguments.
		Petition rootPetition = argument.getRootPetition();
		removeAttackersAndSupportersForContent(rootPetition);

		// 2. Delete the argument and any of its children arguments.
		deleteChildren(argument);

		// 3. Save the modified petition.
		petitionRepository.save(rootPetition);

		/*
			4. Fetch the modified petition and update the labelling for each of its arguments, to see if one is winning
			or losing.
		*/

		Petition updatedPetition = petitionRepository.findById(rootPetition.getId())
				.orElseThrow(() -> new ResourceNotFoundException(PETITION, ID, rootPetition.getId()));
		updatePetitionTree(updatedPetition);
	}

	/**
	 * Gets the parent argument for a given argument.
	 *
	 * @param argumentId The argument ID.
	 * @return The parent argument.
	 */

	public ArgumentResponse getParentArgumentById(Long argumentId) {
		// 1. Find the parent argument for the given argument ID.
		Long parentArgumentId = argumentRepository.findParentArgumentIdById(argumentId);

		// 2. Return the parent argument given it exists.
		return (parentArgumentId == null) ? null : getArgumentById(parentArgumentId);
	}

	/**
	 * Counts all the arguments that are made towards a petition and either supports or opposes it.
	 *
	 * @param petitionId The ID of the root petition.
	 * @param isSupporting Indicates whether the arguments fetched should be supporting or opposing.
	 * @return The number of matching arguments.
	 */

	public Long countAllByPetitionAndIsSupporting(Long petitionId, Boolean isSupporting) {
		// 1. Find the petition.
		Petition petition = petitionRepository.findById(petitionId).orElseThrow(() ->
				new ResourceNotFoundException(PETITION, ID, petitionId));

		// 2. Get the petition's children arguments.
		return argumentRepository.countAllByRootPetitionAndIsSupportingAndParentArgument(petition, isSupporting, null);
	}

	/**
	 * Counts all the arguments that are made towards an argument and either supports or opposes it.
	 *
	 * @param argumentId The ID of the argument.
	 * @param isSupporting Indicates whether the arguments fetched should be supporting or opposing.
	 * @return The number of matching arguments.
	 */

	public Long countAllByArgumentAndIsSupporting(Long argumentId, Boolean isSupporting) {
		// 1. Find the argument.
		Argument argument = argumentRepository.findById(argumentId).orElseThrow(() ->
				new ResourceNotFoundException(ARGUMENT, ID, argumentId));

		// 2. Get the argument's children arguments.
		return argumentRepository.countAllByParentArgumentAndIsSupporting(argument, isSupporting);
	}

	/**
	 * Fetches the most discussed arguments.
	 *
	 * @param pageSize The number of arguments per page.
	 * @param showClosed Include arguments that are part of closed petitions.
	 * @return The page of arguments.
	 */

	public PagedResponse<ArgumentResponse> getMostDiscussedArguments(int pageSize, boolean showClosed) {
		Pageable pageable = PageRequest.of(0, pageSize);

		// 1. Fetch the arguments
		Page<Argument> arguments = showClosed
				? argumentRepository.findMostDiscussedArguments(pageable)
				: argumentRepository.findMostDiscussedArgumentsAndIsNotClosed(pageable);


		// 2. Transform the arguments into the response objects.
		List<ArgumentResponse> argumentResponses = arguments.map(this::generateArgumentObject).getContent();
		return new PagedResponse<>(argumentResponses, arguments.getNumber(), arguments.getSize(),
				arguments.getTotalElements(), arguments.getTotalPages(), arguments.isLast());
	}

	/**
	 * Fetches the most or least discussed arguments for a given petition.
	 *
	 * @param page The page number of arguments to be fetched.
	 * @param size The number of arguments to be fetched.
	 * @param sort Decides whether the most or least discussed arguments should be at the top.
	 * @param petitionId The ID of the petition for which the arguments are to be fetched from.
	 * @param isSupporting Indicates whether to fetch arguments that are supporting or opposing the petition.
	 * @return The page of arguments.
	 */

	public PagedResponse<ArgumentResponse> getMostDiscussedArgsForPetition(int page, int size, String sort,
																		   Long petitionId, Boolean isSupporting) {

		Pageable pageable = PageRequest.of(page, size);

		// 1. Find the petition.
		Petition petition = petitionRepository.findById(petitionId).orElseThrow(() ->
				new ResourceNotFoundException(PETITION, ID, petitionId));

		if (sort.equals("asc")) {
			// 2. Return the least discussed arguments for the given petition.

			Page<Argument> arguments = argumentRepository.findLeastDiscussedForPetition(petition, isSupporting, pageable);
			List<ArgumentResponse> argumentResponses = arguments.map(this::generateArgumentObject).getContent();
			return new PagedResponse<>(argumentResponses, arguments.getNumber(), arguments.getSize(),
					arguments.getTotalElements(), arguments.getTotalPages(), arguments.isLast());
		} else {
			// 2. Return the most discussed arguments for the given petition.

			Page<Argument> arguments = argumentRepository.findMostDiscussedForPetition(petition, isSupporting, pageable);
			List<ArgumentResponse> argumentResponses = arguments.map(this::generateArgumentObject).getContent();
			return new PagedResponse<>(argumentResponses, arguments.getNumber(), arguments.getSize(),
					arguments.getTotalElements(), arguments.getTotalPages(), arguments.isLast());
		}
	}

	/**
	 * Fetches the most or least discussed arguments for a given argument.
	 *
	 * @param page The page number of arguments to be fetched.
	 * @param size The number of arguments to be fetched.
	 * @param sort Decides whether the most or least discussed arguments should be at the top.
	 * @param argumentId The ID of the argument for which the arguments are to be fetched from.
	 * @param isSupporting Indicates whether to fetch arguments that are supporting or opposing the argument.
	 * @return The page of arguments.
	 */

	public PagedResponse<ArgumentResponse> getMostDiscussedArgsForArgument(int page, int size, String sort, Long argumentId,
																		   Boolean isSupporting) {

		Pageable pageable = PageRequest.of(page, size);

		// 1. Find the argument.
		Argument argument = argumentRepository.findById(argumentId).orElseThrow(() ->
				new ResourceNotFoundException(ARGUMENT, ID, argumentId));

		if (sort.equals("asc")) {
			// 2. Return the least discussed arguments for the given argument.

			Page<Argument> arguments = argumentRepository.findLeastDiscussedForArgument(argument, isSupporting, pageable);
			List<ArgumentResponse> argumentResponses = arguments.map(this::generateArgumentObject).getContent();
			return new PagedResponse<>(argumentResponses, arguments.getNumber(), arguments.getSize(), arguments.getTotalElements(),
					arguments.getTotalPages(), arguments.isLast());
		} else {
			// 2. Return the most discussed arguments for the given argument.

			Page<Argument> arguments = argumentRepository.findMostDiscussedForArgument(argument, isSupporting, pageable);
			List<ArgumentResponse> argumentResponses = arguments.map(this::generateArgumentObject).getContent();
			return new PagedResponse<>(argumentResponses, arguments.getNumber(), arguments.getSize(), arguments.getTotalElements(),
					arguments.getTotalPages(), arguments.isLast());
		}
	}

	/**
	 * Fetches the most or least discussed arguments for a given user.
	 *
	 * @param page The page number of arguments to be fetched.
	 * @param size The page number of arguments to be fetched.
	 * @param sort Decides whether the most or least discussed arguments should be at the top.
	 * @param username The username of the user for which the arguments are to be fetched from.
	 * @param showAnonymousContent Indicates whether arguments that are created with anonymity are to be fetched.
	 * @return The page of arguments.
	 */

	public PagedResponse<ArgumentResponse> getMostDiscussedArgsForUser(int page, int size, String sort, String username,
																		   Boolean showAnonymousContent) {

		Pageable pageable = PageRequest.of(page, size);

		// 1. Find the user.
		User user = userRepository.findByUsername(username).orElseThrow(() ->
				new ResourceNotFoundException(USER, ID, username));

		if (showAnonymousContent) {

			if (sort.equals("asc")) {
				// 2. Return the least discussed arguments that are created to be anonymous for the given user.

				Page<Argument> arguments = argumentRepository.findLeastDiscussedForUser(user, pageable);
				List<ArgumentResponse> argumentResponses = arguments.map(this::generateArgumentObject).getContent();

				return new PagedResponse<>(argumentResponses, arguments.getNumber(), arguments.getSize(),
						arguments.getTotalElements(), arguments.getTotalPages(), arguments.isLast());
			} else {
				// 2. Return the most discussed arguments that are created to be anonymous for the given user.

				Page<Argument> arguments = argumentRepository.findMostDiscussedForUser(user, pageable);
				List<ArgumentResponse> argumentResponses = arguments.map(this::generateArgumentObject).getContent();

				return new PagedResponse<>(argumentResponses, arguments.getNumber(), arguments.getSize(),
						arguments.getTotalElements(), arguments.getTotalPages(), arguments.isLast());
			}
		} else {
			if (sort.equals("asc")) {
				// 2. Return the least discussed arguments that are not created to be anonymous for the given user.

				Page<Argument> arguments = argumentRepository.findLeastDiscussedForUserAndIsAnonymous(user,
						showAnonymousContent, pageable);
				List<ArgumentResponse> argumentResponses = arguments.map(this::generateArgumentObject).getContent();

				return new PagedResponse<>(argumentResponses, arguments.getNumber(), arguments.getSize(),
						arguments.getTotalElements(), arguments.getTotalPages(), arguments.isLast());
			} else {
				// 2. Return the most discussed arguments that are not created to be anonymous for the given user.

				Page<Argument> arguments = argumentRepository.findMostDiscussedForUserAndIsAnonymous(user,
						showAnonymousContent, pageable);
				List<ArgumentResponse> argumentResponses = arguments.map(this::generateArgumentObject).getContent();

				return new PagedResponse<>(argumentResponses, arguments.getNumber(), arguments.getSize(),
						arguments.getTotalElements(), arguments.getTotalPages(), arguments.isLast());
			}
		}
	}

	/**
	 * Fetches the children arguments for a petition or argument that will be used for the argument data visualisation
	 * tree.
	 *
	 * @param contentId The ID of the root petition or root argument.
	 * @param isPetition Indicates whether the contentId is a petition or argument.
	 * @return Root DataNode
	 */

	public DataNode getContentChildren(Long contentId, Boolean isPetition) {
		DataNode mainNode = new DataNode();
		List<DataNode> childrenDataNodes;

		if (isPetition) {
			// Content is a Petition.

			Petition petition = petitionRepository.findById(contentId).orElseThrow(() ->
					new ResourceNotFoundException(PETITION, ID, contentId));

			mainNode.setContentId(petition.getId());
			mainNode.setContentType(PETITION.toLowerCase());
			mainNode.setName("Current " + PETITION);

			// Find the children arguments for the petition.
			List<Argument> arguments = argumentRepository.findAllByRootPetitionAndParentArgument(petition, null);
			childrenDataNodes = arguments.stream().map(this::getDataVisualisationArgumentNodes).collect(Collectors.toList());

		} else {
			// Content is an Argument.

			Argument argument = argumentRepository.findById(contentId).orElseThrow(() ->
					new ResourceNotFoundException(ARGUMENT, ID, contentId));

			mainNode.setContentId(argument.getId());
			mainNode.setContentType(ARGUMENT.toLowerCase());
			mainNode.setName("Current " + ARGUMENT);

			// Find the children arguments for the argument.
			List<Argument> arguments = argumentRepository.findAllByParentArgument(argument);
			childrenDataNodes = arguments.stream().map(this::getDataVisualisationArgumentNodes).collect(Collectors.toList());
		}

		mainNode.setChildren(childrenDataNodes);
		return mainNode;
	}

	/**
	 * Generates a report of the arguments that are supporting and opposing the different elements of the petition.
	 *
	 * @param petitionId The ID of the petition for which the report is to be generated on.
	 * @return An object containing the arguments supporting and opposing the different elements of the petition.
	 */

	public PetitionReportResponse getPetitionReport(Long petitionId) {

		// Fetch the petition from the given ID.
		Petition petition = petitionRepository.findById(petitionId).orElseThrow(() ->
				new ResourceNotFoundException(PETITION, ID, petitionId));

		// Fetches the arguments supporting the situation.
		HashSet<ArgumentResponse> argsSupportingSituation = new HashSet<>();

		List<Argument> tempSupportingSituation = argumentRepository.findArgumentsForReport(
				true, CriticalQuestion.CQ1, true, petition);
		tempSupportingSituation.forEach(arg -> argsSupportingSituation.add(generateArgumentObject(arg)));

		// Fetches the arguments supporting the action achieving the goal.
		HashSet<ArgumentResponse> argsSupportingActionGoal = new HashSet<>();

		List<Argument> tempArgsSupportingActionGoal = argumentRepository.findArgumentsForReport(
				true, CriticalQuestion.CQ2, true, petition);

		tempArgsSupportingActionGoal.forEach(arg -> argsSupportingActionGoal.add(generateArgumentObject(arg)));

		// Fetches the arguments NOT supporting the situation.
		HashSet<ArgumentResponse> argsNotSupportingSituation = new HashSet<>();

		List<Argument> tempArgsNotSupportingSituation = argumentRepository.findArgumentsForReport(
				false, CriticalQuestion.CQ1, true, petition);
		tempArgsNotSupportingSituation.forEach(arg -> argsNotSupportingSituation.add(generateArgumentObject(arg)));

		// Fetches the arguments NOT supporting the action achieving the goal.
		HashSet<ArgumentResponse> argsNotSupportingActionGoal = new HashSet<>();

		List<Argument> tempArgsNotSupportingActionGoal = argumentRepository
				.findArgumentsForReport(false, CriticalQuestion.CQ2, true, petition);
		tempArgsNotSupportingActionGoal.forEach(arg -> argsNotSupportingActionGoal.add(generateArgumentObject(arg)));

		int noOfPetitionElementsWinning = 0;

		if ((argsSupportingSituation.size() > 0) && (argsSupportingSituation.size() >= argsNotSupportingSituation.size())) {
			// Assumes that the number of arguments supporting the situation outweighs those opposing it.
			noOfPetitionElementsWinning += 1;
		}

		if ((argsSupportingActionGoal.size() > 0) && (argsSupportingActionGoal.size() >= argsNotSupportingActionGoal.size())) {
			// Assumes that the number of arguments supporting the action in achieving the goal outweighs those opposing it.
			noOfPetitionElementsWinning += 1;
		}

		boolean isPetitionWinning = noOfPetitionElementsWinning >= 1;

		return new PetitionReportResponse(
				isPetitionWinning,
				new ArrayList<>(argsSupportingSituation),
				new ArrayList<>(argsSupportingActionGoal),
				new ArrayList<>(argsNotSupportingSituation),
				new ArrayList<>(argsNotSupportingActionGoal)
		);
	}

	// -------------------------------------------- Helper Methods --------------------------------------------

	/**
	 * Transforms a page of arguments into their response objects.
	 *
	 * @param arguments The list of arguments.
	 * @return A page of argument response objects.
	 */

	private PagedResponse<ArgumentResponse> getArgumentResponses(Page<Argument> arguments) {
		List<ArgumentResponse> argumentResponses = arguments.map(this::generateArgumentObject).getContent();
		return new PagedResponse<>(argumentResponses, arguments.getNumber(), arguments.getSize(),
				arguments.getTotalElements(), arguments.getTotalPages(), arguments.isLast());
	}

	/**
	 * Produces the argument response object from the argument.
	 *
	 * @param argument The argument to be transformed.
	 * @return The response object of the argument.
	 */

	private ArgumentResponse generateArgumentObject(Argument argument) {

		if (argument instanceof ExpertOpinionArgument) {
			// The argument is based on expert opinion.

			ArgByExpertOpinion arg = new ArgByExpertOpinion();
			arg.setExpert(((ExpertOpinionArgument) argument).getExpert());
			arg.setExpertDomain(((ExpertOpinionArgument) argument).getExpertDomain());
			arg.setExpertAssertion(((ExpertOpinionArgument) argument).getExpertAssertion());
			setGeneralArgumentProperties(argument, arg);
			arg.setArgumentType(EXPERT_OPINION);

			return arg;

		} else if (argument instanceof PopularOpinionArgument) {
			// The argument is based on popular opinion.

			ArgByPopularOpinion arg = new ArgByPopularOpinion();
			arg.setExplanation(((PopularOpinionArgument) argument).getExplanation());
			setGeneralArgumentProperties(argument, arg);
			arg.setArgumentType(POPULAR_OPINION);

			return arg;

		} else {
			// The argument's type is unidentifiable so return nothing.
			return null;
		}
	}

	/**
	 * Sets the common properties of an argument response object.
	 *
	 * @param argument The argument containing the details to be applied.
	 * @param argumentResponse The response object of the properties to be applied on.
	 */

	private void setGeneralArgumentProperties(Argument argument, ArgumentResponse argumentResponse) {

		argumentResponse.setId(argument.getId());
		argumentResponse.setIsAnonymous(argument.getIsAnonymous());
		argumentResponse.setIsSupporting(argument.getIsSupporting());
		argumentResponse.setRootPetitionId(argument.getRootPetition().getId());
		argumentResponse.setSources(argument.getSources());
		argumentResponse.setAgreesWithCQ(argument.getAgreesWithCQ());
		argumentResponse.setCriticalQuestionId(argument.getCriticalQuestion().name());
		argumentResponse.setCreationDateTime(argument.getCreatedAt());
		argumentResponse.setLastUpdatedDateTime(argument.getUpdatedAt());
		argumentResponse.setIsWinning(argument.getIsWinning());

		Argument parentArg = argument.getParentArgument();

		if (parentArg != null) {
			// Assumes that the argument was made to another argument.
			argumentResponse.setParentArgumentId(parentArg.getId());
		}

		if (argument.getSubCriticalQuestion() != null) {
			// Assumes that the argument was made to another argument.
			argumentResponse.setSubCriticalQuestionId(argument.getSubCriticalQuestion().name());
		}

		User user = argument.getCreatedBy();

		argumentResponse.setCreatedBy(new UserSummary(
				user.getId(),
				user.getUsername(),
				user.getFirstName(),
				user.getLastName(),
				user.getRoles().stream().map(role -> role.getName().name()).toArray(String[]::new)
		));
	}

	/**
	 * Set the properties of an argument object.
	 *
	 * @param argumentRequest The object containing the data of the argument object.
	 * @param argument The argument containing the properties.
	 */

	private void setArgumentProperties(ArgumentRequest argumentRequest, Argument argument) {

		argument.setAgreesWithCQ(argumentRequest.getAgreesWithCQ());
		argument.setCriticalQuestion(CriticalQuestion.valueOf(argumentRequest.getCriticalQuestionId()));
		argument.setSources(argumentRequest.getSources());
		argument.setIsAnonymous(argumentRequest.getIsAnonymous());
		argument.setIsSupporting(argumentRequest.getIsSupporting());
		argument.setSupporters(Collections.emptyList());
		argument.setAttackers(Collections.emptyList());
		argument.setNumberOfSupporters(0);
		argument.setNumberOfAttackers(0);

		Long parentArgumentId = argumentRequest.getParentArgumentId();
		Long petitionId;

		if (parentArgumentId != null) {
			// Assumes that the argument was made to another argument.

			Argument parentArgument = argumentRepository.findById(parentArgumentId).orElseThrow(() ->
					new ResourceNotFoundException(ARGUMENT, ID, parentArgumentId));
			argument.setSubCriticalQuestion(CriticalQuestion.valueOf(argumentRequest.getSubCriticalQuestionId()));
			argument.setParentArgument(parentArgument);

			petitionId = parentArgument.getRootPetition().getId();

		} else {
			// Assumes that the argument was made directly to the petition.
			petitionId = argumentRequest.getRootPetitionId();
		}

		Petition petition = petitionRepository.findById(petitionId).orElseThrow(() ->
				new ResourceNotFoundException(PETITION, ID, petitionId));
		argument.setRootPetition(petition);
	}

	/**
	 * Sets specific visual properties that is required for the data visualisation tree.
	 *
	 * @param dataNode The data node of the argument.
	 * @param arg Argument object
	 */

	private void setNameAndIsSupporting(DataNode dataNode, Argument arg) {

		DataNodeShapeProps dataNodeShapeProps = new DataNodeShapeProps();

		// The following values are represented as Pixels.
		dataNodeShapeProps.setWidth(15);
		dataNodeShapeProps.setHeight(15);
		dataNodeShapeProps.setX(-7.5);
		dataNodeShapeProps.setY(-7.5);

		if (arg.getIsSupporting()) {

			// Arguments that support its parent will be in Green.
			dataNode.setIsSupporting(true);
			dataNodeShapeProps.setFill("green");

		} else {

			// Arguments that opposes its parent will be in Red.
			dataNode.setIsSupporting(false);
			dataNodeShapeProps.setFill("red");
		}

		// The node will be represented as a Rectangle.
		DataNodeShape dataNodeShape = new DataNodeShape("rect", dataNodeShapeProps);
		dataNode.setNodeSvgShape(dataNodeShape);
		dataNode.setName(ARGUMENT + " #" + arg.getId());
	}

	/**
	 * Transforms each child argument into the appropriate data object for the argument data visualisation tree.
	 *
	 * @param arg Argument object
	 * @return DataNode used for the data visualisation.
	 */

	private DataNode getDataVisualisationArgumentNodes(Argument arg) {

		DataNode argumentNode = new DataNode();
		argumentNode.setContentId(arg.getId());
		argumentNode.setContentType(ARGUMENT.toLowerCase());
		setNameAndIsSupporting(argumentNode, arg);

		List<Argument> childrenArguments = arg.getArguments();

		if (childrenArguments.isEmpty()) {
			// The argument has no children arguments.
			argumentNode.setChildren(Collections.emptyList());
		} else {
			// Generate data object containing all the children for the data visualisation.
			argumentNode.setChildren(childrenArguments.stream().map(this::getDataVisualisationArgumentNodes)
					.collect(Collectors.toList()));
		}

		return argumentNode;
	}

	/**
	 * Updates the petition's network of arguments to determine whether the argument is winning or not.
	 *
	 * @param petition The petition to be updated.
	 */

	private void updatePetitionTree(Petition petition) {
		List<Argument> childrenArgs = argumentRepository.findAllByRootPetitionAndParentArgument(petition, null);

		if (childrenArgs.isEmpty()) {
			// The petition has no arguments, so only update the petition.
			setIsWinningAndSupporters(petition, 0, 0, true,
					Collections.emptyList(), Collections.emptyList());

		} else {
			// The petition has arguments, so update its arguments.
			determineContentIsWinning(petition, childrenArgs);
		}

		// Save any new changes.
		petitionRepository.save(petition);
	}

	/**
	 * Determines whether a petition or argument is winning based on the number of arguments that are supporting or
	 * opposing it.
	 *
	 * @param content The argument or petition to be checked on.
	 * @param childrenArgs The arguments that are directed to the content.
	 * @return The argument or petition that is labelled as either winning or losing.
	 */

	private BaseContent determineContentIsWinning(BaseContent content, List<Argument> childrenArgs) {
		int numberOfSupporters = 0;
		int numberOfAttackers = 0;

		CopyOnWriteArrayList<Argument> supporters = new CopyOnWriteArrayList<>();
		CopyOnWriteArrayList<Argument> attackers = new CopyOnWriteArrayList<>();
		CopyOnWriteArrayList<Argument> newChildArgs = new CopyOnWriteArrayList<>(childrenArgs);

		// 1. Count the number of arguments supporting and oppsing the current argument/argument.

		for (Argument child: newChildArgs) {
			Argument newChild = (Argument) determineContentIsWinning(child, child.getArguments());

			Integer noOfAttackers = newChild.getNumberOfAttackers();
			Integer noOfSupporters = newChild.getNumberOfSupporters();

			List<Argument> supportersOfChild = newChild.getSupporters();
			List<Argument> attackersOfChild = newChild.getAttackers();

			if (newChild.getIsSupporting()) {
				// The child supports its parent.
				numberOfSupporters += noOfSupporters + 1;
				numberOfAttackers += noOfAttackers;

				supporters.addAll(supportersOfChild);
				supporters.add(child);
				attackers.addAll(attackersOfChild);

			} else {
				// The child opposes its parent.
				numberOfSupporters += noOfAttackers;
				numberOfAttackers += noOfSupporters + 1;

				supporters.addAll(attackersOfChild);
				attackers.addAll(supportersOfChild);
				attackers.add(child);
			}
		}

		// 2. Determine if the content is supported or opposed.

		boolean isContentWinning = numberOfSupporters >= numberOfAttackers;
		setIsWinningAndSupporters(content, numberOfSupporters, numberOfAttackers, isContentWinning, attackers, supporters);

		// 3. If the content is a petition then determine whether each of its elements are supported or opposed.

		if (content instanceof Petition) {
			// The content is a Petition.

			Set<CriticalQuestion> cqs = new HashSet<>();
			childrenArgs.forEach(arg -> cqs.add(arg.getCriticalQuestion()));

			for (CriticalQuestion cq: cqs) {
				List<Argument> cqSupporters = new ArrayList<>();
				List<Argument> cqAttackers = new ArrayList<>();
				List<Argument> argumentsWithCq = childrenArgs.stream()
						.filter(arg -> arg.getCriticalQuestion().equals(cq)).collect(Collectors.toList());

				int numbersOfCqSupporters = 0;
				int numberOfCqAttackers = 0;

				// Determine all the arguments that agree and disagree with the critical question.
				for (Argument argument: argumentsWithCq) {

					if (argument.getAgreesWithCQ()) {
						// The argument agrees with the critical question.

						numbersOfCqSupporters += (argument.getNumberOfSupporters() + 1);
						numberOfCqAttackers += argument.getNumberOfAttackers();

						cqSupporters.addAll(argument.getSupporters());
						cqSupporters.add(argument);

						cqAttackers.addAll(argument.getAttackers());

					} else {
						// The argument disagrees with the critical question.

						numbersOfCqSupporters += argument.getNumberOfAttackers();
						numberOfCqAttackers += (argument.getNumberOfSupporters() + 1);

						cqSupporters.addAll(argument.getAttackers());

						cqAttackers.addAll(argument.getSupporters());
						cqAttackers.add(argument);
					}
				}

				int finalNumbersOfCqSupporters = numbersOfCqSupporters;
				int finalNumberOfCqAttackers = numberOfCqAttackers;

				boolean cqIsWinning = finalNumbersOfCqSupporters >= finalNumberOfCqAttackers;

				argumentsWithCq.forEach(arg -> {
					setIsWinningAndSupporters(arg, finalNumbersOfCqSupporters, finalNumberOfCqAttackers, cqIsWinning,
							cqAttackers, cqSupporters);
				});

				// Update the arguments for a specific critical question to label them as either winning or losing.
				finalUpdateChildren(argumentsWithCq, finalNumbersOfCqSupporters, finalNumberOfCqAttackers, cqSupporters,
						cqAttackers);
			}

		} else {
			// The content is an Argument.

			int finalNumberOfSupporters = numberOfSupporters;
			int finalNumberOfAttackers = numberOfAttackers;

			// Update the arguments to label them as either winning or losing.
			childrenArgs.forEach(arg -> updateChildren(arg, finalNumberOfSupporters, finalNumberOfAttackers,
					supporters, attackers));
		}

		return content;
	}

	/**
	 * Updates the arguments for a given critical question to either be winning or losing.
	 *
	 * @param argumentsForCq The arguments for a given critical question.
	 * @param numberOfCqSupporters The number of arguments that agrees with the critical question.
	 * @param numberOfCqAttackers The number of arguments that disagrees with the critical question.
	 * @param cqSupporters The arguments that agrees with the critical question.
	 * @param cqAttackers The arguments that disagrees with the critical question.
	 */

	private void finalUpdateChildren(List<Argument> argumentsForCq, int numberOfCqSupporters, int numberOfCqAttackers,
									 List<Argument> cqSupporters, List<Argument> cqAttackers) {

		CopyOnWriteArrayList<Argument> newChildArgs = new CopyOnWriteArrayList<>(argumentsForCq);

		for (Argument child: newChildArgs) {

			if (child.getAgreesWithCQ()) {
				// The argument agrees with the critical question.

				boolean isArgumentWinning = numberOfCqSupporters >= numberOfCqAttackers;

				CopyOnWriteArrayList<Argument> childSupporters = cqSupporters.stream().filter(arg ->
						!arg.getId().equals(child.getId())).collect(Collectors.toCollection(CopyOnWriteArrayList::new));

				setIsWinningAndSupporters(child, numberOfCqSupporters - 1, numberOfCqAttackers,
						isArgumentWinning, cqAttackers, childSupporters);

			} else {
				// The argument disagrees with the critical question.

				boolean isArgumentWinning = numberOfCqAttackers > numberOfCqSupporters;

				CopyOnWriteArrayList<Argument> childAttackers = cqAttackers.stream().filter(arg ->
						!arg.getId().equals(child.getId())).collect(Collectors.toCollection(CopyOnWriteArrayList::new));

				setIsWinningAndSupporters(child, numberOfCqAttackers - 1, numberOfCqSupporters,
						isArgumentWinning, cqSupporters, childAttackers);
			}

			// Traverse through all the children arguments.
			finalUpdateChildren(child.getArguments(), numberOfCqSupporters, numberOfCqAttackers, cqSupporters, cqAttackers);
		}
	}

	/**
	 * Updates the arguments for a given argument and labels them as either winning or losing.
	 *
	 * @param argument The argument to be checked upon.
	 * @param noOfSupporters The potential number of supporters for the argument.
	 * @param noOfAttackers The potential number of attackers for the argument.
	 * @param attackers The set of arguments that opposes the argument.
	 * @param supporters The set of arguments that supports the argument.
	 */

	private void updateChildren(Argument argument, Integer noOfSupporters, Integer noOfAttackers,
								List<Argument> attackers, List<Argument> supporters) {

		CopyOnWriteArrayList<Argument> childrenArguments = new CopyOnWriteArrayList<>(argument.getArguments());

		for (Argument childArgument: childrenArguments) {

			boolean parentIsWinning = argument.getIsWinning();
			boolean isChildSupporting = childArgument.getIsSupporting();

			if (isChildSupporting && parentIsWinning) {
				// The argument agrees with an argument that is winning.

				List<Argument> childSupporters = supporters.stream().filter(arg -> !arg.getId().equals(childArgument.getId()))
						.collect(Collectors.toList());

				setIsWinningAndSupporters(childArgument, noOfSupporters - 1, noOfAttackers, true,
						attackers, childSupporters);

			} else if (isChildSupporting) {
				// The argument agrees with an argument that is not winning.

				List<Argument> childSupporters = supporters.stream().filter(arg -> !arg.getId().equals(childArgument.getId()))
						.collect(Collectors.toList());

				setIsWinningAndSupporters(childArgument, noOfSupporters - 1, noOfAttackers, false,
						attackers, childSupporters);

			} else if (parentIsWinning) {
				// The argument disagrees with an argument that is winning.

				List<Argument> childSupporters = attackers.stream().filter(arg -> !arg.getId().equals(childArgument.getId()))
						.collect(Collectors.toList());

				setIsWinningAndSupporters(childArgument, noOfAttackers - 1, noOfSupporters, false,
						supporters, childSupporters);

			} else {
				// The argument disagrees with an argument that is not winning.

				List<Argument> childSupporters = attackers.stream().filter(arg -> !arg.getId().equals(childArgument.getId()))
						.collect(Collectors.toList());

				setIsWinningAndSupporters(childArgument, noOfAttackers - 1, noOfSupporters, true,
						supporters, childSupporters);
			}

			// Traverse through the children arguments.
			updateChildren(childArgument, noOfSupporters, noOfAttackers, attackers, supporters);
		}
	}

	/**
	 * Updates an argument or petition with the number of arguments and the arguments that are supporting and opposing
	 * it, in addition to labelling it as either winning or losing.
	 *
	 * @param content The argument or petition to be modified.
	 * @param numberOfSupporters The number of supporting arguments.
	 * @param numberOfAttackers The number of opposing arguments.
	 * @param isWinning Indicates whether the argument or petition is winning.
	 * @param attackers The set of arguments that opposes it.
	 * @param supporters The set of arguments that supports it.
	 */

	private void setIsWinningAndSupporters(BaseContent content, int numberOfSupporters, int numberOfAttackers,
										   boolean isWinning, List<Argument> attackers, List<Argument> supporters) {

		content.setIsWinning(isWinning);
		content.setNumberOfSupporters(numberOfSupporters);
		content.setNumberOfAttackers(numberOfAttackers);
		content.setAttackers(attackers);
		content.setSupporters(supporters);
	}

	/**
	 * Clears the set of attackers and supporters for a given petition or argument.
	 *
	 * @param content The argument or petition to be affected.
	 */

	private void removeAttackersAndSupportersForContent(BaseContent content) {
		CopyOnWriteArrayList<Argument> children;

		content.setAttackers(Collections.emptyList());
		content.setSupporters(Collections.emptyList());

		content.setNumberOfAttackers(0);
		content.setNumberOfSupporters(0);

		if (content instanceof Petition) {
			// The content is a petition.

			Petition petition = ((Petition) content);
			children = new CopyOnWriteArrayList<>(petition.getArguments());
		} else {
			// The content is an argument.

			Argument argument = (Argument) content;
			children = new CopyOnWriteArrayList<>(argument.getArguments());
		}

		if (!children.isEmpty()) {
			// The content has children arguments.
			children.forEach(this::removeAttackersAndSupportersForContent);
		}
	}

	/**
	 * Deletes the children arguments for a given petition or argument.
	 *
	 * @param content The argument or petition to be affected.
	 */

	private void deleteChildren(BaseContent content) {

		CopyOnWriteArrayList<Argument> children;

		if (content instanceof Petition) {
			// The content is a petition.
			Petition petition = ((Petition) content);
			children = new CopyOnWriteArrayList<>(petition.getArguments());

			if (!children.isEmpty()) {
				// The petition has children arguments, so delete them.
				children.forEach(this::deleteChildren);
			}

		} else {
			// The content is an argument.

			Argument argument = (Argument) content;
			children = new CopyOnWriteArrayList<>(((Argument) content).getArguments());

			if (!children.isEmpty()) {
				// The argument has children arguments, so delete them.
				children.forEach(this::deleteChildren);
			}

			Argument parentArg = argument.getParentArgument();

			if (parentArg != null) {
				// The argument was made to another argument.

				List<Argument> parentArgArguments = parentArg.getArguments();
				parentArgArguments.remove(argument);
				parentArg.setArguments(parentArgArguments);
				argument.setParentArgument(null);
			}

			if (argument instanceof PopularOpinionArgument) {
				// The argument is based on popular opinion.
				popularOpinionArgumentRepository.deleteById(argument.getId());

			} else if (argument instanceof ExpertOpinionArgument) {
				// The argument is based on expert opinion.
				expertOpinionArgumentRepository.deleteById(argument.getId());
			}
		}
	}
}
