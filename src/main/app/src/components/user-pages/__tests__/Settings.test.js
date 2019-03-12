import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import Settings from "../Settings";
import {ROLE_ADMIN} from "../../../constants";
import * as AppUtils from "../../../utils/AppUtils";
import {CURRENT_USERNAME} from "../../../constants";

function createSettings(props = {}) {
    return <Settings {...props} />
}

describe('Settings', () => {

    it('display the settings page when the user is logged in', () => {

        localStorage.setItem(CURRENT_USERNAME, "test");

        const props = {
            isAuthenticated: true,
            currentUser: { username: 'testUsername', authorities: [ROLE_ADMIN] },
            onLogout: jest.fn()
        };

        const component = shallow(createSettings(props));
        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME);
    });

    it('should display the log in page when the user is NOT logged in', () => {

        const props = {
            isAuthenticated: false,
            currentUser: {},
            onLogout: jest.fn()
        };

        const component = shallow(createSettings(props));
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render correctly when the user account is successfully deleted', () => {

        const originalDeleteUser = AppUtils.deleteUser;
        AppUtils.deleteUser = () => Promise.resolve();

        const props = {
            isAuthenticated: true,
            currentUser: {},
            onLogout: jest.fn()
        };

        const component = shallow(createSettings(props));
        const instance = component.instance();

        instance.handleConfirmDeleteDialog({ value: true });

        expect(toJson(component)).toMatchSnapshot();

        AppUtils.deleteUser = originalDeleteUser;
    });

    it('should render correctly when the user account is not successfully deleted', () => {

        const originalDeleteUser = AppUtils.deleteUser;
        AppUtils.deleteUser = () => Promise.reject();

        const props = {
            isAuthenticated: true,
            currentUser: {},
            onLogout: jest.fn()
        };

        const component = shallow(createSettings(props));
        const instance = component.instance();

        instance.handleConfirmDeleteDialog({ value: true });

        expect(toJson(component)).toMatchSnapshot();

        AppUtils.deleteUser = originalDeleteUser;
    });

});
