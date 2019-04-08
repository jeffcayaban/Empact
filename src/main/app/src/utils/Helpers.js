import React from 'react'

import moment from "moment";
import swal from "sweetalert2";
import {
    ARGUMENTATION_SCHEMES,
    CLOSE,
    CRITICAL_QUESTION_IDS, CURRENT_USERNAME,
    DELETE,
    EXPERT_OPINION,
    POPULAR_OPINION,
    ROLE_ADMIN,
    VALID_URL_PREFIX_REGEX
} from "../constants";
import {ACCESS_TOKEN} from "../constants";
import PopularOpinion from "../components/argument/create-argument/forms/PopularOpinion";
import ExpertOpinion from "../components/argument/create-argument/forms/ExpertOpinion";
import CreatedByOn from "../components/common/CreatedByOn";
import AcceptedCQ
    from "../components/argument/create-argument/create-argument-for-argument/popular-opinion-cqs/AcceptedCQ";
import ExpertiseCQ
    from "../components/argument/create-argument/create-argument-for-argument/expert-opinion-cqs/ExpertiseCQ";
import {login} from "./AppUtils";

/** Checks whether the user is logged in. **/
export function isUserLoggedIn(isAuthenticated) {
    return isAuthenticated && localStorage.getItem(CURRENT_USERNAME) !== null;
}

/** Checks whether the user is an administrator **/
export function isUserAdmin(currentUser, isAuthenticated) {
    return isUserLoggedIn(isAuthenticated) && currentUser.authorities[0] === ROLE_ADMIN;
}

/** Formats a timestamp in DD-MM-YYYY **/
export function formatTimestampToDate(timestamp) {
    return moment(timestamp).format('DD-MM-YYYY');
}

/** Formats a timestamp in DD-MM-YYYY h:mma **/
export function formatTimestampToDateTime(timestamp) {
    return moment(timestamp).format('DD-MM-YYYY h:mma');
}

/** Generates a set of labels to be displayed for an argument. **/
export function getArgumentLabels(argument, parentArgument, agreesWithCQ) {
    const criticalQuestionId = argument.criticalQuestionId;
    const argumentType = argument.argumentType;
    const toReturn = [];

    if (criticalQuestionId === CRITICAL_QUESTION_IDS[0]) {
        // Critical Question: Are the circumstances true?

        const isSupportingText = agreesWithCQ ? "true" : "false";
        toReturn[0] = `The situation is ${isSupportingText}`;

    } else if (criticalQuestionId === CRITICAL_QUESTION_IDS[1]) {
        // Critical Question: Does the action achieve the goal?

        const isSupportingText = agreesWithCQ ? "" : " not";
        toReturn[0] = `The action does${isSupportingText} achieve the goal`;
    }

    if (argument.subCriticalQuestionId && parentArgument) {
        // The argument is made to another argument.

        const subCriticalQuestionId = argument.subCriticalQuestionId;

        if (subCriticalQuestionId === CRITICAL_QUESTION_IDS[2]) {
            // Critical Question: Is the expert credible?

            const isSupportingText = agreesWithCQ ? "" : " not";
            toReturn[2] = "The expert, " + parentArgument.expert + `, is${isSupportingText} credible`;
        } else if (subCriticalQuestionId === CRITICAL_QUESTION_IDS[3]) {
            // Critical Question: Is the explanation generally accepted?

            const isSupportingText = agreesWithCQ ? "" : " not";
            toReturn[2] = `The explanation is${isSupportingText} accepted`;
        }
    }

    if (argumentType === EXPERT_OPINION) {
        toReturn[1] = `Argument by Expert Opinion`;
    } else if (argumentType === POPULAR_OPINION) {
        toReturn[1] = 'Argument by Popular Opinion';
    }

    return toReturn;
}

/** Pluralises a time unit. **/
function pluraliseTime(time, label) {
    return (time === 1) ? label : label + 's';
}

/** Generates a readable date message **/
export function getTimeRemaining(timestamp) {
    const dateToCompare = moment(timestamp);
    const now = moment();

    const exaggerateTimeStyle = { color: 'red', marginBottom: '0px' };

    if (dateToCompare.diff(now, 'seconds') < 60) {
        // Focuses on Seconds.
        const time = dateToCompare.diff(now, 'seconds');
        return <p style={exaggerateTimeStyle}>{`${time} ${pluraliseTime(time, 'second')}`}</p>;
    } else if (dateToCompare.diff(now, 'minutes') < 60) {
        // Focuses on Minutes.
        const time = dateToCompare.diff(now, 'minutes');
        return <p style={exaggerateTimeStyle}>{`${time} ${pluraliseTime(time, 'minute')}`}</p>;
    } else if (dateToCompare.diff(now, 'hours') < 24) {
        // Focuses on Hours.
        const time = dateToCompare.diff(now, 'hours');
        return <p style={exaggerateTimeStyle}>{`${time} ${pluraliseTime(time, 'hour')}`}</p>;
    } else if (dateToCompare.diff(now, 'days') < 31) {
        // Focuses on Days.
        const time = dateToCompare.diff(now, 'days');
        return `${time} ${pluraliseTime(time, 'day')}`
    } else if (dateToCompare.diff(now, 'weeks') < 4) {
        // Focuses on Weeks.
        const time = dateToCompare.diff(now, 'weeks');
        return `${time} ${pluraliseTime(time, 'week')}`
    } else if (dateToCompare.diff(now, 'months') < 12) {
        // Focuses on Months.
        const time = dateToCompare.diff(now, 'months');
        return `${time} ${pluraliseTime(time, 'month')}`
    } else {
        // Focuses on Years.
        const time = dateToCompare.diff(now, 'years');
        return `${time} ${pluraliseTime(time, 'year')}`
    }
}

/** Determines whether the date given has passed. **/
export function isDatePassed(timestamp) {
    return moment(timestamp).diff(moment()) <= 0;
}

/** Generates a successful dialog for argument creation. **/
export function showArgCreationConfirmation(response) {
    return (
        swal({
            title: 'Success!',
            text: 'Your argument has been created!',
            type: 'success',
            confirmButtonText: 'Your Argument',
            cancelButtonText: 'Close',
            showCancelButton: true,
        }).then((result) => {
            if (result.value) {
                window.location = `/argument/${response.argumentId}`
            } else {
                window.location.reload();
            }
        })
    )
}

/** Generates a successful dialog for argument creation. **/
export function renderArgumentCreatorName(argument) {
    return (!argument.isAnonymous) ? argument.createdBy.firstName : "The argument creator";
}

/** Generates a dialog to confirm the user's action to either delete or close some content. **/
export function generateConfirmActionDialog(contentType, contentAction) {
    let displayedAction;

    if (contentAction === DELETE) {
        // Assumes the user's action to be regarding deletion.
        displayedAction = " deleting";

    } else if (contentAction === CLOSE) {
        // Assumes the user's action to be regarding closing a petition.
        displayedAction = " closing"
    }

    return (
        swal({
            title: 'Are you sure?',
            text: `Do you wish to proceed with${displayedAction} this ${contentType.toLowerCase()}?`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        })
    );
}

/** Generates a dialog for when something went wrong. **/
export function generateSomethingWentWrongDialog() {
    return generateErrorDialog('Sorry! Something went wrong. Please try again');
}

/** Generates a dialog for when something went wrong. **/
export function generateAdminActionSuccessDialog(contentType, contentAction) {
    let displayedAction;

    if (contentAction === DELETE) {
        displayedAction = "deleted";
    } else if (contentAction === CLOSE) {
        displayedAction = "closed"
    }

    return (
        swal({ title: 'Success!', text: `The ${contentType.toLowerCase()} has been ${displayedAction}.`, type: 'success' })
            .then(() => window.location.reload())
    )
}

/** Generates a dialog to confirm the user's action. **/
export function generateGeneralConfirmDialog(message = "You won't be able to revert this!") {
    return (
        swal({
            title: 'Are you sure?',
            text: message,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        })
    )
}

/** Generates a generic error dialog. **/
export function generateErrorDialog(message) {
    return swal('Error', message, 'error');
}

/** Generates a generic success dialog. **/
export function generateSuccessDialog(message, confirmButtonText) {
    return swal({ title: 'Success!', text: message, type: 'success', confirmButtonText: confirmButtonText });
}

/** Generates the appropriate critical question for an argument **/
export function generateCriticalQuestions(argument, userSupportsArgument) {
    const argumentType = argument.argumentType;

    if (argumentType === EXPERT_OPINION) {
        return <div><ExpertiseCQ argument={argument} isSupporting={userSupportsArgument} /></div>;
    } else if (argumentType === POPULAR_OPINION) {
        return <div><AcceptedCQ argument={argument} isSupporting={userSupportsArgument} /></div>;
    }
}

/** Checks whether a URL source is of the correct format. E.g. Starting with http or https **/
export function checkSourceUrlsIsValid(sources) {
    if (sources !== undefined && sources !== null) {
        let i;
        for (i = 0; i < sources.length; i++) {
            if (!VALID_URL_PREFIX_REGEX.test(sources[i])) {
                return false;
            }
        }
    }
    return true;
}

/** Checks whether a URL source is of the correct format. E.g. Starting with http or https **/
export function handleArgumentSubmit(sources, isForEdit, editArgRequest, editArgApi, createArgRequest, createArgApi,
                                     argumentId, argument) {

    if (checkSourceUrlsIsValid(sources)) {
        // Assumes that the URL sources for the argument are in the correct format.

        swal({
            title: 'Are you sure?',
            text: 'Do you wish to proceed with the details of your argument?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                if (isForEdit) {
                    // For argument modification.
                    let existNoChanges;

                    if (argument.argumentType === EXPERT_OPINION) {
                        existNoChanges = compareExpertOpinionData(argument, editArgRequest);
                    } else {
                        existNoChanges = comparePopularOpinionData(argument, editArgRequest);
                    }

                    if (!existNoChanges) {
                        editArgApi(editArgRequest)
                            .then(response => {
                                swal({
                                    title: 'Success!',
                                    text: 'Your argument has been updated!',
                                    type: 'success',
                                    confirmButtonText: 'Your Argument',
                                    cancelButtonText: 'Close',
                                    showCancelButton: true,
                                }).then((result) => {
                                    if (result.value) {
                                        window.location = `/argument/${argumentId}`
                                    } else {
                                        window.location.reload();
                                    }
                                })
                            })
                            .catch(() => generateErrorDialog('Your argument couldn\'t be updated.'))
                    } else {
                        generateErrorDialog("There are no new changes to be applied.")
                    }


                } else {
                    // For argument creation.
                    createArgApi(createArgRequest)
                        .then(response => showArgCreationConfirmation(response))
                        .catch(() => generateErrorDialog('Your argument couldn\'t be created.'))
                }
            }
        });
    } else {
        // Assumes that the URL sources for the argument are not in the correct format, so an error is displayed.
        generateErrorDialog('Your argument couldn\'t be created. Your sources contain an invalid URL.');
    }
}

/** Displays the appropriate argumentation scheme form. **/
export function showArgumentTemplate(statement, selectedArgScheme, petitionId, isSupporting, userAgreeWithQuestion,
                                     argumentId, criticalQuestion, subCriticalQuestion) {
    if (selectedArgScheme) {
        let argumentTemplate;

        switch(selectedArgScheme) {
            case ARGUMENTATION_SCHEMES[0]:
                argumentTemplate = <ExpertOpinion
                    argumentId={argumentId}
                    petitionId={petitionId}
                    isSupporting={isSupporting}
                    criticalQuestionId={criticalQuestion}
                    agreesWithCQ={userAgreeWithQuestion}
                    subCriticalQuestionId={subCriticalQuestion}
                />;
                break;
            case ARGUMENTATION_SCHEMES[1]:
                argumentTemplate = <PopularOpinion
                    argumentId={argumentId}
                    petitionId={petitionId}
                    isSupporting={isSupporting}
                    criticalQuestionId={criticalQuestion}
                    agreesWithCQ={userAgreeWithQuestion}
                    statement={statement}
                    subCriticalQuestionId={subCriticalQuestion}
                />;
                break;
            default:
                argumentTemplate = null;
                break;
        }

        return (
            <div style={{ paddingTop: '30px' }}>
                {argumentTemplate}
            </div>
        );
    }
}

/** Check whether any changes have been made between two sets of petition data. **/
export function comparePetitionData(existingData, newData) {
    const actionIsSame = existingData.action === newData.action;
    const goalIsSame = existingData.goal === newData.goal;
    const situationIsSame = existingData.situation === newData.situation;
    const valueIsSame = existingData.value === newData.value;
    const titleIsSame = existingData.title === newData.title;
    const isAnonymousSame = existingData.isAnonymous === newData.isAnonymous;
    const isClosingDateSame = moment(existingData.closingDateTime).valueOf() === newData.closingDateTime;

    return actionIsSame && goalIsSame && situationIsSame && valueIsSame && titleIsSame && isAnonymousSame && isClosingDateSame;
}

/** Check whether any changes have been made between two sets of "argument by expert opinion" data. **/
export function compareExpertOpinionData(existingData, newData) {
    const expertIsSame = existingData.expert === newData.expert;
    const expertDomainIsSame = existingData.expertDomain === newData.expertDomain;
    const expertAssertionIsSame = existingData.expertAssertion === newData.expertAssertion;
    const sourcesIsSame = JSON.stringify(existingData.sources) === JSON.stringify(newData.sources);
    const isAnonymousSame = existingData.isAnonymous === newData.isAnonymous;

    return expertIsSame && expertDomainIsSame && expertAssertionIsSame && sourcesIsSame && isAnonymousSame;

}

/** Check whether any changes have been made between two sets of "argument by popular opinion" data. **/
export function comparePopularOpinionData(existingData, newData) {
    const explanationIsSame = existingData.explanation === newData.explanation;
    const sourcesIsSame = JSON.stringify(existingData.sources) === JSON.stringify(newData.sources);
    const isAnonymousSame = existingData.isAnonymous === newData.isAnonymous;

    return explanationIsSame && sourcesIsSame && isAnonymousSame;
}

/** Truncates a piece of text by a given length. **/
export function truncateText(text, length) {
    return (length && text) && (text.length > length ? `${text.substr(0, length)}...` : text);
}

/** Determines whether an argument agrees with the critical question. **/
export function getIsArgumentAgreeWithCQ(isSupporting, ArgAgreesWithCQ) {
    return (isSupporting) ? ArgAgreesWithCQ : !ArgAgreesWithCQ;
}

/** Generates the argument creator's name **/
export function generateArgumentCreatorName(argument, showCreatorName) {
    const creationDate = formatTimestampToDate(argument.creationDateTime);

    if (showCreatorName) {
        return <CreatedByOn content={argument} date={creationDate} />;
    } else {
        return <span>{`Created on ${creationDate}`}</span>;
    }
}

/** Sends the request to login into a given account. **/
export function sendLoginRequest(request, goToHome, username, loginCallback) {
    login(request)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            localStorage.setItem(CURRENT_USERNAME, username);
            loginCallback !== null ? loginCallback() : window.location = `/`
        }).catch(error => {

        if (error.status === 401) {
            generateErrorDialog('Your Username or Password is incorrect. Please try again');
        } else {
            generateSomethingWentWrongDialog();
        }

        if (goToHome) {
            // Redirects the user to the home page.
            window.location = `/`;
        }
    });
}
