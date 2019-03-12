package com.empact.Empact.util.test;

import com.empact.Empact.exception.BadRequestException;
import com.empact.Empact.util.Helpers;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.data.domain.Pageable;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.ZoneId;

/**
 * Tests the helper methods.
 */

public class HelpersTest {

	/**
	 * Test: validatePageNumberAndSize should not throw an exception.
	 */

	public @Test void testValidatePageNumberAndSize() {
		Helpers.validatePageNumberAndSize(5, 5);
	}

	/**
	 * Test: validatePageNumberAndSize should not throw an exception due to page being less than 0.
	 */

	@Test(expected = BadRequestException.class)
	public void testValidatePageNumberAndSize_smallPage() {
		Helpers.validatePageNumberAndSize(-1, 5);
	}

	/**
	 * Test: validatePageNumberAndSize should not throw an exception due to size being less than 0.
	 */

	@Test(expected = BadRequestException.class)
	public void testValidatePageNumberAndSize_smallSize() {
		Helpers.validatePageNumberAndSize(5, -1);
	}

	/**
	 * Test: createPageable should generate the correct pageable object.
	 */

	public @Test void testCreatePageable() {
		Pageable pageable = Helpers.createPageable("asc", 1, 1);

		Assert.assertEquals(pageable.getPageNumber(), 1);
		Assert.assertEquals(pageable.getPageSize(), 1);
	}

	/**
	 * Test: isDateBeforeNow should return the correct result.
	 */

	public @Test void testIsDateBeforeNow() {
		LocalDateTime dateTime = LocalDateTime.of(1900, Month.MARCH, 8, 13, 00);
		Instant instant = dateTime.atZone(ZoneId.of("Europe/London")).toInstant();
		Assert.assertEquals(Helpers.isDateBeforeNow(instant), true);
	}

}
