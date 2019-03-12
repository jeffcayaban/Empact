package com.empact.Empact.util;

/**
 * AppConstants contain the constants that are commonly used in areas of the application.
 */

public interface AppConstants {
	long MAX_AGE_IN_MS = 3400;

	String DEFAULT_PAGE_NUMBER = "0";
	String DEFAULT_PAGE_SIZE = "10";

	String DESCENDING_ORDER = "desc";
	String ASCENDING_ORDER = "asc";

	String PETITION = "Petition";
	String ARGUMENT = "Argument";
	String USER = "User";

	String ID = "id";
	String CREATED_AT = "createdAt";
	String USERNAME = "username";

	// Argument Types
	String EXPERT_OPINION = "ExpertOpinion";
	String POPULAR_OPINION = "PopularOpinion";

	// Constants Regarding Tokens
	String BEARER = "Bearer";
	String AUTHORIZATION = "Authorization";
}
