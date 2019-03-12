package com.empact.Empact.util.test;

import com.empact.Empact.model.Petition;
import com.empact.Empact.model.User;
import com.empact.Empact.payload.Petition.GetPetitionResponse;
import com.empact.Empact.payload.User.UserSummary;
import com.empact.Empact.util.ModelMapper;
import org.junit.Assert;
import org.junit.Test;

import static com.empact.Empact.Helpers.createMockPetition;
import static com.empact.Empact.Helpers.createMockUser;

/**
 * Tests the methods in ModelMapper.java
 */

public class ModelMapperTest {

	/**
	 * Test: mapPetitionToPetitionResponse should return an object containing the data of the petition and user.
	 */

	public @Test void testMapPetitionToPetitionResponse() {

		Petition mockPetition = createMockPetition();
		User mockUser = createMockUser();

		GetPetitionResponse response = ModelMapper.mapPetitionToPetitionResponse(mockPetition, mockUser);

		Assert.assertEquals(response.getId(), mockPetition.getId());
		Assert.assertEquals(response.getTitle(), mockPetition.getTitle());
		Assert.assertEquals(response.getSituation(), mockPetition.getSituation());
		Assert.assertEquals(response.getAction(), mockPetition.getAction());
		Assert.assertEquals(response.getGoal(), mockPetition.getGoal());
		Assert.assertEquals(response.getValue(), mockPetition.getValue());
		Assert.assertEquals(response.getIsWinning(), mockPetition.getIsWinning());

		UserSummary userSummary = response.getCreatedBy();

		Assert.assertEquals(userSummary.getFirstName(), mockUser.getFirstName());
		Assert.assertEquals(userSummary.getLastName(), mockUser.getLastName());
		Assert.assertEquals(userSummary.getUsername(), mockUser.getUsername());
	}
}
