package com.empact.Empact.util;

import com.empact.Empact.exception.BadRequestException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.time.Instant;
import java.util.Objects;

import static com.empact.Empact.util.AppConstants.ASCENDING_ORDER;
import static com.empact.Empact.util.AppConstants.CREATED_AT;

/**
 * Helpers contain helper methods that assists in the operations of other areas within the application.
 */

public class Helpers {

	/**
	 * Checks whether the page size and page number are valid.
	 *
	 * @param page Page number.
	 * @param size Page size.
	 */

	public static void validatePageNumberAndSize(int page, int size) {
		if (page < 0) {
			throw new BadRequestException("Page number cannot be less than zero.");
		}

		if (size < 0) {
			throw new BadRequestException("Page size cannot be less than zero.");
		}
	}

	/**
	 * Creates the Pageable object to be used when querying the data repository.
	 *
	 * @param sort How the results are to be sorted.
	 * @param page The page number.
	 * @param size The page size.
	 * @return The Pageable object.
	 */

	public static Pageable createPageable(String sort, int page, int size) {
		Sort.Direction sortOrder = Objects.equals(sort.toLowerCase(), ASCENDING_ORDER) ? Sort.Direction.ASC : Sort.Direction.DESC;
		return PageRequest.of(page, size, sortOrder, CREATED_AT);
	}

	/**
	 * Checks if the date is before now.
	 *
	 * @param dateToCompare The date to be compared with.
	 * @return A boolean indicating if the date is before now.
	 */

	public static Boolean isDateBeforeNow(Instant dateToCompare) {
		return dateToCompare.isBefore(Instant.now());
	}

}
