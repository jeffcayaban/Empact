import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import * as Helpers from '../../../utils/Helpers';
import * as AppUtils from '../../../utils/AppUtils';
import PetitionResponse from '../../../other/mock-data/MockGetPetitionsResponse';

import EditPetition from "../EditPetition";

describe('EditPetition', () => {

    it('should render successfully', () => {
        const originalIsUserLoggedIn = Helpers.isUserLoggedIn;
        Helpers.isUserLoggedIn = (isAuthenticated) => { return true };

        const originalGetPetition = AppUtils.getPetition;
        AppUtils.getPetition = () => Promise.resolve(PetitionResponse.content);

        const component = shallow(<EditPetition
            currentUser={{ username: 'testUsername' }}
            isAuthenticated={true}
            match={{ params: { id: 'testId' } }}
        />);

        component.setState({
            petition: { createdBy: { username: 'testUsername' } },
            isLoading: false
        });

        expect(toJson(component)).toMatchSnapshot();

        Helpers.isUserLoggedIn = originalIsUserLoggedIn;
        AppUtils.getPetition = originalGetPetition;
    });

    it('should display unable to edit alert', () => {
        const originalIsUserLoggedIn = Helpers.isUserLoggedIn;
        Helpers.isUserLoggedIn = (isAuthenticated) => { return true };

        const originalGetPetition = AppUtils.getPetition;
        AppUtils.getPetition = () => Promise.resolve(PetitionResponse.content);

        const component = shallow(<EditPetition
            currentUser={{ username: 'testUsername1' }}
            isAuthenticated={true}
            match={{ params: { id: 'testId' } }}
        />);

        component.setState({
            petition: { createdBy: { username: 'testUsername' } },
            isLoading: false
        });

        expect(toJson(component)).toMatchSnapshot();

        Helpers.isUserLoggedIn = originalIsUserLoggedIn;
        AppUtils.getPetition = originalGetPetition;
    });

    it('should display a no new changes error', () => {
        const originalIsUserLoggedIn = Helpers.isUserLoggedIn;
        Helpers.isUserLoggedIn = (isAuthenticated) => { return true };

        const originalGetPetition = AppUtils.getPetition;
        AppUtils.getPetition = () => Promise.resolve(PetitionResponse.content);

        const component = shallow(<EditPetition
            currentUser={{ username: 'testUsername1' }}
            isAuthenticated={true}
            match={{ params: { id: 'testId' } }}
        />);

        component.setState({
            petition: { createdBy: { username: 'testUsername' } },
            isLoading: false
        });

        const instance = component.instance();

        instance.onUpdate(PetitionResponse.content);

        expect(toJson(component)).toMatchSnapshot();

        Helpers.isUserLoggedIn = originalIsUserLoggedIn;
        AppUtils.getPetition = originalGetPetition;
    });

    it('should display a dialog to confirm the edit', () => {
        const originalIsUserLoggedIn = Helpers.isUserLoggedIn;
        Helpers.isUserLoggedIn = (isAuthenticated) => { return true };

        const originalGetPetition = AppUtils.getPetition;
        AppUtils.getPetition = () => Promise.resolve(PetitionResponse.content);

        const component = shallow(<EditPetition
            currentUser={{ username: 'testUsername1' }}
            isAuthenticated={true}
            match={{ params: { id: 'testId' } }}
        />);

        component.setState({
            petition: { createdBy: { username: 'testUsername' } },
            isLoading: false
        });

        const instance = component.instance();
        PetitionResponse.content.action = 'test';

        instance.onUpdate(PetitionResponse.content);

        expect(toJson(component)).toMatchSnapshot();

        Helpers.isUserLoggedIn = originalIsUserLoggedIn;
        AppUtils.getPetition = originalGetPetition;
    });
});
