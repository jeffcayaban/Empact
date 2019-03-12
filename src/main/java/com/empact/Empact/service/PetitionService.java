package com.empact.Empact.service;

import com.empact.Empact.exception.ClosedPetitionException;
import com.empact.Empact.exception.ResourceNotFoundException;
import com.empact.Empact.model.Petition;
import com.empact.Empact.model.User;
import com.empact.Empact.payload.PagedResponse;
import com.empact.Empact.payload.Petition.*;
import com.empact.Empact.repository.PetitionRepository;
import com.empact.Empact.repository.UserRepository;
import com.empact.Empact.util.ModelMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

import static com.empact.Empact.util.AppConstants.*;
import static com.empact.Empact.util.Helpers.*;
import static com.empact.Empact.util.Helpers.isDateBeforeNow;

/**
 *  The PetitionService handles all data manipulation and transformation regarding Petitions. It also interacts with the
 *  data repositories and produces the response objects to be returned to the Controller layer.
 */

@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Service
public class PetitionService {

	/** The User data repository **/
	private final UserRepository userRepository;

	/** The Petition data repository **/
	private final PetitionRepository petitionRepository;

	/**
	 * Fetches all the petitions given the provided search parameters.
	 *
	 * @param page The page number.
	 * @param size The page size.
	 * @param sort How the results are to be sorted.
	 * @param showClosed Indicates whether closed petitions are to be included.
	 * @return The page of petitions.
	 */

	public PagedResponse<GetPetitionResponse> getAllPetitions(int page, int size, String sort, Boolean showClosed) {

		// 1. Set the query parameters.
		validatePageNumberAndSize(page, size);
		Pageable pageable = createPageable(sort, page, size);

		// 2. Fetch the petitions given the query parameters.
		Page<Petition> petitions = showClosed
				? petitionRepository.findAllByIsClosed(pageable)
				: petitionRepository.findAllByIsNotClosed(pageable);

		// 3. Transforms the petitions into the appropriate response object.
		return getPetitionResponsePagedResponse(petitions, petitions.getNumberOfElements());
	}

	/**
	 * Creates a new petition given the provided details.
	 *
	 * @param petitionRequest Request object containing the details of the petition to be created.
	 * @return The newly created petition.
	 */

	public Petition createPetition(PetitionRequest petitionRequest) {
		return setPetitionPropertiesAndSave(petitionRequest, new Petition());
	}

	/**
	 * Deletes an existing petition.
	 *
	 * @param modifyPetitionRequest Request object containing the details of the petition to be deleted.
	 */

	public void deletePetition(ModifyPetitionRequest modifyPetitionRequest) {

		// 1. Find the petition to be deleted.
		Long petitionId = modifyPetitionRequest.getPetitionId();
		Petition petition = petitionRepository.findById(petitionId).orElseThrow(() ->
				new ResourceNotFoundException(PETITION, ID, petitionId));

		// 2. Delete petition
		petitionRepository.delete(petition);
	}

	/**
	 * Updates an existing petition with new information.
	 *
	 * @param editPetitionRequest Request object containing the new details of an existing petition.
	 * @return The updated petition.
	 */

	public Petition editPetition(EditPetitionRequest editPetitionRequest) {

		// 1. Find the petition to be edited.
		Long petitionId = editPetitionRequest.getPetitionId();
		Petition petition = petitionRepository.findById(petitionId).orElseThrow(() ->
				new ResourceNotFoundException(PETITION, ID, petitionId));

		if (!isDateBeforeNow(petition.getClosingDateTime())) {
			// 2. If the petition is still open then apply the modifications and save.
			return setPetitionPropertiesAndSave(editPetitionRequest, petition);
		} else {
			// 2. Throws an exception if the petition is closed.
			throw new ClosedPetitionException(petition.getId());
		}
	}

	/**
	 * Closes an existing petition from any new arguments.
	 *
	 * @param modifyPetitionRequest Request object containing the details of the petition to be closed.
	 * @return The closed petition.
	 */

	public Petition closePetition(ModifyPetitionRequest modifyPetitionRequest) {

		// 1. Find the petition to be closed.
		Long petitionId = modifyPetitionRequest.getPetitionId();
		Petition petition = petitionRepository.findById(petitionId).orElseThrow(()
				-> new ResourceNotFoundException(PETITION, ID, petitionId));

		// 2. Close the petition by changing the petition's closing time to now.
		petition.setClosingDateTime(Instant.now());

		// 3. Save the petition
		return petitionRepository.save(petition);
	}

	/**
	 * Fetches a petition by its ID.
	 *
	 * @param petitionId The ID of the petition to be fetched.
	 * @return The matching petition.
	 */

	public GetPetitionResponse getPetitionById(Long petitionId) {

		// 1. Find the petition.
		Petition petition = petitionRepository.findById(petitionId).orElseThrow(() ->
				new ResourceNotFoundException(PETITION, ID, petitionId));

		// 2. Transform and return the petition into the response object.
		User creator = petition.getCreatedBy();
		return ModelMapper.mapPetitionToPetitionResponse(petition, creator);
	}

	/**
	 * Fetches the petitions created by a given user.
	 *
	 * @param page The page number.
	 * @param size The page size.
	 * @param sort How the results are to be sorted.
	 * @param username The username of the user.
	 * @param includeAnon Indicates whether anonymous petitions should be included.
	 * @param showClosed Indicates whether closed petitions should be included.
	 * @return The page of petitions.
	 */

	public PagedResponse<GetPetitionResponse> getPetitionsByUser(int page, int size, String sort, String username,
																 Boolean includeAnon, Boolean showClosed) {
		validatePageNumberAndSize(page, size);

		// 1. Find user
		User user = userRepository.findByUsername(username).orElseThrow(() ->
				new ResourceNotFoundException(USER, USERNAME, username));

		// 2. Retrieve Petitions
		Pageable pageable = createPageable(sort, page, size);
		Page<Petition> petitions;

		if (includeAnon) {
			// The search should include anonymous petitions.

			if (showClosed) {
				// Fetch only closed petitions
				petitions = petitionRepository.findAllByCreatedByAndIsClosed(user, pageable);
			} else {
				// Fetch only open petitions
				petitions = petitionRepository.findAllByCreatedByAndIsNotClosed(user, pageable);
			}
		} else {
			// The search should not include anonymous petitions.

			if (showClosed) {
				// Fetch only closed petitions
				petitions = petitionRepository.findAllByCreatedByAndIsAnonymousAndIsClosed(user, false,
						pageable);
			} else {
				// Fetch only open petitions
				petitions = petitionRepository.findAllByCreatedByAndIsAnonymousAndIsNotClosed(user, false,
						pageable);
			}
		}

		return getPetitionResponsePagedResponse(petitions, petitions.getNumberOfElements());
	}

	/**
	 * Fetches the most discussed petitions for a given user.
	 *
	 * @param page The page number.
	 * @param size The page size.
	 * @param sort How the results are to be sorted.
	 * @param username The username of the user.
	 * @param includeAnon Indicates whether anonymous petitions should be included.
	 * @param showClosed Indicates whether closed petitions should be included.
	 * @return The page of petitions.
	 */

	public PagedResponse<GetPetitionResponse> getMostDiscussedPetitionsByUser(int page, int size, String sort,
																			  String username, Boolean includeAnon,
																			  Boolean showClosed) {
		validatePageNumberAndSize(page, size);

		// 1. Find user
		User user = userRepository.findByUsername(username).orElseThrow(() ->
				new ResourceNotFoundException(USER, USERNAME, username));

		// 2. Retrieve Petitions
		Pageable pageable = createPageable(sort, page, size);
		Page<Petition> petitions;

		if (sort.equals("asc")) {
			// Fetches the arguments with the least discussed on the top.

			if (includeAnon) {
				// Includes anonymous arguments.

				if (showClosed) {
					// Include arguments that are part of petitions that are closed.
					petitions = petitionRepository.findLeastDiscussedAndIsClosedForUser(user, pageable);
				} else {
					// Include arguments that are part of petitions that are not closed.
					petitions = petitionRepository.findLeastDiscussedAndIsNotClosedForUser(user, pageable);
				}
			} else {
				// The search should not include anonymous petitions.
				if (showClosed) {
					// Include arguments that are part of petitions that are closed.
					petitions = petitionRepository.findLeastDiscussedAndIsAnonymousAndIsClosedForUser(user,
							false, pageable);
				} else {
					// Include arguments that are part of petitions that are not closed.
					petitions = petitionRepository.findLeastDiscussedAndIsAnonymousAndIsNotClosedForUser(user,
							false, pageable);
				}
			}

		} else {
			// Fetches the arguments with the most discussed on the top.

			if (includeAnon) {
				// Includes anonymous arguments.

				if (showClosed) {
					// Include arguments that are part of petitions that are closed.
					petitions = petitionRepository.findMostDiscussedAndIsClosedForUser(user, pageable);
				} else {
					// Include arguments that are part of petitions that are not closed.
					petitions = petitionRepository.findMostDiscussedAndIsNotClosedForUser(user, pageable);
				}

			} else {
				// The search should not include anonymous petitions.
				if (showClosed) {
					// Include arguments that are part of petitions that are closed.
					petitions = petitionRepository.findMostDiscussedAndIsAnonymousAndIsClosedForUser(user,
							false, pageable);
				} else {
					// Include arguments that are part of petitions that are not closed.
					petitions = petitionRepository.findMostDiscussedAndIsAnonymousAndIsNotClosedForUser(user,
							false, pageable);
				}
			}
		}

		return getPetitionResponsePagedResponse(petitions, petitions.getNumberOfElements());
	}

	/**
	 * Checks if an existing petition is closed.
	 *
	 * @param petitionId The ID of the petition to be checked.
	 * @return Whether the petition is closed.
	 */

	public Boolean isPetitionClosed(Long petitionId) {

		// 1. Find the petition.
		Petition petition = petitionRepository.findById(petitionId).orElseThrow(() ->
				new ResourceNotFoundException(PETITION, ID, petitionId));

		// 2. Check if the closing time is before now.
		return isDateBeforeNow(petition.getClosingDateTime());
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

	public PagedResponse<GetPetitionResponse> getMostDiscussedPetitions(int page, int size, String sort, boolean showClosed) {

		Pageable pageable = PageRequest.of(page, size);
		Page<Petition> petitions;
		boolean sortIsDesc = sort.equals(DESCENDING_ORDER);

		if (showClosed) {
			// Show only closed petitions
			if (sortIsDesc) {
				// Fetches the arguments with the most discussed on the top.
				petitions = petitionRepository.findAllByMostArgumentsAndIsClosed(pageable);
			} else {
				// Fetches the arguments with the least discussed on the top.
				petitions = petitionRepository.findAllByLeastArgumentsAndIsClosed(pageable);
			}
		} else {
			// Show only open petitions
			if (sortIsDesc) {
				// Fetches the arguments with the most discussed on the top.
				petitions = petitionRepository.findAllByMostArgumentsAndIsNotClosed(pageable);
			} else {
				// Fetches the arguments with the least discussed on the top.
				petitions = petitionRepository.findAllByLeastArgumentsAndIsNotClosed(pageable);
			}
		}

		return getPetitionResponsePagedResponse(petitions, petitions.getNumberOfElements());
	}

	/**
	 * Searches for petitions that matches a given query and returns them based on the given pagination parameters.
	 *
	 * @param page The page number.
	 * @param size The page size.
	 * @param sort How the results are to be sorted.
	 * @param showClosed Indicates whether closed petitions should be included.
	 * @param query The query to be search on.
	 * @return The set of matching petitions to be returned.
	 */

	public PagedResponse<GetPetitionResponse> searchPetitions(int page, int size, String sort, boolean showClosed,
															  String query) {
		Pageable pageable = createPageable(sort, page, size);
		String searchQuery = query.isEmpty() ? null : query;

		Page<Petition> petitions;

		if (showClosed) {
			// Show only closed petitions
			petitions = petitionRepository.findAllByKeywordAndIsClosed(searchQuery, pageable);
		} else {
			// Show only open petitions
			petitions = petitionRepository.findAllByKeywordAndIsOpen(searchQuery, pageable);
		}

		return getPetitionResponsePagedResponse(petitions, petitions.getNumberOfElements());
	}

	// -------------------------------------------- Helper Methods --------------------------------------------

	/**
	 * Sets the properties of a petition and saves it into the data repository.
	 *
	 * @param petitionRequest Object containing the details of the petition.
	 * @param petition The petition of which the details are to be applied onto.
	 * @return The saved petition.
	 */

	private Petition setPetitionPropertiesAndSave(PetitionRequest petitionRequest, Petition petition) {

		// 1. Set petition properties
		petition.setTitle(petitionRequest.getTitle());
		petition.setSituation(petitionRequest.getSituation());
		petition.setAction(petitionRequest.getAction());
		petition.setGoal(petitionRequest.getGoal());
		petition.setValue(petitionRequest.getValue());
		petition.setIsAnonymous(petitionRequest.getIsAnonymous());
		petition.setClosingDateTime(Instant.ofEpochMilli(petitionRequest.getClosingDateTime()));
		petition.setIsWinning(true);
		petition.setNumberOfAttackers(0);
		petition.setNumberOfSupporters(0);
		petition.setAttackers(Collections.emptyList());
		petition.setSupporters(Collections.emptyList());

		// 2. Save the petition
		return petitionRepository.save(petition);
	}

	/**
	 * Transforms the page of petitions based on the given page size.
	 *
	 * @param petitions The page of petitions to be transformed.
	 * @param noOfPetitions The number of petitions the return page should contain.
	 * @return The page of petitions as appropriate response objects.
	 */

	private PagedResponse<GetPetitionResponse> getPetitionResponsePagedResponse(Page<Petition> petitions,
																				Integer noOfPetitions) {
		if (noOfPetitions == 0) {
			// If no petitions were found...
			return new PagedResponse<>(Collections.emptyList(), petitions.getNumber(), petitions.getSize(),
					noOfPetitions, petitions.getTotalPages(), petitions.isLast());
		} else {
			// If there are petitions then transform them into the response objects.
			List<GetPetitionResponse> getPetitionResponse = petitions.map(petition ->
					ModelMapper.mapPetitionToPetitionResponse(petition, petition.getCreatedBy())).getContent();

			return new PagedResponse<>(getPetitionResponse, petitions.getNumber(), petitions.getSize(),
					petitions.getTotalElements(), petitions.getTotalPages(), petitions.isLast());
		}
	}
}
