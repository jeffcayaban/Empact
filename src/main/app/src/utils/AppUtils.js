import {API_BASE_URL, AUTHORIZATION_HEADER_FIELD} from '../constants';
import {ACCESS_TOKEN, AUTHORIZATION_TOKEN_TYPE, PETITION_LIST_SIZE} from "../constants";

/** Creates a request object and sends the request to the server. **/
const request = (options) => {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    if (accessToken !== undefined && accessToken !== null) {
        headers.append(AUTHORIZATION_HEADER_FIELD, `${AUTHORIZATION_TOKEN_TYPE} ${accessToken}`)
    }

    options = {...options, headers: headers};

    return fetch(options.url, options).then(response =>
            (response.json()).then(jsonResponse => (!response.ok) ? Promise.reject(jsonResponse) : jsonResponse)
    );
};

// ---------------------------- APIs ----------------------------

/** Gets all the petitions **/
export function getAllPetitions(page, size, sort, showClosed) {
    page = page || 0;
    size = size || PETITION_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/petitions?page=" + page + "&size=" + size + "&sort=" + sort + "&showClosed=" + showClosed,
        method: 'GET'
    });
}

/** Gets a single petition given an ID **/
export function getPetition(petitionId) {
    return request({
        url: API_BASE_URL + "/petitions/" + petitionId,
        method: 'GET'
    });
}

/** Creates a new petition given its details **/
export function createPetition(petitionData) {
    return request({
        url: API_BASE_URL + "/petitions/create",
        method: 'POST',
        body: JSON.stringify(petitionData)
    });
}

/** Deletes an existing petition given its details **/
export function deletePetition(deletePetitionData) {
    return request({
        url: API_BASE_URL + "/petitions/delete",
        method: 'DELETE',
        body: JSON.stringify(deletePetitionData)
    });
}

/** Updates an existing petition with the given details **/
export function editPetition(editPetitionData) {
    return request({
        url: API_BASE_URL + "/petitions/edit/",
        method: 'POST',
        body: JSON.stringify(editPetitionData)
    });
}

/** Logs in into a user account **/
export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signInUser",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

/** Creates a new user account given the account details **/
export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signUpUser",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

/** Checks the username's availability given a username **/
export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

/** Deletes a user **/
export function deleteUser(deleteUserRequest) {
    return request({
        url: API_BASE_URL + "/auth/deleteUser",
        method: 'DELETE',
        body: JSON.stringify(deleteUserRequest)
    })
}

/** Fetches the current user **/
export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/getCurrentUser",
        method: 'GET'
    });
}

/** Fetches a user profile given a user's username **/
export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/user/getUserProfile?username=" + username,
        method: 'GET'
    });
}

/** Fetches the petitions for a given user **/
export function getUserPetitions(page, size, sort, username, includeAnon, showClosed) {
    return request({
        url: API_BASE_URL + "/petitions/user?username=" + username + "&page=" + page + "&size=" + size + "&sort=" + sort
        + "&includeAnon=" + includeAnon + "&showClosed=" + showClosed,
        method: 'GET',
    });
}

/** Fetches the most discussed petitions for a given user **/
export function getMostDiscussedPetitionsByUser(page, size, sort, username, includeAnon, showClosed) {
    return request({
        url: API_BASE_URL + "/petitions/getMostDiscussedPetitionsByUser?username=" + username + "&page=" + page +
            "&size=" + size + "&sort=" + sort
            + "&includeAnon=" + includeAnon + "&showClosed=" + showClosed,
        method: 'GET',
    });
}

/** Closes a petition given its details **/
export function closePetition(closePetitionData) {
    return request({
        url: API_BASE_URL + "/petitions/close",
        method: 'POST',
        body: JSON.stringify(closePetitionData)
    })
}

/** Creates a new argument by expert opinion given the new details **/
export function createArgumentByExpertOpinion(newArgumentData) {
    return request({
        url: API_BASE_URL + "/arguments/createArgumentByExpertOpinion",
        method: 'POST',
        body: JSON.stringify(newArgumentData)
    });
}

/** Creates a new argument by popular opinion given the new details **/
export function createArgumentByPopularOpinion(newArgumentData) {
    return request({
        url: API_BASE_URL + "/arguments/createArgumentByPopularOpinion",
        method: 'POST',
        body: JSON.stringify(newArgumentData)
    });
}

/** Fetches the arguments for a given petition **/
export function getArgumentsByRootPetitionId(page, size, sort, petitionId, isSupporting) {
    return request({
        url: API_BASE_URL + "/arguments/getArgumentsByRootPetitionId?rootPetitionId=" + petitionId + "&isSupporting=" +
            isSupporting + "&page=" + page + "&size=" + size + "&sort=" + sort,
        method: 'GET',
    });
}

/** Fetches the arguments for a given argument **/
export function getArgumentsByArgumentId(page, size, sort, argumentId, isSupporting) {
    return request({
        url: API_BASE_URL + "/arguments/getArgumentsByArgumentId?argumentId=" + argumentId + "&isSupporting=" +
            isSupporting + "&page=" + page + "&size=" + size + "&sort=" + sort,
        method: 'GET',
    });
}

/** Fetches the argument for a given ID **/
export function getArgumentById(argumentId) {
    return request({
        url: API_BASE_URL + "/arguments/" + argumentId,
        method: 'GET'
    });
}

/** Fetches the parent argument for a given argument **/
export function getParentArgumentById(argumentId) {
    return request({
        url: API_BASE_URL + "/arguments/getParentArgumentById?argumentId=" + argumentId,
        method: 'GET',
    });
}

/** Checks whether a petition is closed or not **/
export function isPetitionClosed(petitionId) {
    return request({
        url: API_BASE_URL + "/petitions/isPetitionClosed/" + petitionId,
        method: 'GET'
    })
}

/** Fetches the arguments for a given user **/
export function getUserArguments(page, size, sort, username, showAnonymousContent) {
    return request({
        url: API_BASE_URL + "/arguments/getArgumentsByUsernameAndAnonymity?username=" + username +
            "&showAnonymousContent=" + showAnonymousContent + "&page=" + page + "&size=" + size + "&sort=" + sort,
        method: 'GET'
    })
}

/** Fetches the number of supporting or opposing arguments for a given petition **/
export function countArgsByPetitionIdAndIsSupporting(petitionId, isSupporting) {
    return request({
        url: API_BASE_URL + "/arguments/countArgsByPetitionIdAndIsSupporting?petitionId=" + petitionId
            + "&isSupporting=" + isSupporting,
        method: 'GET',
    })
}

/** Fetches the number of supporting or opposing arguments for a given argument **/
export function countArgsByArgumentIdAndIsSupporting(argumentId, isSupporting) {
    return request({
        url: API_BASE_URL + "/arguments/countAllByArgumentIdAndIsSupporting?argumentId=" + argumentId
            + "&isSupporting=" + isSupporting,
        method: 'GET',
    })
}

/** Deletes an argument given its details **/
export function deleteArgument(deleteArgumentData) {
    return request({
        url: API_BASE_URL + "/arguments/delete",
        method: 'DELETE',
        body: JSON.stringify(deleteArgumentData)
    });
}

/** Updates an existing argument by popular opinion with new details **/
export function editArgumentByPopularOpinion(editArgumentData) {
    return request({
        url: API_BASE_URL + "/arguments/editArgumentByPopularOpinion",
        method: 'POST',
        body: JSON.stringify(editArgumentData)
    });
}

/** Updates an existing argument by expert opinion with new details **/
export function editArgumentByExpertOpinion(editArgumentData) {
    return request({
        url: API_BASE_URL + "/arguments/editArgumentByExpertOpinion",
        method: 'POST',
        body: JSON.stringify(editArgumentData)
    });
}

/** Fetches the most discussed petitions **/
export function getMostDiscussedPetitions(page, size, sort, showClosed) {
    return request({
        url: API_BASE_URL + "/petitions/getMostDiscussedPetitions?page=" + page + "&size=" + size + "&sort=" + sort +
            "&showClosed=" + showClosed,
        method: 'GET'
    });
}

/** Fetches the most discussed arguments **/
export function getMostDiscussedArguments(pageSize, showClosed) {
    return request({
        url: API_BASE_URL + "/arguments/getMostDiscussedArguments?size=" + pageSize + "&showClosed=" + showClosed,
        method: 'GET'
    });
}

/** Fetches the most discussed arguments for a given petition **/
export function getMostDiscussedArgumentsForPetition(page, size, sort, petitionId, isSupporting) {
    return request({
        url: API_BASE_URL + "/arguments/getMostDiscussedArgsForPetition?page=" + page + "&size=" + size + "&sort=" + sort +
            "&petitionId=" + petitionId + "&isSupporting=" + isSupporting,
        method: 'GET'
    });
}

/** Fetches the most discussed arguments for a given argument **/
export function getMostDiscussedArgumentsForArgument(page, size, sort, argumentId, isSupporting) {
    return request({
        url: API_BASE_URL + "/arguments/getMostDiscussedArgsForArgument?page=" + page + "&size=" + size + "&sort=" + sort +
            "&argumentId=" + argumentId + "&isSupporting=" + isSupporting,
        method: 'GET'
    });
}

/** Fetches the most discussed arguments for a given user **/
export function getMostDiscussedArgumentsForUser(page, size, sort, username, showAnonymousContent) {
    return request({
        url: API_BASE_URL + "/arguments/getMostDiscussedArgsForUser?page=" + page + "&size=" + size + "&sort=" + sort +
            "&username=" + username + "&showAnonymousContent=" + showAnonymousContent,
        method: 'GET'
    });
}

/** Fetches the data nodes required for the data visualisation of arguments **/
export function getDataNodes(contentId, isPetition) {
    return request({
        url: API_BASE_URL + "/arguments/getDataNodes?contentId=" + contentId + "&isPetition=" + isPetition,
        method: 'GET'
    });
}

/** Fetches data required for the petition report **/
export function getPetitionReport(petitionId) {
    return request({
        url: API_BASE_URL + "/arguments/getPetitionReport?petitionId=" + petitionId,
        method: 'GET'
    });
}

/** Searches for petitions given a query **/
export function searchPetitions(page, size, sort, showClosed, query) {
    return request({
        url: API_BASE_URL + "/petitions/search?page=" + page + "&size=" + size + "&sort=" + sort + "&showClosed=" + showClosed
         + "&query=" + query,
        method: 'GET'
    });
}
