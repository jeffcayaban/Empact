package com.empact.Empact.service.test;

import com.empact.Empact.exception.ClosedPetitionException;
import com.empact.Empact.exception.ResourceNotFoundException;
import com.empact.Empact.model.Petition;
import com.empact.Empact.model.User;
import com.empact.Empact.payload.PagedResponse;
import com.empact.Empact.payload.Petition.EditPetitionRequest;
import com.empact.Empact.payload.Petition.GetPetitionResponse;
import com.empact.Empact.payload.Petition.ModifyPetitionRequest;
import com.empact.Empact.payload.Petition.PetitionRequest;
import com.empact.Empact.repository.PetitionRepository;
import com.empact.Empact.repository.UserRepository;
import com.empact.Empact.service.PetitionService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static com.empact.Empact.Helpers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

/**
 * Contains the unit tests for the PetitionService.
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class PetitionServiceTest {

	/** The service that handles the logic concerning the data for Petitions. **/
	private @Autowired PetitionService petitionService;

	/** The User data repository **/
	private @MockBean UserRepository userRepository;

	/** The Petition data repository **/
	private @MockBean PetitionRepository petitionRepository;

	// ---------------------------------------------- Unit Tests ----------------------------------------------

	/**
	 * Test: getAllPetitions should return a page of petitions.
	 */

	public @Test void testGetAllPetitions() {

		// 1. Mock the repository methods.

		Petition mockPetition = createMockPetition();
		List<Petition> petitions = new ArrayList<>(Collections.singletonList(mockPetition));
		when(petitionRepository.findAllByIsClosed(any())).thenReturn(createMockPetitionsPage(petitions));

		// 2. Run the method.

		PagedResponse<GetPetitionResponse> response = petitionService.getAllPetitions(1, 1, "asc",
				true);

		// 3. Execute the assertions.

		List<GetPetitionResponse> responsePetitions = response.getContent();
		Assert.assertEquals(responsePetitions.size(), 1);

		GetPetitionResponse responsePetition = responsePetitions.get(0);
		Assert.assertEquals(responsePetition.getId(), mockPetition.getId());
	}

	/**
	 * Test: createPetition should return the newly created petition.
	 */

	public @Test void testCreatePetition() {

		// 1. Mock the repository methods.

		Petition mockPetition = createMockPetition();
		when(petitionRepository.save(any())).thenReturn(mockPetition);

		// 2. Run the method.

		PetitionRequest petitionRequest = new PetitionRequest();
		petitionRequest.setTitle(mockPetition.getTitle());
		petitionRequest.setSituation(mockPetition.getSituation());
		petitionRequest.setAction(mockPetition.getAction());
		petitionRequest.setGoal(mockPetition.getGoal());
		petitionRequest.setValue(mockPetition.getValue());
		petitionRequest.setClosingDateTime(mockPetition.getClosingDateTime().getEpochSecond());
		petitionRequest.setIsAnonymous(mockPetition.getIsAnonymous());

		Petition response = petitionService.createPetition(petitionRequest);

		// 3. Execute the assertions.

		Assert.assertEquals(response.getId(), mockPetition.getId());
		Assert.assertEquals(response.getTitle(), mockPetition.getTitle());
		Assert.assertEquals(response.getSituation(), mockPetition.getSituation());
		Assert.assertEquals(response.getAction(), mockPetition.getAction());
		Assert.assertEquals(response.getGoal(), mockPetition.getGoal());
		Assert.assertEquals(response.getValue(), mockPetition.getValue());
	}

	/**
	 * Test: deletePetition should delete the petition.
	 */

	public @Test void testDeletePetition() {

		// 1. Mock the repository methods.

		Petition mockPetition = createMockPetition();
		when(petitionRepository.findById(any())).thenReturn(Optional.of(mockPetition));

		// 2. Run the method.

		ModifyPetitionRequest request = createMockModifyPetitionRequest();
		petitionService.deletePetition(request);

		// Note: The test will fail if any exception is thrown at this point, otherwise it succeeds.
	}

	/**
	 * Test: deletePetition should throw a ResourceNotFoundException when the petition to be deleted is not found.
	 */

	@Test(expected = ResourceNotFoundException.class)
	public void testDeletePetition_throwException() {

		// 1. Mock the repository methods.
		when(petitionRepository.findById(any())).thenThrow(new ResourceNotFoundException("test", "test", "test"));

		// 2. Run the method.

		ModifyPetitionRequest request = createMockModifyPetitionRequest();
		petitionService.deletePetition(request);
	}

	/**
	 * Test: editPetition should successfully update the petition's details.
	 */

	public @Test void testEditPetition() {

		// 1. Mock the repository methods.

		Petition mockPetition = createMockPetition();

		LocalDateTime dateTime = LocalDateTime.of(2099, Month.MARCH, 8, 13, 00);
		Instant instant = dateTime.atZone(ZoneId.of("Europe/London")).toInstant();
		mockPetition.setClosingDateTime(instant);

		when(petitionRepository.findById(any())).thenReturn(Optional.of(mockPetition));
		when(petitionRepository.save(any())).thenReturn(mockPetition);

		// 2. Run the method.

		EditPetitionRequest request = createMockEditPetitionRequest();
		Petition response = petitionService.editPetition(request);

		// 3. Execute the assertions.

		Assert.assertEquals(response, mockPetition);
	}

	/**
	 * Test: editPetition should throw ResourceNotFoundException when the petition does not exist.
	 */

	@Test(expected = ResourceNotFoundException.class)
	public void testEditPetition_throwResourceNotFoundException() {

		// 1. Mock the repository methods.
		when(petitionRepository.findById(any())).thenThrow(new ResourceNotFoundException("test", "test", "test"));

		// 2. Run the method.

		EditPetitionRequest request = createMockEditPetitionRequest();
		petitionService.editPetition(request);
	}

	/**
	 * Test: editPetition should throw ClosedPetitionException when the petition is closed.
	 */

	@Test(expected = ClosedPetitionException.class)
	public void testEditPetition_throwClosedPetitionException() {

		// 1. Mock the repository methods.

		Petition mockPetition = createMockPetition();

		LocalDateTime dateTime = LocalDateTime.of(1900, Month.MARCH, 8, 13, 00);
		Instant instant = dateTime.atZone(ZoneId.of("Europe/London")).toInstant();
		mockPetition.setClosingDateTime(instant);

		when(petitionRepository.findById(any())).thenReturn(Optional.of(mockPetition));

		// 2. Run the method.

		EditPetitionRequest request = createMockEditPetitionRequest();
		petitionService.editPetition(request);
	}

	/**
	 * Test: closePetition should successfully close the petition.
	 */

	public @Test void testClosePetition() {

		// 1. Mock the repository methods.

		Petition mockPetition = createMockPetition();
		when(petitionRepository.findById(any())).thenReturn(Optional.of(mockPetition));

		when(petitionRepository.save(any())).thenAnswer(
				(Answer<Petition>) invocationOnMock -> (Petition) invocationOnMock.getArguments()[0]
		);

		// 2. Run the method.

		ModifyPetitionRequest request = createMockModifyPetitionRequest();
		Petition response = petitionService.closePetition(request);

		// 3. Execute the assertions.
		Assert.assertEquals(response.getClosingDateTime().getEpochSecond(), Instant.now().getEpochSecond());
	}

	/**
	 * Test: closePetition should return an exception if the petition does not exist.
	 */

	@Test(expected = ResourceNotFoundException.class)
	public void testClosePetition_throwException() {

		// 1. Mock the repository methods.
		when(petitionRepository.findById(any())).thenThrow(new ResourceNotFoundException("test", "test", "test"));

		// 2. Run the method.

		ModifyPetitionRequest request = createMockModifyPetitionRequest();
		petitionService.closePetition(request);
	}

	/**
	 * Test: getPetitionById should successfully return the petition.
	 */

	public @Test void testGetPetitionById() {

		// 1. Mock the repository methods.

		Petition mockPetition = createMockPetition();
		when(petitionRepository.findById(any())).thenReturn(Optional.of(mockPetition));

		// 2. Run the method.

		GetPetitionResponse response = petitionService.getPetitionById(1L);

		// 3. Execute the assertions.

		assertPetitionResponse(response, mockPetition);
	}

	/**
	 * Test: getPetitionById should return an exception if the petition does not exist.
	 */

	@Test(expected = ResourceNotFoundException.class)
	public void testGetPetitionById_throwException() {

		// 1. Mock the repository methods.
		when(petitionRepository.findById(any())).thenThrow(new ResourceNotFoundException("test", "test", "test"));

		// 2. Run the method.
		petitionService.getPetitionById(1L);
	}

	/**
	 * Test: getPetitionsByUser should return the page of petitions.
	 */

	public @Test void testGetPetitionsByUser() {

		// 1. Mock the repository methods.

		User mockUser = createMockUser();
		when(userRepository.findByUsername(any())).thenReturn(Optional.of(mockUser));

		Petition mockPetition = createMockPetition();
		List<Petition> petitions = new ArrayList<>(Collections.singletonList(mockPetition));

		when(petitionRepository.findAllByCreatedByAndIsClosed(any(), any())).thenReturn(createMockPetitionsPage(petitions));

		// 2. Run the method.

		PagedResponse<GetPetitionResponse> response = petitionService.getPetitionsByUser(1, 1, "asc",
				"testUsername", true, true);

		// 3. Execute the assertions.

		List<GetPetitionResponse> petitionsResponse = response.getContent();

		Assert.assertEquals(petitionsResponse.size(), 1);
		Assert.assertEquals(petitionsResponse.get(0).getId(), mockPetition.getId());
	}

	/**
	 * Test: getPetitionsByUser should return an exception if the user does not exist.
	 */

	@Test(expected = ResourceNotFoundException.class)
	public void testGetPetitionsByUser_throwException() {

		// 1. Mock the repository methods.
		when(userRepository.findByUsername(any())).thenThrow(new ResourceNotFoundException("test", "test", "test"));

		// 2. Run the method.
		petitionService.getPetitionsByUser(1, 1, "asc", "testUsername", true,
				true);
	}

	/**
	 * Test: getMostDiscussedPetitionsByUser should return the page of petitions.
	 */

	public @Test void testGetMostDiscussedPetitionsByUser() {

		// 1. Mock the repository methods.

		User mockUser = createMockUser();
		when(userRepository.findByUsername(any())).thenReturn(Optional.of(mockUser));

		Petition mockPetition = createMockPetition();
		List<Petition> petitions = new ArrayList<>(Collections.singletonList(mockPetition));

		when(petitionRepository.findLeastDiscussedAndIsClosedForUser(any(), any()))
				.thenReturn(createMockPetitionsPage(petitions));

		// 2. Run the method.

		PagedResponse<GetPetitionResponse> response = petitionService.getMostDiscussedPetitionsByUser(1, 1,
				"asc", "testUsername", true, true);

		// 3. Execute the assertions.

		List<GetPetitionResponse> petitionsResponse = response.getContent();

		Assert.assertEquals(petitionsResponse.size(), 1);
		Assert.assertEquals(petitionsResponse.get(0).getId(), mockPetition.getId());
	}

	/**
	 * Test: getMostDiscussedPetitionsByUser should return an exception if the user does not exist.
	 */

	@Test(expected = ResourceNotFoundException.class)
	public void testGetMostDiscussedPetitionsByUser_throwException() {

		// 1. Mock the repository methods.
		when(userRepository.findByUsername(any())).thenThrow(new ResourceNotFoundException("test", "test", "test"));

		// 2. Run the method.
		petitionService.getMostDiscussedPetitionsByUser(1, 1, "asc", "testUsername",
				true, true);
	}

	/**
	 * Test: isPetitionClosed should successfully return a boolean to indicate if the petition is closed.
	 */

	public @Test void testIsPetitionClosed() {

		// 1. Mock the repository methods.

		Petition mockPetition = createMockPetition();
		when(petitionRepository.findById(any())).thenReturn(Optional.of(mockPetition));

		// 2. Run the method.
		Boolean response = petitionService.isPetitionClosed(1L);

		// 3. Execute the assertions.
		Assert.assertEquals(response, true);
	}

	/**
	 * Test: isPetitionClosed should return an exception if the petition does not exist.
	 */

	@Test(expected = ResourceNotFoundException.class)
	public void testIsPetitionClosed_throwException() {

		// 1. Mock the repository methods.
		when(petitionRepository.findById(any())).thenThrow(new ResourceNotFoundException("test", "test", "test"));

		// 2. Run the method.
		petitionService.isPetitionClosed(1L);
	}

	/**
	 * Test: getMostDiscussedPetitions should successfully return the page of petitions.
	 */

	public @Test void testGetMostDiscussedPetitions() {

		// 1. Mock the repository methods.
		Petition mockPetition = createMockPetition();
		List<Petition> petitions = new ArrayList<>(Collections.singletonList(mockPetition));

		when(petitionRepository.findAllByMostArgumentsAndIsClosed(any())).thenReturn(createMockPetitionsPage(petitions));

		// 2. Run the method.
		PagedResponse<GetPetitionResponse> response = petitionService.getMostDiscussedPetitions(1, 1,
				"desc", true);

		// 3. Execute the assertions.
		GetPetitionResponse petitionResponse = response.getContent().get(0);
		assertPetitionResponse(petitionResponse, mockPetition);
	}

	/**
	 * Test: searchPetitions should succesfully return the page of petitions.
	 */

	public @Test void testSearchPetitions() {

		// 1. Mock the repository methods.
		Petition mockPetition = createMockPetition();
		List<Petition> petitions = new ArrayList<>(Collections.singletonList(mockPetition));

		when(petitionRepository.findAllByKeywordAndIsClosed(any(), any())).thenReturn(createMockPetitionsPage(petitions));

		// 2. Run the method.
		PagedResponse<GetPetitionResponse> response = petitionService.searchPetitions(1, 1, "asc",
				true, "testQuery");

		// 3. Execute the assertions.
		GetPetitionResponse petitionResponse = response.getContent().get(0);
		assertPetitionResponse(petitionResponse, mockPetition);
	}

	// ---------------------------------------------- Helper Methods ----------------------------------------------

	/**
	 * Compares the elements of the petition response to the expected petition.
	 *
	 * @param petitionResponse The response to be compared.
	 * @param mockPetition The petition to be compared against.
	 */

	private void assertPetitionResponse(GetPetitionResponse petitionResponse, Petition mockPetition) {
		Assert.assertEquals(petitionResponse.getId(), mockPetition.getId());
		Assert.assertEquals(petitionResponse.getTitle(), mockPetition.getTitle());
		Assert.assertEquals(petitionResponse.getSituation(), mockPetition.getSituation());
		Assert.assertEquals(petitionResponse.getAction(), mockPetition.getAction());
		Assert.assertEquals(petitionResponse.getGoal(), mockPetition.getGoal());
		Assert.assertEquals(petitionResponse.getValue(), mockPetition.getValue());
	}
}
