package com.empact.Empact.service.test;

import com.empact.Empact.exception.ClosedPetitionException;
import com.empact.Empact.exception.ResourceNotFoundException;
import com.empact.Empact.model.Argument;
import com.empact.Empact.model.Petition;
import com.empact.Empact.model.User;
import com.empact.Empact.model.arguments.ExpertOpinionArgument;
import com.empact.Empact.model.arguments.PopularOpinionArgument;
import com.empact.Empact.payload.Argument.*;
import com.empact.Empact.payload.PagedResponse;
import com.empact.Empact.payload.Petition.PetitionReportResponse;
import com.empact.Empact.payload.TreeData.DataNode;
import com.empact.Empact.repository.*;
import com.empact.Empact.service.ArgumentService;
import com.empact.Empact.service.PetitionService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.*;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.ZoneId;
import java.util.*;

import static com.empact.Empact.Helpers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

/**
 * Contains the unit tests for the ArgumentsService.
 */

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class ArgumentServiceTest {

	/** The Argument service **/
	private @Autowired ArgumentService argumentService;

	/** The User data repository **/
	private @MockBean UserRepository userRepository;

	/** The Argument data repository **/
	private @MockBean ArgumentRepository argumentRepository;

	/** The Petition data repository **/
	private @MockBean PetitionRepository petitionRepository;

	/** The "Argument by Expert Opinion" data repository **/
	private @MockBean ExpertOpinionArgumentRepository expertOpinionArgumentRepository;

	/** The "Argument by Popular Opinion" data repository **/
	private @MockBean PopularOpinionArgumentRepository popularOpinionArgumentRepository;

	/** The service that handles the logic concerning the data for Petitions. **/
	private @MockBean PetitionService petitionService;

	// ---------------------------------------------- Unit Tests ----------------------------------------------

	/**
	 * Test: getArgumentsByPetition should return a page of arguments given that arguments exist.
	 */

	public @Test void testGetArgumentsByPetition() {

		// 1. Mock the repository methods.

		Petition mockPetition = createMockPetition();
		when(petitionRepository.findById(anyLong())).thenReturn(Optional.of(mockPetition));

		PopularOpinionArgument mockArgument = createMockPopularOpinionArgument(mockPetition);
		List<Argument> arguments = new ArrayList<>(Collections.singletonList(mockArgument));
		when(argumentRepository.findByRootPetitionAndParentArgument(any(), any(), any())).thenReturn(
				createMockArgumentsPage(arguments)
		);

		// 2. Run the method.

		PagedResponse<ArgumentResponse> response = argumentService.getArgumentsByPetition(1L, 1, 1);

		// 3. Execute the assertions.

		List<ArgumentResponse> responseArguments = response.getContent();
		Assert.assertEquals(responseArguments.size(), 1);

		ArgByPopularOpinion responseArgument = (ArgByPopularOpinion) responseArguments.get(0);
		Assert.assertEquals(responseArgument.getId(), mockArgument.getId());
		Assert.assertEquals(responseArgument.getExplanation(), mockArgument.getExplanation());
	}

	/**
	 * Test: getArgumentsByPetition should an empty page given that no arguments exist.
	 */

	public @Test void testGetArgumentsByPetition_returnEmpty() {

		// 1. Mock the repository methods.

		when(petitionRepository.findById(anyLong())).thenReturn(Optional.of(createMockPetition()));
		when(argumentRepository.findByRootPetitionAndParentArgument(any(), any(), any())).thenReturn(
				createMockArgumentsPage(Collections.emptyList())
		);

		// 2. Run the method.

		PagedResponse<ArgumentResponse> response = argumentService.getArgumentsByPetition(1L,
				1, 1);

		// 3. Execute the assertions.
		Assert.assertEquals(response.getContent().size(), 0);
	}

	/**
	 * Test: getArgumentsByUsernameAndAnonymity should return a page of arguments.
	 */

	public @Test void testGetArgumentsByUsernameAndAnonymity() {

		// 1. Mock the repository methods.

		Petition mockPetition = createMockPetition();
		User mockUser = createMockUser();
		when(userRepository.findByUsername(any())).thenReturn(Optional.of(mockUser));
		PopularOpinionArgument mockArgument = createMockPopularOpinionArgument(mockPetition);
		List<Argument> arguments = new ArrayList<>(Collections.singletonList(mockArgument));

		when(argumentRepository.findByCreatedBy(any(), any())).thenReturn(createMockArgumentsPage(arguments));

		// 2. Run the method.

		PagedResponse<ArgumentResponse> response = argumentService.getArgumentsByUsernameAndAnonymity(
				1, 1, "asc", "testUsername", true);

		// 3. Execute the assertions.

		List<ArgumentResponse> responseArguments = response.getContent();
		Assert.assertEquals(arguments.size(), 1);

		ArgByPopularOpinion responseArgument = (ArgByPopularOpinion) responseArguments.get(0);
		Assert.assertEquals(responseArgument.getId(), mockArgument.getId());
		Assert.assertEquals(responseArgument.getExplanation(), mockArgument.getExplanation());
	}

	/**
	 * Test: getArgumentById should return an argument response object.
	 */

	public @Test void testGetArgumentById() {

		// 1. Mock the repository methods.

		Petition mockPetition = createMockPetition();
		PopularOpinionArgument mockArgument = createMockPopularOpinionArgument(mockPetition);
		when(argumentRepository.findById(any())).thenReturn(Optional.of(mockArgument));

		// 2. Run the method.

		ArgumentResponse response = argumentService.getArgumentById(1L);

		// 3. Execute the assertions.

		ArgByPopularOpinion responseArgument = (ArgByPopularOpinion) response;
		Assert.assertEquals(responseArgument.getId(), mockArgument.getId());
		Assert.assertEquals(responseArgument.getExplanation(), mockArgument.getExplanation());
	}

	/**
	 * Test: getArgumentsByRootPetitionId should return a page of arguments.
	 */

	public @Test void testGetArgumentsByRootPetitionId() {

		// 1. Mock the repository methods.

		Petition mockPetition = createMockPetition();
		when(petitionRepository.findById(anyLong())).thenReturn(Optional.of(mockPetition));

		PopularOpinionArgument mockArgument = createMockPopularOpinionArgument(mockPetition);
		List<Argument> arguments = new ArrayList<>(Collections.singletonList(mockArgument));

		when(argumentRepository.findByRootPetitionAndIsSupportingAndParentArgument(any(), any(), any(), any())).thenReturn(
				createMockArgumentsPage(arguments)
		);

		// 2. Run the method.

		PagedResponse<ArgumentResponse> response = argumentService.getArgumentsByRootPetitionId(1L, true,
				1, 1, "asc");

		// 3. Execute the assertions.

		List<ArgumentResponse> responseArguments = response.getContent();
		Assert.assertEquals(arguments.size(), 1);

		ArgByPopularOpinion responseArgument = (ArgByPopularOpinion) responseArguments.get(0);
		Assert.assertEquals(responseArgument.getId(), mockArgument.getId());
		Assert.assertEquals(responseArgument.getExplanation(), mockArgument.getExplanation());
	}

	/**
	 * Test: getArgumentsByArgumentId should return a page of arguments.
	 */

	public @Test void testGetArgumentsByArgumentId() {

		// 1. Mock the repository methods.

		Petition mockPetition = createMockPetition();
		when(petitionRepository.findById(anyLong())).thenReturn(Optional.of(mockPetition));

		PopularOpinionArgument mockArgument = createMockPopularOpinionArgument(mockPetition);
		List<Argument> arguments = new ArrayList<>(Collections.singletonList(mockArgument));
		when(argumentRepository.findByParentArgumentIdAndIsSupporting(any(), any(), any())).thenReturn(
				createMockArgumentsPage(arguments)
		);

		// 2. Run the method.

		PagedResponse<ArgumentResponse> response = argumentService.getArgumentsByArgumentId(1L, true,
				1, 1, "asc");

		// 3. Execute the assertions.

		List<ArgumentResponse> responseArguments = response.getContent();
		Assert.assertEquals(arguments.size(), 1);

		ArgByPopularOpinion responseArgument = (ArgByPopularOpinion) responseArguments.get(0);
		Assert.assertEquals(responseArgument.getId(), mockArgument.getId());
		Assert.assertEquals(responseArgument.getExplanation(), mockArgument.getExplanation());
	}

	/**
	 * Test: createArgumentByPopularOpinion should return the newly created argument.
	 */

	public @Test void testCreateArgumentByPopularOpinion() {

		// 1. Mock the repository methods.

		when(petitionService.isPetitionClosed(any())).thenReturn(false);

		Petition mockPetition = createMockPetition();
		PopularOpinionArgument mockArgument = createMockPopularOpinionArgument(mockPetition);

		when(petitionRepository.findById(any())).thenReturn(Optional.of(mockPetition));
		when(popularOpinionArgumentRepository.save(any())).thenReturn(mockArgument);

		ArgByPopularOpinionRequest request = createMockArgByPopularOpinionRequest();

		// 2. Run the method.

		PopularOpinionArgument arg = argumentService.createArgumentByPopularOpinion(request);

		// 3. Execute the assertions.

		Assert.assertEquals(arg, mockArgument);
	}

	/**
	 * Test: createArgumentByPopularOpinion should throw an exception given the petition is closed.
	 */

	@Test(expected = ClosedPetitionException.class)
	public void testCreateArgumentByPopularOpinion_throwException() {

		// 1. Mock the repository methods.

		when(petitionService.isPetitionClosed(any())).thenReturn(true);
		ArgByPopularOpinionRequest request = createMockArgByPopularOpinionRequest();

		// 2. Run the method.

		argumentService.createArgumentByPopularOpinion(request);

		// Note: The method should throw a ClosedPetitionException.
	}

	/**
	 * Test: editPopularOpinionArgument should return the newly updated argument.
	 */

	public @Test void testEditPopularOpinionArgument() {

		// 1. Mock the repository methods.

		Petition mockPetition = createMockPetition();

		LocalDateTime dateTime = LocalDateTime.of(2099, Month.MARCH, 8, 13, 00);
		Instant instant = dateTime.atZone(ZoneId.of("Europe/London")).toInstant();
		mockPetition.setClosingDateTime(instant);

		PopularOpinionArgument mockArgument = createMockPopularOpinionArgument(mockPetition);

		when(argumentRepository.findById(any())).thenReturn(Optional.of(mockArgument));
		when(argumentRepository.save(any())).thenReturn(mockArgument);

		EditPopularOpinionArgRequest request = createMockEditPopularOpinionArgRequest();

		// 2. Run the method.

		PopularOpinionArgument updatedArgument = argumentService.editPopularOpinionArgument(request);

		// 3. Execute the assertions.

		Assert.assertEquals(updatedArgument, mockArgument);
	}

	/**
	 * Test: editPopularOpinionArgument should throw an exception given the petition is closed.
	 */

	@Test(expected = ClosedPetitionException.class)
	public void testEditPopularOpinionArgument_throwException() {

		// 1. Mock the repository methods.

		Petition mockPetition = createMockPetition();

		LocalDateTime dateTime = LocalDateTime.of(1900, Month.MARCH, 8, 13, 00);
		Instant instant = dateTime.atZone(ZoneId.of("Europe/London")).toInstant();
		mockPetition.setClosingDateTime(instant);

		PopularOpinionArgument mockArgument = createMockPopularOpinionArgument(mockPetition);

		when(argumentRepository.findById(any())).thenReturn(Optional.of(mockArgument));

		EditPopularOpinionArgRequest request = createMockEditPopularOpinionArgRequest();

		// 2. Run the method.

		argumentService.editPopularOpinionArgument(request);

		// Note: The method should throw a ClosedPetitionException.

	}

	/**
	 * Test: editExpertOpinionArgument should return the newly updated argument.
	 */

	public @Test void testEditExpertOpinionArgument() {

		// 1. Mock the repository methods.

		Petition mockPetition = createMockPetition();
		ExpertOpinionArgument mockArgument = createMockExpertOpinionArgument(mockPetition);

		LocalDateTime dateTime = LocalDateTime.of(2099, Month.MARCH, 8, 13, 00);
		Instant instant = dateTime.atZone(ZoneId.of("Europe/London")).toInstant();
		mockPetition.setClosingDateTime(instant);

		EditExpertOpinionArgRequest request = createMockEditExpertOpinionArgRequest();

		when(argumentRepository.findById(any())).thenReturn(Optional.of(mockArgument));
		when(argumentRepository.save(any())).thenReturn(mockArgument);

		// 2. Run the method.

		ExpertOpinionArgument updatedArgument = argumentService.editExpertOpinionArgument(request);

		// 3. Execute the assertions.

		Assert.assertEquals(updatedArgument, mockArgument);
	}

	/**
	 * Test: editExpertOpinionArgument should throw an exception given the petition is closed.
	 */

	@Test(expected = ClosedPetitionException.class)
	public void testEditExpertOpinionArgument_throwException() {

		// 1. Mock the repository methods.

		Petition mockPetition = createMockPetition();
		ExpertOpinionArgument mockArgument = createMockExpertOpinionArgument(createMockPetition());

		LocalDateTime dateTime = LocalDateTime.of(1900, Month.MARCH, 8, 13, 00);
		Instant instant = dateTime.atZone(ZoneId.of("Europe/London")).toInstant();
		mockPetition.setClosingDateTime(instant);

		EditExpertOpinionArgRequest request = createMockEditExpertOpinionArgRequest();

		when(argumentRepository.findById(any())).thenReturn(Optional.of(mockArgument));

		// 2. Run the method.

		argumentService.editExpertOpinionArgument(request);
	}

	/**
	 * Test: createArgumentByExpertOpinion should return the newly created argument.
	 */

	public @Test void testCreateArgumentByExpertOpinion() {

		// 1. Mock the repository methods.

		when(petitionService.isPetitionClosed(any())).thenReturn(false);

		Petition mockPetition = createMockPetition();
		ExpertOpinionArgument mockArgument = createMockExpertOpinionArgument(mockPetition);

		when(petitionRepository.findById(any())).thenReturn(Optional.of(mockPetition));
		when(expertOpinionArgumentRepository.save(any())).thenReturn(mockArgument);

		ArgByExpertOpinionRequest request = createMockArgByExpertOpinionRequest();

		// 2. Run the method.

		ExpertOpinionArgument arg = argumentService.createArgumentByExpertOpinion(request);

		// 3. Execute the assertions.

		Assert.assertEquals(arg, mockArgument);
	}

	/**
	 * Test: createArgumentByExpertOpinion should throw an exception given the petition is closed.
	 */

	@Test(expected = ClosedPetitionException.class)
	public void testCreateArgumentByExpertOpinion_throwException() {

		// 1. Mock the repository methods.

		when(petitionService.isPetitionClosed(any())).thenReturn(true);
		when(petitionRepository.findById(any())).thenReturn(Optional.of(createMockPetition()));

		ArgByExpertOpinionRequest request = createMockArgByExpertOpinionRequest();

		// 2. Run the method.

		argumentService.createArgumentByExpertOpinion(request);
	}

	/**
	 * Test: deleteArgument should complete with no exceptions.
	 */

	public @Test void testDeleteArgument() {

		// 1. Mock the repository methods.

		Petition mockPetition = createMockPetition();
		ExpertOpinionArgument mockArgument = createMockExpertOpinionArgument(mockPetition);

		when(argumentRepository.findById(any())).thenReturn(Optional.of(mockArgument));
		when(petitionRepository.save(any())).thenReturn(mockPetition);
		when(petitionRepository.findById(any())).thenReturn(Optional.of(mockPetition));
		when(argumentRepository.findAllByRootPetitionAndParentArgument(any(), any()))
				.thenReturn(Collections.singletonList(mockArgument));

		ModifyArgumentRequest modifyArgumentRequest = new ModifyArgumentRequest();
		modifyArgumentRequest.setArgumentId(1L);

		// 2. Run the method.

		argumentService.deleteArgument(modifyArgumentRequest);

		// Note: The test will fail if any exception is thrown at this point, otherwise it succeeds.
	}

	/**
	 * Test: deleteArgument should throw a ResourceNotFoundException when the argument to be deleted is not found.
	 */

	@Test(expected = ResourceNotFoundException.class)
	public void testDeleteArgument_throwException() {

		// 1. Mock the repository methods.
		when(argumentRepository.findById(any())).thenThrow(new ResourceNotFoundException("test", "test", "test"));

		ModifyArgumentRequest modifyArgumentRequest = new ModifyArgumentRequest();
		modifyArgumentRequest.setArgumentId(1L);

		// 2. Run the method.
		argumentService.deleteArgument(modifyArgumentRequest);
	}

	/**
	 * Test: getParentArgumentById should successfully return the parent argument.
	 */

	public @Test void testGetParentArgumentById() {

		// 1. Mock the repository methods.

		when(argumentRepository.findParentArgumentIdById(any())).thenReturn(1L);
		ExpertOpinionArgument mockArgument = createMockExpertOpinionArgument(createMockPetition());
		when(argumentRepository.findById(any())).thenReturn(Optional.of(mockArgument));

		// 2. Run the method.
		ArgumentResponse response = argumentService.getParentArgumentById(1L);

		// 3. Execute the assertions.

		Assert.assertEquals(response.getId(), mockArgument.getId());
	}

	/**
	 * Test: getParentArgumentById should return null given the argument does not exist.
	 */

	public @Test void testGetParentArgumentById_returnNull() {

		// 1. Mock the repository methods.
		when(argumentRepository.findParentArgumentIdById(any())).thenReturn(null);

		// 2. Run the method.
		ArgumentResponse response = argumentService.getParentArgumentById(1L);

		// 3. Execute the assertions.
		Assert.assertNull(response);
	}

	/**
	 * Test: countAllByPetitionAndIsSupporting should return the number of arguments.
	 */

	public @Test void testCountAllByPetitionAndIsSupporting() {

		// 1. Mock the repository methods.

		Petition mockPetition = createMockPetition();

		long mockCount = 5L;

		when(petitionRepository.findById(anyLong())).thenReturn(Optional.of(mockPetition));
		when(argumentRepository.countAllByRootPetitionAndIsSupportingAndParentArgument(any(), any(), any()))
				.thenReturn(mockCount);

		// 2. Run the method.

		long response = argumentService.countAllByPetitionAndIsSupporting(1L, true);

		// 3. Execute the assertions.

		Assert.assertEquals(mockCount, response);
	}

	/**
	 * Test: countAllByPetitionAndIsSupporting should throw an exception if the argument is not found.
	 */

	@Test(expected = ResourceNotFoundException.class)
	public void testCountAllByPetitionAndIsSupporting_returnException() {

		// 1. Mock the repository methods.
		when(petitionRepository.findById(anyLong())).thenThrow(new ResourceNotFoundException("test", "test", "test"));

		// 2. Run the method.
		argumentService.countAllByPetitionAndIsSupporting(1L, true);
	}

	/**
	 * Test: countAllByArgumentAndIsSupporting should return the number of arguments.
	 */

	public @Test void testCountAllByArgumentAndIsSupporting() {

		// 1. Mock the repository methods.

		ExpertOpinionArgument mockArgument = createMockExpertOpinionArgument(createMockPetition());

		long mockCount = 5L;

		when(argumentRepository.findById(anyLong())).thenReturn(Optional.of(mockArgument));
		when(argumentRepository.countAllByParentArgumentAndIsSupporting(any(), any()))
				.thenReturn(mockCount);

		// 2. Run the method.

		long response = argumentService.countAllByArgumentAndIsSupporting(1L, true);

		// 3. Execute the assertions.

		Assert.assertEquals(mockCount, response);
	}

	/**
	 * Test: countAllByArgumentAndIsSupporting should throw an exception if the argument is not found.
	 */

	@Test(expected = ResourceNotFoundException.class)
	public void testCountAllByArgumentAndIsSupporting_throwException() {

		// 1. Mock the repository methods.
		when(argumentRepository.findById(anyLong())).thenThrow(new ResourceNotFoundException("test", "test", "test"));

		// 2. Run the method.
		argumentService.countAllByArgumentAndIsSupporting(1L, true);
	}

	/**
	 * Test: getMostDiscussedArguments should return the page of arguments.
	 */

	public @Test void testGetMostDiscussedArguments() {

		// 1. Mock the repository methods.

		ExpertOpinionArgument mockArgument = createMockExpertOpinionArgument(createMockPetition());
		Page<Argument> arguments = createMockArgumentsPage(Collections.singletonList(mockArgument));
		when(argumentRepository.findMostDiscussedArguments(any())).thenReturn(arguments);

		// 2. Run the method.

		PagedResponse<ArgumentResponse> response = argumentService.getMostDiscussedArguments(1, true);
		List<ArgumentResponse> mostDiscussedArguments = response.getContent();

		// 3. Execute the assertions.

		Assert.assertEquals(mostDiscussedArguments.size(), 1);
		Assert.assertEquals(mostDiscussedArguments.get(0).getId(), mockArgument.getId());
	}

	/**
	 * Test: getMostDiscussedArgsForPetition should return the page of arguments.
	 */

	public @Test void testGetMostDiscussedArgsForPetition() {

		// 1. Mock the repository methods.

		Petition mockPetition = createMockPetition();
		when(petitionRepository.findById(anyLong())).thenReturn(Optional.of(mockPetition));

		ExpertOpinionArgument mockArgument = createMockExpertOpinionArgument(createMockPetition());
		Page<Argument> arguments = createMockArgumentsPage(Collections.singletonList(mockArgument));
		when(argumentRepository.findLeastDiscussedForPetition(any(), any(), any())).thenReturn(arguments);

		// 2. Run the method.

		PagedResponse<ArgumentResponse> response = argumentService.getMostDiscussedArgsForPetition(1, 1,
				"asc", 1L, true);
		List<ArgumentResponse> mostDiscussedArguments = response.getContent();

		// 3. Execute the assertions.

		Assert.assertEquals(mostDiscussedArguments.size(), 1);
		Assert.assertEquals(mostDiscussedArguments.get(0).getId(), mockArgument.getId());
	}

	/**
	 * Test: getMostDiscussedArgsForPetition should throw an exception if the petition is not found.
	 */

	@Test(expected = ResourceNotFoundException.class)
	public void testGetMostDiscussedArgsForPetition_throwException() {

		// 1. Mock the repository methods.
		when(petitionRepository.findById(anyLong())).thenThrow(new ResourceNotFoundException("test", "test", "test"));

		// 2. Run the method.
		argumentService.getMostDiscussedArgsForPetition(1, 1, "asc", 1L, true);
	}

	/**
	 * Test: getMostDiscussedArgsForArgument should return the page of arguments.
	 */

	public @Test void testGetMostDiscussedArgsForArgument() {

		// 1. Mock the repository methods.

		ExpertOpinionArgument mockArgument = createMockExpertOpinionArgument(createMockPetition());
		when(argumentRepository.findById(anyLong())).thenReturn(Optional.of(mockArgument));

		Page<Argument> arguments = createMockArgumentsPage(Collections.singletonList(mockArgument));
		when(argumentRepository.findLeastDiscussedForArgument(any(), any(), any())).thenReturn(arguments);

		// 2. Run the method.

		PagedResponse<ArgumentResponse> response = argumentService.getMostDiscussedArgsForArgument(1, 1,
				"asc", 1L, true);
		List<ArgumentResponse> mostDiscussedArguments = response.getContent();

		// 3. Execute the assertions.

		Assert.assertEquals(mostDiscussedArguments.size(), 1);
		Assert.assertEquals(mostDiscussedArguments.get(0).getId(), mockArgument.getId());
	}

	/**
	 * Test: getMostDiscussedArgsForPetition should throw an exception if the petition is not found.
	 */

	@Test(expected = ResourceNotFoundException.class)
	public void testGetMostDiscussedArgsForArgument_throwException() {

		// 1. Mock the repository methods.
		when(petitionRepository.findById(anyLong())).thenThrow(new ResourceNotFoundException("test", "test", "test"));

		// 2. Run the method.
		argumentService.getMostDiscussedArgsForArgument(1, 1, "asc", 1L, true);
	}

	/**
	 * Test: getMostDiscussedArgsForUser return the page of arguments.
	 */

	public @Test void testGetMostDiscussedArgsForUser() {

		// 1. Mock the repository methods.

		User mockUser = createMockUser();
		when(userRepository.findByUsername(any())).thenReturn(Optional.of(mockUser));

		ExpertOpinionArgument mockArgument = createMockExpertOpinionArgument(createMockPetition());
		Page<Argument> arguments = createMockArgumentsPage(Collections.singletonList(mockArgument));
		when(argumentRepository.findLeastDiscussedForUser(any(), any())).thenReturn(arguments);

		// 2. Run the method.

		PagedResponse<ArgumentResponse> response = argumentService.getMostDiscussedArgsForUser(1, 1,
				"asc", "testUsername", true);
		List<ArgumentResponse> mostDiscussedArguments = response.getContent();

		// 3. Execute the assertions.

		Assert.assertEquals(mostDiscussedArguments.size(), 1);
		Assert.assertEquals(mostDiscussedArguments.get(0).getId(), mockArgument.getId());
	}

	/**
	 * Test: getMostDiscussedArgsForUser return an exception if the user is not found.
	 */

	@Test(expected = ResourceNotFoundException.class)
	public void testGetMostDiscussedArgsForUser_throwException() {

		// 1. Mock the repository methods.
		when(userRepository.findByUsername(any())).thenThrow(new ResourceNotFoundException("test", "test", "test"));

		// 2. Run the method.
		argumentService.getMostDiscussedArgsForUser(1, 1, "asc", "testUsername", true);
	}

	/**
	 * Test: getContentChildren should return a data node.
	 */

	public @Test void testGetContentChildren() {

		// 1. Mock the repository methods.

		Petition mockPetition = createMockPetition();
		when(petitionRepository.findById(anyLong())).thenReturn(Optional.of(mockPetition));

		ExpertOpinionArgument mockArgument = createMockExpertOpinionArgument(createMockPetition());
		when(argumentRepository.findAllByRootPetitionAndParentArgument(any(), any()))
				.thenReturn(Collections.singletonList(mockArgument));

		// 2. Run the method.

		DataNode response = argumentService.getContentChildren(1L, true);
		List<DataNode> childrenDataNodes = response.getChildren();

		// 3. Execute the assertions.

		Assert.assertEquals(childrenDataNodes.size(), 1);
		Assert.assertEquals(childrenDataNodes.get(0).getContentId(), mockArgument.getId());
		Assert.assertEquals(response.getName(), "Current Petition");
	}

	/**
	 * Test: getContentChildren should return an exception if the petition does not exist
	 */

	@Test(expected = ResourceNotFoundException.class)
	public void testGetContentChildren_throwException() {

		// 1. Mock the repository methods.
		when(petitionRepository.findById(anyLong())).thenThrow(new ResourceNotFoundException("test", "test", "test"));

		// 2. Run the method.
		argumentService.getContentChildren(1L, true);
	}

	/**
	 * Test: getPetitionReport should return a response object containing arguments.
	 */

	public @Test void testGetPetitionReport() {

		// 1. Mock the repository methods.

		Petition mockPetition = createMockPetition();
		when(petitionRepository.findById(anyLong())).thenReturn(Optional.of(mockPetition));

		ExpertOpinionArgument mockArgument = createMockExpertOpinionArgument(createMockPetition());
		when(argumentRepository.findArgumentsForReport(any(), any(), any(), any()))
				.thenReturn(Collections.singletonList(mockArgument));

		// 2. Run the method.

		PetitionReportResponse response = argumentService.getPetitionReport(1L);

		// 3. Execute the assertions.

		Assert.assertEquals(response.getIsPetitionWinning(), true);
		Assert.assertEquals(response.getSupportingSituation().size(), 1);
		Assert.assertEquals(response.getSupportingActionGoal().size(), 1);
		Assert.assertEquals(response.getNotSupportingSituation().size(), 1);
		Assert.assertEquals(response.getNotSupportingActionGoal().size(), 1);
	}

	/**
	 * Test: getPetitionReport should return an exception if the petition could not be fetched.
	 */

	@Test(expected = ResourceNotFoundException.class)
	public void testGetPetitionReport_throwException() {

		// 1. Mock the repository methods.
		when(petitionRepository.findById(anyLong())).thenThrow(new ResourceNotFoundException("test", "test", "test"));

		// 2. Run the method.
		argumentService.getPetitionReport(1L);
	}

}
