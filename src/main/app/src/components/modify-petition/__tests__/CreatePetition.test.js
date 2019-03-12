import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import * as Helpers from '../../../utils/Helpers';
import * as AppUtils from '../../../utils/AppUtils';
import CreatePetition from "../CreatePetition";
import {createPetition} from "../../../utils/AppUtils";

describe('CreatePetition', () => {

    it('should render successfully', () => {
        const originalIsUserLoggedIn = Helpers.isUserLoggedIn;
        Helpers.isUserLoggedIn = (isAuthenticated) => { return true };

        const component = shallow(<CreatePetition isAuthenticated={true} />);
        expect(toJson(component)).toMatchSnapshot();

        Helpers.isUserLoggedIn = originalIsUserLoggedIn;
    });

    it('should redirect to the log in page', () => {
        const originalIsUserLoggedIn = Helpers.isUserLoggedIn;
        Helpers.isUserLoggedIn = (isAuthenticated) => { return false };

        const component = shallow(<CreatePetition isAuthenticated={true} />);
        expect(toJson(component)).toMatchSnapshot();

        Helpers.isUserLoggedIn = originalIsUserLoggedIn;
    });

    it('should successfully call onCreate', () => {
        const originalCreatePetition = AppUtils.createPetition;
        AppUtils.createPetition = () => Promise.resolve({ petitionId: 'testId' });

        const component = shallow(<CreatePetition isAuthenticated={true} />);
        const instance = component.instance();

        instance.onCreate({ value: true }, "testId");
        expect(toJson(component)).toMatchSnapshot();

        AppUtils.createPetition = originalCreatePetition;
    });
});
