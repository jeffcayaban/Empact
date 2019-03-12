export const API_BASE_URL = 'http://localhost:5000/api';
export const ACCESS_TOKEN = 'accessToken';
export const CURRENT_USERNAME = 'username';

export const AUTHORIZATION_HEADER_FIELD = "Authorization";
export const AUTHORIZATION_TOKEN_TYPE = "Bearer";

// Website Name
export const WEBSITE_NAME = "Empact";

// User Roles
export const ROLE_USER = "ROLE_USER";
export const ROLE_ADMIN = "ROLE_ADMIN";

// Argument Types
export const EXPERT_OPINION = "ExpertOpinion";
export const POPULAR_OPINION = "PopularOpinion";

// Argumentation Schemes
export const ARGUMENTATION_SCHEMES = [
    'By Expert Opinion',
    'By Popular Opinion'
];

// Critical Question IDs
export const CRITICAL_QUESTION_IDS = [
    'CQ1',	// Are the circumstances true?
    'CQ2',
    'EO_CQ1',
    'PO_CQ1'
];

// Content Types
export const USER = "User";
export const PETITION = "Petition";
export const ARGUMENT = "Argument";

// Content Properties
export const USERNAME = "Username";
export const ID = "Id";

// Content Actions
export const DELETE = "Delete";
export const CLOSE = "Close";

// Sort Types
export const DESCENDING = "desc";
export const ASCENDING = "asc";
export const SORT_BY_VALUES = [DESCENDING, ASCENDING];

// Content Sort By Values
export const NEWEST = "Newest";
export const OLDEST = "Oldest";
export const MOST_DISCUSSED = "Most Discussed";
export const LEAST_DISCUSSED = "Least Discussed";
export const DISPLAY_SORT_BY_VALUES = [NEWEST, OLDEST, MOST_DISCUSSED, LEAST_DISCUSSED];

// Used in Homepage
export const NO_OF_MOST_DISCUSSED_PETITIONS = 3;
export const NO_OF_MOST_DISCUSSED_ARGUMENTS = 3;

// Petition Form Fields
export const PETITION_TITLE_ID = "title";
export const PETITION_SITUATION_ID = "situation";
export const PETITION_ACTION_ID = "action";
export const PETITION_GOAL_ID = "goal";
export const PETITION_VALUE_ID = "value";
export const PETITION_CLOSING_DATE_ID = "closingDateTime";
export const PETITION_IS_ANONYMOUS_ID = "isAnonymous";

// Register User Fields
export const USERNAME_ID = "username";
export const FIRST_NAME_ID = "firstName";
export const LAST_NAME_ID = "lastName";
export const PASSWORD_ID = "password";
export const CONFIRM_PASSWORD_ID = "confirm-password";

// Register User Field Validation
export const PASSWORD_LENGTH_MIN = 5;
export const PASSWORD_LENGTH_MAX = 21;
export const LAST_NAME_LENGTH_MAX = 40;
export const FIRST_NAME_LENGTH_MAX = 40;
export const USERNAME_LENGTH_MAX = 15;
export const MAXIMUM_NO_OF_SOURCES = 2;
export const MINIMUM_NO_OF_SOURCES = 0;

// Petition Form Validation
export const TITLE_LENGTH_MAX = 90;
export const PETITION_FIELD_MAX = 3000;

// Argument Form Validation
export const EXPERT_FIELD_MAX = 90;
export const ARGUMENT_FIELD_MAX = 6000;

// For Argument Data Visualisation
export const TREE_NETWORK_HEIGHT = 400;

// Other
export const VALID_URL_PREFIX_REGEX = /^(https:\/\/|http:\/\/).*/;
export const PETITION_LIST_SIZE = 5;
export const NOTIFICATION_AUTO_CLOSE_MS = 5000;
export const PETITION_ENTRY_SITUATION_MAX_LENGTH = 400;
export const PETITION_ENTRY_SITUATION_ALT_MAX_LENGTH = 200;
export const MOBILE_MAX_WIDTH = 768;