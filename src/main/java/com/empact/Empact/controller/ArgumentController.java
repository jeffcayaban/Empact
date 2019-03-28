package com.empact.Empact.controller;

import com.empact.Empact.model.Argument;
import com.empact.Empact.model.arguments.ExpertOpinionArgument;
import com.empact.Empact.model.arguments.PopularOpinionArgument;
import com.empact.Empact.payload.GenericAPIResponse;
import com.empact.Empact.payload.Argument.*;
import com.empact.Empact.payload.PagedResponse;
import com.empact.Empact.payload.Petition.PetitionReportResponse;
import com.empact.Empact.payload.TreeData.DataNode;
import com.empact.Empact.service.ArgumentService;
import com.empact.Empact.util.AppConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

/**
 * The ArgumentController intercepts requests to fetch data regarding Arguments.
 */

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@RequestMapping("/api/arguments")
public class ArgumentController {

	/** The service that handles the logic concerning the data for Petitions. **/
	private final ArgumentService argumentService;

	// ------------------------------------- API Endpoints -------------------------------------

	/**
	 * Gets the arguments for a given rootPetition.
	 *
	 * @param petitionId The ID of the rootPetition for which the arguments are to be retrieved from.
	 * @param page The page number.
	 * @param size The page size.
	 * @return The page of arguments.
	 */

	@GetMapping
	public PagedResponse<ArgumentResponse> getArguments(
			@RequestParam(value = "rootPetitionId") Long petitionId,
			@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
			@RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size
	) {
		return argumentService.getArgumentsByPetition(petitionId, page, size);
	}

	/**
	 * Create a new argument based on expert opinion.
	 *
	 * @param argByExpertOpinionRequest The request object containing all the data of the new argument.
	 * @return The newly created argument.
	 */

	@PostMapping("/createArgumentByExpertOpinion")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public CreateArgumentResponse createArgumentByExpertOpinion(@Valid @RequestBody ArgByExpertOpinionRequest argByExpertOpinionRequest) {
		ExpertOpinionArgument argument = argumentService.createArgumentByExpertOpinion(argByExpertOpinionRequest);
		return new CreateArgumentResponse(argument.getId().toString());
	}

	/**
	 * Creates a new argument based on popular opinion.
	 *
	 * @param argByPopularOpinionRequest The details of the new argument.
	 * @return The newly created argument.
	 */

	@PostMapping("/createArgumentByPopularOpinion")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public CreateArgumentResponse createArgumentByPopularOpinion(@Valid @RequestBody ArgByPopularOpinionRequest argByPopularOpinionRequest) {
		PopularOpinionArgument argument = argumentService.createArgumentByPopularOpinion(argByPopularOpinionRequest);
		return new CreateArgumentResponse(argument.getId().toString());
	}

	/**
	 * Edit the details of an existing argument (based on popular opinion).
	 *
	 * @param editPopularOpinionArgRequest The details of the new modifications.
	 * @return The updated argument.
	 */

	@PostMapping("/editArgumentByPopularOpinion")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> editArgumentByPopularOpinion(@Valid @RequestBody EditPopularOpinionArgRequest editPopularOpinionArgRequest) {
		Argument arg = argumentService.editPopularOpinionArgument(editPopularOpinionArgRequest);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{parentArgumentId}").buildAndExpand(arg.getId()).toUri();
		return ResponseEntity.created(location).body(new GenericAPIResponse(true, "Argument updated successfully."));
	}

	/**
	 * Edit the details of an existing argument (based on expert opinion).
	 *
	 * @param editExpertOpinionArgRequest The details of the new modifications.
	 * @return A response indicating the outcome of the operation.
	 */

	@PostMapping("/editArgumentByExpertOpinion")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> editArgumentByExpertOpinion(@Valid @RequestBody EditExpertOpinionArgRequest editExpertOpinionArgRequest) {
		Argument arg = argumentService.editExpertOpinionArgument(editExpertOpinionArgRequest);

		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest().path("/{parentArgumentId}")
				.buildAndExpand(arg.getId()).toUri();

		return ResponseEntity.created(location).body(new GenericAPIResponse(true, "Argument updated successfully."));
	}

	/**
	 * Deletes an existing argument.
	 *
	 * @param modifyArgumentRequest Request object containing the ID of the argument to be deleted.
	 * @return A response indicating the outcome of the operation.
	 */

	@DeleteMapping("/delete")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> deleteArgument(@Valid @RequestBody ModifyArgumentRequest modifyArgumentRequest) {
		argumentService.deleteArgument(modifyArgumentRequest);
		return ResponseEntity.accepted().body( new GenericAPIResponse(true, "Argument Deleted Successfully"));
	}

	/**
	 * Gets the argument by argument ID.
	 *
	 * @param argumentId The ID of the argument to be fetched.
	 * @return The argument matching the ID
	 */

	@GetMapping("/{argumentId}")
	public ArgumentResponse getArgumentById(@PathVariable Long argumentId) {
		return argumentService.getArgumentById(argumentId);
	}

	/**
	 * Gets the parent argument of an argument.
	 *
	 * @param argumentId The argument ID.
	 * @return The parent argument
	 */

	@GetMapping("/getParentArgumentById")
	public ArgumentResponse getParentArgumentById(@RequestParam(value = "argumentId") Long argumentId) {
		return argumentService.getParentArgumentById(argumentId);
	}

	/**
	 * Gets the arguments of a given rootPetition.
	 *
	 * @param petitionId The ID of the rootPetition to be fetched from.
	 * @param isSupporting Indicates whether the arguments fetched should be supporting or opposing.
	 * @param page The page number.
	 * @param size The page size.
	 * @param sort How the results are to be sorted.
	 * @return The page of arguments.
	 */

	@GetMapping("/getArgumentsByRootPetitionId")
	public PagedResponse<ArgumentResponse> getAllArgumentsByRootPetitionId(
			@RequestParam(value = "page") int page,
			@RequestParam(value = "size") int size,
			@RequestParam(value = "sort") String sort,
			@RequestParam(value = "rootPetitionId") Long petitionId,
			@RequestParam(value = "isSupporting") Boolean isSupporting) {

		return argumentService.getArgumentsByRootPetitionId(petitionId, isSupporting, page, size, sort);
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

	@GetMapping("/getArgumentsByArgumentId")
	public PagedResponse<ArgumentResponse> getAllArgumentsByArgumentId(
			@RequestParam(value = "page") int page,
			@RequestParam(value = "size") int size,
			@RequestParam(value = "sort") String sort,
			@RequestParam(value = "argumentId") Long argumentId,
			@RequestParam(value = "isSupporting") Boolean isSupporting) {
		return argumentService.getArgumentsByArgumentId(argumentId, isSupporting, page, size, sort);
	}

	/**
	 * Gets the most discussed arguments of a given petition.
	 *
	 * @param page The page number.
	 * @param size The page size.
	 * @param sort How the results are to be sorted.
	 * @param petitionId The ID of the petition to be fetched from.
	 * @param isSupporting Indicates whether the arguments fetched should be supporting or opposing.
	 * @return The page of arguments.
	 */

	@GetMapping("/getMostDiscussedArgsForPetition")
	public PagedResponse<ArgumentResponse> getMostDiscussedArgsForPetition(
			@RequestParam(value = "page") int page,
			@RequestParam(value = "size") int size,
			@RequestParam(value = "sort") String sort,
			@RequestParam(value = "petitionId") Long petitionId,
			@RequestParam(value = "isSupporting") Boolean isSupporting) {

		return argumentService.getMostDiscussedArgsForPetition(page, size, sort, petitionId, isSupporting);
	}

	/**
	 * Gets the most discussed arguments of a given argument.
	 *
	 * @param page The page number.
	 * @param size The page size.
	 * @param sort How the results are to be sorted.
	 * @param argumentId The ID of the argument to be fetched from.
	 * @param isSupporting Indicates whether the arguments fetched should be supporting or opposing.
	 * @return The page of arguments.
	 */

	@GetMapping("/getMostDiscussedArgsForArgument")
	public PagedResponse<ArgumentResponse> getMostDiscussedArgsForArgument(
			@RequestParam(value = "page") int page,
			@RequestParam(value = "size") int size,
			@RequestParam(value = "sort") String sort,
			@RequestParam(value = "argumentId") Long argumentId,
			@RequestParam(value = "isSupporting") Boolean isSupporting) {

		return argumentService.getMostDiscussedArgsForArgument(page, size, sort, argumentId, isSupporting);
	}

	/**
	 * Gets the most discussed arguments of a given user.
	 *
	 * @param page The page number.
	 * @param size The page size.
	 * @param sort How the results are to be sorted.
	 * @param username The username of the user to be fetched from.
	 * @param showAnonymousContent Indicates whether to include arguments that are created anonymously.
	 * @return The page of arguments.
	 */

	@GetMapping("/getMostDiscussedArgsForUser")
	public PagedResponse<ArgumentResponse> getMostDiscussedArgsForUser(
			@RequestParam(value = "page") int page,
			@RequestParam(value = "size") int size,
			@RequestParam(value = "sort") String sort,
			@RequestParam(value = "username") String username,
			@RequestParam(value = "showAnonymousContent") Boolean showAnonymousContent) {

		return argumentService.getMostDiscussedArgsForUser(page, size, sort, username, showAnonymousContent);
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

	@GetMapping("/getArgumentsByUsernameAndAnonymity")
	public PagedResponse<ArgumentResponse> getArgumentsByUsername(
			@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
			@RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
			@RequestParam(value = "sort", defaultValue = AppConstants.DESCENDING_ORDER) String sort,
			@RequestParam(value = "username") String username,
			@RequestParam(value = "showAnonymousContent") Boolean showAnonymousContent) {

		return argumentService.getArgumentsByUsernameAndAnonymity(page, size, sort, username, showAnonymousContent);
	}

	/**
	 * Counts all the arguments that are made towards a rootPetition and either supports or opposes it.
	 *
	 * @param petitionId The ID of the root rootPetition.
	 * @param isSupporting Indicates whether the arguments fetched should be supporting or opposing.
	 * @return The number of matching arguments.
	 */

	@GetMapping("/countArgsByPetitionIdAndIsSupporting")
	public Long countArgsByPetitionIdAndIsSupporting(
			@RequestParam(value = "petitionId") Long petitionId,
			@RequestParam(value = "isSupporting") Boolean isSupporting
	) {
		return argumentService.countAllByPetitionAndIsSupporting(petitionId, isSupporting);
	}

	/**
	 * Counts all the arguments that are made towards an argument and either supports or opposes it.
	 *
	 * @param argumentId The ID of the parent argument.
	 * @param isSupporting Indicates whether the arguments fetched should be supporting or opposing.
	 * @return The number of matching arguments.
	 */

	@GetMapping("/countAllByArgumentIdAndIsSupporting")
	public Long countAllByArgumentIdAndIsSupporting(
			@RequestParam(value = "argumentId") Long argumentId,
			@RequestParam(value = "isSupporting") Boolean isSupporting
	) {
		return argumentService.countAllByArgumentAndIsSupporting(argumentId, isSupporting);
	}

	/**
	 * Fetches the most discussed arguments.
	 *
	 * @param size The number of arguments per page.
	 * @param showClosed Include arguments that are part of closed petitions.
	 * @return The page of arguments.
	 */

	@GetMapping("/getMostDiscussedArguments")
	public PagedResponse<ArgumentResponse> getMostDiscussedArguments(
			@RequestParam(value = "size") int size,
			@RequestParam(value = "showClosed") Boolean showClosed
	) {
		return argumentService.getMostDiscussedArguments(size, showClosed);
	}

	/**
	 * Fetches the children arguments for a petition or argument that will be used for the argument data visualisation tree.
	 *
	 * @param contentId The ID of the root petition or root argument.
	 * @param isPetition Indicates whether the contentId is a petition or argument.
	 * @return Root DataNode
	 */

	@GetMapping("/getDataNodes")
	public DataNode getDataNodes(
			@RequestParam(value = "contentId") Long contentId,
			@RequestParam(value = "isPetition") Boolean isPetition
	) {
		return argumentService.getContentChildren(contentId, isPetition);
	}

	@GetMapping("/getPetitionReport")
	public PetitionReportResponse getPetitionReport(
			@RequestParam(value = "petitionId") Long petitionId
	) {
		return argumentService.getPetitionReport(petitionId);
	}
}
