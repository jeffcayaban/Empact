import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import * as Helpers from "../../../utils/Helpers";
import * as AppUtils from "../../../utils/AppUtils";
import MockExpertOpinionArgument from "../../../other/mock-data/MockArgument.js";
import MockPopularOpinionArgument from "../../../other/mock-data/MockGetArgumentsResponse";

import EditArgument from "../EditArgument";
import {CURRENT_USERNAME} from "../../../constants";

describe('EditArgument', () => {

    it('should redirect to the login page', () => {
        const originalIsUserLoggedIn = Helpers.isUserLoggedIn;
        Helpers.isUserLoggedIn = () => { return false };

        const originalGetArgumentById = AppUtils.getArgumentById;
        AppUtils.getArgumentById = () => Promise.resolve(MockExpertOpinionArgument);

        localStorage.setItem(CURRENT_USERNAME, "test");

        const component = shallow(<EditArgument
            match={{ params: {id: 'testId'} }}
            argumentId={"testArgumentId"}
        />);

        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME);

        Helpers.isUserLoggedIn = originalIsUserLoggedIn;
        AppUtils.getArgumentById = originalGetArgumentById;
    });

    it('should successfully display the form for expert opinion', () => {
        const originalIsUserLoggedIn = Helpers.isUserLoggedIn;
        Helpers.isUserLoggedIn = () => { return true };

        const originalGetArgumentById = AppUtils.getArgumentById;
        AppUtils.getArgumentById = () => Promise.resolve(MockExpertOpinionArgument);

        localStorage.setItem(CURRENT_USERNAME, "test");

        const component = shallow(<EditArgument
            match={{ params: {id: 'testId'} }}
            argumentId={"testArgumentId"}
            currentUser={{ username: "testUsername" }}
        />);

        component.setState({ isLoading: false, argument: MockExpertOpinionArgument });

        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME);

        Helpers.isUserLoggedIn = originalIsUserLoggedIn;
        AppUtils.getArgumentById = originalGetArgumentById;
    });

    it('should successfully display the form for popular opinion', () => {
        const argument = MockPopularOpinionArgument.content[0];

        const originalIsUserLoggedIn = Helpers.isUserLoggedIn;
        Helpers.isUserLoggedIn = () => { return true };

        const originalGetArgumentById = AppUtils.getArgumentById;
        AppUtils.getArgumentById = () => Promise.resolve(argument);

        localStorage.setItem(CURRENT_USERNAME, "test");

        const component = shallow(<EditArgument
            match={{ params: {id: 'testId'} }}
            argumentId={"testArgumentId"}
            currentUser={{ username: "admin" }}
        />);

        component.setState({ isLoading: false, argument: argument });

        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME);

        Helpers.isUserLoggedIn = originalIsUserLoggedIn;
        AppUtils.getArgumentById = originalGetArgumentById;
    });

    it('should display an unable to edit alert', () => {
        const argument = MockPopularOpinionArgument.content[0];

        const originalIsUserLoggedIn = Helpers.isUserLoggedIn;
        Helpers.isUserLoggedIn = () => { return true };

        const originalGetArgumentById = AppUtils.getArgumentById;
        AppUtils.getArgumentById = () => Promise.resolve(argument);

        localStorage.setItem(CURRENT_USERNAME, "test");

        const component = shallow(<EditArgument
            match={{ params: {id: 'testId'} }}
            argumentId={"testArgumentId"}
            currentUser={{ username: "testId" }}
        />);

        component.setState({ isLoading: false, argument: argument });

        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME);

        Helpers.isUserLoggedIn = originalIsUserLoggedIn;
        AppUtils.getArgumentById = originalGetArgumentById;
    });

});