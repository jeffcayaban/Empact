package com.empact.Empact;

import com.empact.Empact.model.Argument;
import com.empact.Empact.model.CriticalQuestion;
import com.empact.Empact.model.Petition;
import com.empact.Empact.model.User;
import com.empact.Empact.model.arguments.ExpertOpinionArgument;
import com.empact.Empact.model.arguments.PopularOpinionArgument;
import com.empact.Empact.model.roles.Role;
import com.empact.Empact.model.roles.UserRoleName;
import com.empact.Empact.payload.Argument.ArgByExpertOpinionRequest;
import com.empact.Empact.payload.Argument.ArgByPopularOpinionRequest;
import com.empact.Empact.payload.Argument.EditExpertOpinionArgRequest;
import com.empact.Empact.payload.Argument.EditPopularOpinionArgRequest;
import com.empact.Empact.payload.Petition.EditPetitionRequest;
import com.empact.Empact.payload.Petition.ModifyPetitionRequest;
import org.springframework.data.domain.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static com.empact.Empact.util.AppConstants.CREATED_AT;

/**
 * Contains helper methods to be used in the unit tests.
 */

public class Helpers {

	/**
	 * Creates a mock ModifyPetitionRequest.
	 *
	 * @return A mock ModifyPetitionRequest.
	 */

	public static ModifyPetitionRequest createMockModifyPetitionRequest() {
		ModifyPetitionRequest request = new ModifyPetitionRequest();
		request.setPetitionId(1L);

		return request;
	}

	/**
	 * Creates a mock EditPetitionRequest.
	 *
	 * @return A mock EditPetitionRequest.
	 */

	public static EditPetitionRequest createMockEditPetitionRequest() {
		EditPetitionRequest request = new EditPetitionRequest();

		request.setPetitionId(1L);
		request.setTitle("Mock Title");
		request.setSituation("Mock Situation");
		request.setAction("Mock Action");
		request.setGoal("Mock Goal");
		request.setValue("Mock Value");
		request.setClosingDateTime(createMockInstant().getEpochSecond());
		request.setIsAnonymous(false);

		return request;
	}

	/**
	 * Creates a mock EditPopularOpinionArgRequest.
	 *
	 * @return A mock EditPopularOpinionArgRequest.
	 */

	public static EditPopularOpinionArgRequest createMockEditPopularOpinionArgRequest() {
		EditPopularOpinionArgRequest request = new EditPopularOpinionArgRequest();

		request.setId(1L);
		request.setSources(Collections.emptyList());
		request.setIsAnonymous(false);
		request.setExplanation("Test Explanation");

		return request;
	}

	/**
	 * Creates a mock EditExpertOpinionArgRequest.
	 *
	 * @return A mock EditExpertOpinionArgRequest.
	 */

	public static EditExpertOpinionArgRequest createMockEditExpertOpinionArgRequest() {
		EditExpertOpinionArgRequest request = new EditExpertOpinionArgRequest();

		request.setId(1L);
		request.setSources(Collections.emptyList());
		request.setIsAnonymous(false);
		request.setExpert("TestExpert");
		request.setExpert("TestDomain");
		request.setExpertDomain("TestExpertDomain");
		request.setExpertAssertion("TestExpertAssertion");

		return request;
	}

	/**
	 * Creates a mock ArgByExpertOpinionRequest.
	 *
	 * @return A mock ArgByExpertOpinionRequest.
	 */

	public static ArgByExpertOpinionRequest createMockArgByExpertOpinionRequest() {

		ArgByExpertOpinionRequest request = new ArgByExpertOpinionRequest();

		request.setIsSupporting(true);
		request.setRootPetitionId(1L);
		request.setSources(Collections.emptyList());
		request.setCriticalQuestionId(CriticalQuestion.CQ1.name());
		request.setSubCriticalQuestionId(null);
		request.setAgreesWithCQ(true);
		request.setIsAnonymous(false);

		request.setExpert("TestExpert");
		request.setExpertAssertion("TestExpertAssertion");
		request.setExpertDomain("TestExpertDomain");

		return request;
	}

	/**
	 * Creates a mock ArgByPopularOpinionRequest.
			*
			* @return A mock ArgByPopularOpinionRequest.
	 */

	public static ArgByPopularOpinionRequest createMockArgByPopularOpinionRequest() {

		ArgByPopularOpinionRequest request = new ArgByPopularOpinionRequest();

		request.setExplanation("Test Explanation");
		request.setIsSupporting(true);
		request.setRootPetitionId(1L);
		request.setSources(Collections.emptyList());
		request.setCriticalQuestionId(CriticalQuestion.CQ1.name());
		request.setSubCriticalQuestionId(null);
		request.setAgreesWithCQ(true);
		request.setIsAnonymous(false);

		return request;
	}

	/**
	 * Creates a mock page of petitions.
	 *
	 * @param petitions The set of petitions used to create the page of petitions.
	 * @return A page of petitions.
	 */

	public static Page<Petition> createMockPetitionsPage(List<Petition> petitions) {
		Pageable pageable = PageRequest.of(1, 1, Sort.Direction.ASC, CREATED_AT);
		return (Page<Petition>) new PageImpl(petitions, pageable, 1);
	}

	/**
	 * Creates a mock page of arguments.
	 *
	 * @param arguments The set of arguments used to create the page of arguments.
	 * @return A page of arguments.
	 */

	public static Page<Argument> createMockArgumentsPage(List<Argument> arguments) {
		Pageable pageable = PageRequest.of(1, 1, Sort.Direction.ASC, CREATED_AT);
		return (Page<Argument>) new PageImpl(arguments, pageable, 1);
	}

	/**
	 * Creates a mock argument by popular opinion.
	 *
	 * @param mockPetition The mock root petition.
	 * @return The mock argument.
	 */

	public static PopularOpinionArgument createMockPopularOpinionArgument(Petition mockPetition) {

		PopularOpinionArgument mockArgument = new PopularOpinionArgument();
		mockArgument.setId(1L);
		mockArgument.setIsSupporting(true);
		mockArgument.setAgreesWithCQ(true);
		mockArgument.setCriticalQuestion(CriticalQuestion.CQ1);
		mockArgument.setSubCriticalQuestion(null);
		mockArgument.setRootPetition(mockPetition);
		mockArgument.setParentArgument(null);
		mockArgument.setArguments(Collections.emptyList());
		mockArgument.setSources(Collections.emptyList());

		mockArgument.setIsAnonymous(false);
		mockArgument.setIsWinning(true);
		mockArgument.setNumberOfAttackers(0);
		mockArgument.setNumberOfSupporters(0);
		mockArgument.setArguments(Collections.emptyList());
		mockArgument.setSupporters(Collections.emptyList());

		mockArgument.setCreatedBy(createMockUser());

		mockArgument.setCreatedAt(createMockInstant());
		mockArgument.setUpdatedAt(createMockInstant());

		mockArgument.setExplanation("Test Explanation");

		return mockArgument;
	}

	/**
	 * Creates a mock argument by expert opinion.
	 *
	 * @param mockPetition The mock root petition.
	 * @return The mock argument.
	 */

	public static ExpertOpinionArgument createMockExpertOpinionArgument(Petition mockPetition) {

		ExpertOpinionArgument mockArgument = new ExpertOpinionArgument();
		mockArgument.setId(1L);
		mockArgument.setIsSupporting(true);
		mockArgument.setAgreesWithCQ(true);
		mockArgument.setCriticalQuestion(CriticalQuestion.CQ1);
		mockArgument.setSubCriticalQuestion(null);
		mockArgument.setRootPetition(mockPetition);
		mockArgument.setParentArgument(null);
		mockArgument.setArguments(Collections.emptyList());
		mockArgument.setSources(Collections.emptyList());

		mockArgument.setIsAnonymous(false);
		mockArgument.setIsWinning(true);
		mockArgument.setNumberOfAttackers(0);
		mockArgument.setNumberOfSupporters(0);
		mockArgument.setArguments(Collections.emptyList());
		mockArgument.setSupporters(Collections.emptyList());

		mockArgument.setCreatedBy(createMockUser());

		mockArgument.setCreatedAt(createMockInstant());
		mockArgument.setUpdatedAt(createMockInstant());

		mockArgument.setExpert("Test Expert");
		mockArgument.setExpertDomain("Test Expert Domain");
		mockArgument.setExpertAssertion("Test Expert Assertion");

		return mockArgument;
	}

	/**
	 * Creates a mock user.
	 *
	 * @return The mock user.
	 */

	public static User createMockUser() {
		User mockUser = new User();
		mockUser.setId(1L);
		mockUser.setUsername("TestUsername");
		mockUser.setFirstName("TestFirstName");
		mockUser.setLastName("TestLastName");
		mockUser.setPassword("TestPassword");

		Role mockRole = new Role();
		mockRole.setId(1L);
		mockRole.setName(UserRoleName.ROLE_USER);
		mockUser.setRoles(new ArrayList<>(Collections.singletonList(mockRole)));

		return mockUser;
	}

	/**
	 * Creates a mock instant time.
	 *
	 * @return A mock instant.
	 */

	private static Instant createMockInstant() {
		LocalDateTime dateTime = LocalDateTime.of(2019, Month.MARCH, 8, 13, 00);
		return dateTime.atZone(ZoneId.of("Europe/London")).toInstant();
	}

	/**
	 * Creates a mock petition.
	 *
	 * @return The mock petition.
	 */

	public static Petition createMockPetition() {
		Petition mockPetition = new Petition();
		mockPetition.setId(1L);
		mockPetition.setTitle("Mock Title");
		mockPetition.setSituation("Mock Situation");
		mockPetition.setAction("Mock Action");
		mockPetition.setGoal("Mock Goal");
		mockPetition.setValue("Mock Value");

		mockPetition.setClosingDateTime(createMockInstant());
		mockPetition.setArguments(Collections.emptyList());

		mockPetition.setIsAnonymous(false);
		mockPetition.setIsWinning(true);
		mockPetition.setNumberOfAttackers(0);
		mockPetition.setNumberOfSupporters(0);
		mockPetition.setArguments(Collections.emptyList());
		mockPetition.setSupporters(Collections.emptyList());
		mockPetition.setCreatedBy(createMockUser());
		mockPetition.setCreatedAt(createMockInstant());
		mockPetition.setUpdatedAt(createMockInstant());

		return mockPetition;
	}
}
