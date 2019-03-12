package com.empact.Empact.controller;

import com.empact.Empact.model.Petition;
import com.empact.Empact.payload.GenericAPIResponse;
import com.empact.Empact.payload.PagedResponse;
import com.empact.Empact.payload.Petition.*;
import com.empact.Empact.service.PetitionService;
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
 * The PetitionController intercepts requests to fetch data regarding Petitions.
 */

@RestController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@RequestMapping("/api/petitions")
public class PetitionController {

	/** The service that handles the logic concerning the data for Petitions. **/
	private final PetitionService petitionService;

	// ------------------------------------- API Endpoints -------------------------------------

	/**
	 * Gets all the petitions given the provided search parameters.
	 *
	 * @param page The page number.
	 * @param size The page size.
	 * @param sort How the results are to be sorted.
	 * @param showClosed Indicates whether closed petitions are to be included.
	 * @return The page of petitions.
	 */

	@GetMapping
	public PagedResponse<GetPetitionResponse> getPetitions(
			@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
			@RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
			@RequestParam(value = "sort", defaultValue = AppConstants.DESCENDING_ORDER) String sort,
			@RequestParam(value = "showClosed") Boolean showClosed) {

		return petitionService.getAllPetitions(page, size, sort, showClosed);
	}

	/**
	 * Creates a new petition given the provided details.
	 *
	 * @param petitionRequest Request object containing the details of the petition to be created.
	 * @return A response indicating the outcome of the operation.
	 */

	@PostMapping("/create")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> createPetition(@Valid @RequestBody PetitionRequest petitionRequest) {
		Petition petition = petitionService.createPetition(petitionRequest);

		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest().path("/{rootPetitionId}")
				.buildAndExpand(petition.getId()).toUri();

		return ResponseEntity.created(location).body(
				new CreatePetitionResponse(true, "Petition Created Successfully", petition.getId()));
	}

	/**
	 * Deletes an existing petition.
	 *
	 * @param modifyPetitionRequest Request object containing the details of the petition to be deleted.
	 * @return A response indicating the outcome of the operation.
	 */

	@DeleteMapping("/delete")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> deletePetition(@Valid @RequestBody ModifyPetitionRequest modifyPetitionRequest) {
		petitionService.deletePetition(modifyPetitionRequest);
		return ResponseEntity.accepted().body(new GenericAPIResponse(true, "Petition Deleted Successfully"));
	}

	/**
	 * Updates an existing petition with new information.
	 *
	 * @param editPetitionRequest Request object containing the new details of an existing petition.
	 * @return A response indicating the outcome of the operation.
	 */

	@PostMapping("/edit")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> editPetition(@Valid @RequestBody EditPetitionRequest editPetitionRequest) {
		Petition petition = petitionService.editPetition(editPetitionRequest);

		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest().path("/{rootPetitionId}")
				.buildAndExpand(petition.getId()).toUri();

		return ResponseEntity.created(location).body(
				new GenericAPIResponse(true, "Petition Updated Successfully")
		);
	}

	/**
	 * Closes an existing petition from any new arguments.
	 *
	 * @param modifyPetitionRequest Request object containing the details of the petition to be closed.
	 * @return A response indicating the outcome of the operation.
	 */

	@PostMapping("/close")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> closePetition(@Valid @RequestBody ModifyPetitionRequest modifyPetitionRequest) {
		Petition petition = petitionService.closePetition(modifyPetitionRequest);
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest().path("/{rootPetitionId}")
				.buildAndExpand(petition.getId()).toUri();

		return ResponseEntity.created(location).body(
				new GenericAPIResponse(true, "Petition Closed Successfully")
		);
	}

	/**
	 * Fetches a petition by its ID.
	 *
	 * @param petitionId The ID of the petition to be fetched.
	 * @return The matching petition.
	 */

	@GetMapping("/{petitionId}")
	public GetPetitionResponse getPetitionById(@PathVariable Long petitionId) {
		return petitionService.getPetitionById(petitionId);
	}

	/**
	 * Fetches the petitions created by a given user.
	 *
	 * @param page The page number.
	 * @param size The page size.
	 * @param sort How the results are to be sorted.
	 * @param username The username of the creator.
	 * @param includeAnon Indicates whether anonymous petitions should be included.
	 * @param showClosed Indicates whether closed petitions should be included.
	 * @return The page of petitions.
	 */

	@GetMapping("/user")
	public PagedResponse<GetPetitionResponse> getPetitionsByUser(
			@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
			@RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
			@RequestParam(value = "sort", defaultValue = AppConstants.DESCENDING_ORDER) String sort,
			@RequestParam(value = "username") String username,
			@RequestParam(value = "includeAnon") Boolean includeAnon,
			@RequestParam(value = "showClosed") Boolean showClosed) {

		return petitionService.getPetitionsByUser(page, size, sort, username, includeAnon, showClosed);
	}

	/**
	 * Fetches the most discussed petitions created by a given user.
	 *
	 * @param page The page number.
	 * @param size The page size.
	 * @param sort How the results are to be sorted.
	 * @param username The username of the creator.
	 * @param includeAnon Indicates whether anonymous petitions should be included.
	 * @param showClosed Indicates whether closed petitions should be included.
	 * @return The page of petitions.
	 */

	@GetMapping("/getMostDiscussedPetitionsByUser")
	public PagedResponse<GetPetitionResponse> getMostDiscussedPetitionsByUser(
			@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
			@RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
			@RequestParam(value = "sort", defaultValue = AppConstants.DESCENDING_ORDER) String sort,
			@RequestParam(value = "username") String username,
			@RequestParam(value = "includeAnon") Boolean includeAnon,
			@RequestParam(value = "showClosed") Boolean showClosed) {

		return petitionService.getMostDiscussedPetitionsByUser(page, size, sort, username, includeAnon, showClosed);
	}

	/**
	 * Checks if an existing petition is closed.
	 *
	 * @param petitionId The ID of the petition to be checked.
	 * @return A boolean indicating whether the petition is closed.
	 */

	@GetMapping("/isPetitionClosed/{petitionId}")
	public Boolean isPetitionClosed(@PathVariable Long petitionId) {
		return petitionService.isPetitionClosed(petitionId);
	}

	/**
	 * Gets the most discussed petitions.
	 *
	 * @param page The page number.
	 * @param size The page size.
	 * @param sort How the results are to be sorted.
	 * @param showClosed Indicates whether closed petitions should be included.
	 * @return The page of petitions.
	 */

	@GetMapping("/getMostDiscussedPetitions")
	public PagedResponse<GetPetitionResponse> getMostDiscussedPetitions(
			@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
			@RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
			@RequestParam(value = "sort", defaultValue = AppConstants.DESCENDING_ORDER) String sort,
			@RequestParam(value = "showClosed") Boolean showClosed
	) {
		return petitionService.getMostDiscussedPetitions(page, size, sort, showClosed);
	}

	/**
	 * Searches for petitions that matches a given query.
	 *
	 * @param page The page number.
	 * @param size The page size.
	 * @param sort How the results are to be sorted.
	 * @param showClosed Indicates whether closed petitions should be included.
	 * @param query The page of petitions.
	 * @return The page of petitions.
	 */

	@GetMapping("/search")
	public PagedResponse<GetPetitionResponse> searchPetitions(
			@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
			@RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
			@RequestParam(value = "sort", defaultValue = AppConstants.DESCENDING_ORDER) String sort,
			@RequestParam(value = "showClosed") Boolean showClosed,
			@RequestParam(value = "query") String query
	) {
		return petitionService.searchPetitions(page, size, sort, showClosed, query);
	}
}
