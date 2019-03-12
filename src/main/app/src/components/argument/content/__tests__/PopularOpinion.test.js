import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import {CRITICAL_QUESTION_IDS, POPULAR_OPINION, ROLE_ADMIN} from "../../../../constants";
import PopularOpinion from "../PopularOpinion";

describe('PopularOpinion', () => {

    it('should render correctly', () => {

        const mockArgument = {
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
            argumentType: POPULAR_OPINION,
            isAnonymous: false,
            sources: [],
            explanation: 'testExplanation'
        };

        const component = shallow(<PopularOpinion
            argument={mockArgument}
            labels={[ "test1", "test2", "test3" ]}
            showPetition={jest.fn()}
            includePreview={true}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });
});
