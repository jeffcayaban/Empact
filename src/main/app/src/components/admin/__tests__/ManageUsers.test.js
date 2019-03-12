import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import { ROLE_ADMIN } from "../../../constants";
import { CURRENT_USERNAME } from "../../../constants";
import ManageUsers from "../ManageUsers";
import * as AppUtils from "../../../utils/AppUtils";

describe('ManageUsers', () => {

    it('should render correctly given the content type is User', () => {
        const currentUser = { authorities: [ROLE_ADMIN] };

        localStorage.setItem(CURRENT_USERNAME, "test");
        const component = shallow(<ManageUsers
            isAuthenticated={true}
            currentUser={currentUser}
        />);

        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME);
    });

    it('should render an alert given the user is not logged in.', () => {
        const component = shallow(<ManageUsers
            isAuthenticated={true}
            currentUser={null}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should correctly call handleDeleteUserRequest', () => {
        const testUsername = 'testUsername';
        const currentUser = { authorities: [ROLE_ADMIN] };
        localStorage.setItem(CURRENT_USERNAME, "test");

        const component = shallow(<ManageUsers
            isAuthenticated={true}
            currentUser={currentUser}
        />);

        const instance = component.instance();
        const mockEvent = { preventDefault: jest.fn() };

        instance.handleDeleteUserRequest(mockEvent, testUsername);

        expect(toJson(component)).toMatchSnapshot();
        localStorage.removeItem(CURRENT_USERNAME);
    });

    it('should correctly call handleDeleteUser', () => {

        const testUsername = 'testUsername';
        const currentUser = { authorities: [ROLE_ADMIN] };

        const originalDeleteUser = AppUtils.deleteUser;
        AppUtils.deleteUser = () => Promise.resolve();

        localStorage.setItem(CURRENT_USERNAME, "test");

        const component = shallow(<ManageUsers
            isAuthenticated={true}
            currentUser={currentUser}
        />);

        const instance = component.instance();
        instance.handleDeleteUser({ value: true }, testUsername);

        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME);
        AppUtils.deleteUser = originalDeleteUser;
    });

    it('should unsuccessfully call handleDeleteUser given the API call was not successful', () => {

        const testUsername = 'testUsername';
        const currentUser = { authorities: [ROLE_ADMIN] };

        const originalDeleteUser = AppUtils.deleteUser;
        AppUtils.deleteUser = () => Promise.reject();

        localStorage.setItem(CURRENT_USERNAME, "test");

        const component = shallow(<ManageUsers
            isAuthenticated={true}
            currentUser={currentUser}
        />);

        const instance = component.instance();
        instance.handleDeleteUser({ value: true }, testUsername);

        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME);
        AppUtils.deleteUser = originalDeleteUser;
    });

});
