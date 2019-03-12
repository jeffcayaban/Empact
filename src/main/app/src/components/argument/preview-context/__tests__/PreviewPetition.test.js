import React from 'react';
import { shallow } from "enzyme";

import PreviewPetition from "../PreviewPetition";
import * as AppUtils from "../../../../utils/AppUtils";
import MockData from "../../../../other/mock-data/MockGetPetitionsResponse";
import toJson from "enzyme-to-json";

describe('PreviewPetition', () => {

    it('should render successfully', () => {
        const originalGetPetition = AppUtils.getPetition;
        AppUtils.getPetition = (petitionId) => Promise.resolve(MockData.content);

        const component = shallow(
            <PreviewPetition
                petitionId={'testPetitionId'}
                handleHide={jest.fn()}
                show={true}
            />
        );

        expect(toJson(component)).toMatchSnapshot();

        AppUtils.getPetition = originalGetPetition;
    });

    it('should render successfully ', () => {
        const originalGetPetition = AppUtils.getPetition;
        AppUtils.getPetition = (petitionId) => Promise.resolve(MockData.content);

        const component = shallow(
            <PreviewPetition
                petitionId={'testPetitionId'}
                handleHide={jest.fn()}
                show={true}
            />
        );

        expect(toJson(component)).toMatchSnapshot();

        AppUtils.getPetition = originalGetPetition;
    });

    it('should render a loader', () => {
        const originalGetPetition = AppUtils.getPetition;
        AppUtils.getPetition = (petitionId) => Promise.resolve(MockData.content);

        const component = shallow(
            <PreviewPetition
                petitionId={'testPetitionId'}
                handleHide={jest.fn()}
                show={true}
            />
        );
        component.setState({ isLoading: true });
        expect(toJson(component)).toMatchSnapshot();

        AppUtils.getPetition = originalGetPetition;
    });
});
