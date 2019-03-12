import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import MockPetition from '../../../other/mock-data/MockGetPetitionsResponse';

import PetitionActionPanel from "../PetitionActionPanel";

function createPetitionActionPanel(props = {}) {
    const mockRouter = jest.fn();
    return <PetitionActionPanel.WrappedComponent {...props} params={{ router: mockRouter }} />;
}

describe('PetitionActionPanel', () => {

    it('should render successfully given the petition is not closed', () => {
        const mockDeletePetition = () => Promise.resolve();

        const props = {
            isPetitionClosed: false,
            petition: MockPetition.content[0],
            deletePetition: mockDeletePetition
        };

        const component = shallow(createPetitionActionPanel(props));

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render successfully given the petition is closed', () => {
        const mockDeletePetition = () => Promise.resolve();

        const props = {
            isPetitionClosed: true,
            petition: MockPetition.content[0],
            deletePetition: mockDeletePetition
        };

        const component = shallow(createPetitionActionPanel(props));

        expect(toJson(component)).toMatchSnapshot();
    });

});
