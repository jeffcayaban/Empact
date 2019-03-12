import {CRITICAL_QUESTION_IDS, EXPERT_OPINION, ROLE_ADMIN} from "../../constants";

export default {
    id: 'testId',
    isSupporting: true,
    rootPetitionId: 'testRootPetitionId',
    parentArgumentId: 'testParentArgumentId',
    subCriticalQuestionId: null,
    agreesWithCQ: true,
    criticalQuestionId: CRITICAL_QUESTION_IDS[0],
    creationDateTime: 1551716401541,
    lastUpdatedDateTime: 1551716402000,
    createdBy: {
        id: 'testId',
        username: 'testUsername',
        firstName: 'testFirstName',
        lastName: 'testLastName',
        authorities: [ROLE_ADMIN]
    },
    argumentType: EXPERT_OPINION,
    isAnonymous: false,
    sources: [],
    expert: "testExpert",
    expertDomain: 'testDomain',
    expertAssertion: 'testAssertion'
};