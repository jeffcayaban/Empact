import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import {ROLE_ADMIN} from "../../../constants";
import {CURRENT_USERNAME} from "../../../constants";
import ManageArguments from "../ManageArguments";
import * as AppUtils from "../../../utils/AppUtils";

describe('ManageArguments', () => {

    it('should render correctly given the logged in user is an admin', () => {

        const currentUser = { authorities: [ROLE_ADMIN] };

        localStorage.setItem(CURRENT_USERNAME, "test");
        const component = shallow(<ManageArguments
            isAuthenticated={true}
            currentUser={currentUser}
        />);

        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME)
    });

    it('should render an alert given the user is not logged in.', () => {

        const component = shallow(<ManageArguments
            isAuthenticated={true}
            currentUser={null}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should successfully delete an argument', () => {
        const testId = "testId";
        const currentUser = { authorities: [ROLE_ADMIN] };

        const originalDeleteArgument = AppUtils.deleteArgument;
        AppUtils.deleteArgument = () => Promise.resolve();

        localStorage.setItem(CURRENT_USERNAME, "test");

        const component = shallow(<ManageArguments
            isAuthenticated={true}
            currentUser={currentUser}
        />);

        const instance = component.instance();
        const mockEvent = { preventDefault: jest.fn() };
        instance.handleDeleteArgumentRequest(mockEvent, testId);
        instance.handleDeleteArgument({ value: true }, testId);

        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME);
        AppUtils.deleteArgument = originalDeleteArgument;
    });

    it('should unsuccessfully delete an argument given the API call was not successful', () => {
        const testId = "testId";
        const currentUser = { authorities: [ROLE_ADMIN] };

        const originalDeleteArgument = AppUtils.deleteArgument;
        AppUtils.deleteArgument = () => Promise.reject();

        localStorage.setItem(CURRENT_USERNAME, "test");

        const component = shallow(<ManageArguments
            isAuthenticated={true}
            currentUser={currentUser}
        />);

        const instance = component.instance();
        const mockEvent = { preventDefault: jest.fn() };
        instance.handleDeleteArgumentRequest(mockEvent, testId);
        instance.handleDeleteArgument({ value: true }, testId);

        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME);
        AppUtils.deleteArgument = originalDeleteArgument;
    });

});
