import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import App from "../App";
import * as AppUtils from '../../utils/AppUtils';
import {CURRENT_USERNAME} from "../../constants";

describe('App', () => {

    it('should render successfully', () => {
        const originalGetCurrentUser = AppUtils.getCurrentUser;
        AppUtils.getCurrentUser = () => Promise.resolve({});

        const component = shallow(<App.WrappedComponent
            params={{ router: jest.fn() }}
        />);

        expect(toJson(component)).toMatchSnapshot();
        AppUtils.getCurrentUser = originalGetCurrentUser;
    });

    it('should successfully call handleLogout', () => {
        const originalGetCurrentUser = AppUtils.getCurrentUser;
        AppUtils.getCurrentUser = () => Promise.resolve({});

        localStorage.setItem(CURRENT_USERNAME, "test");

        const component = shallow(<App.WrappedComponent
            params={{ router: jest.fn() }}
            history={{ push: jest.fn() }}
        />);

        const instance = component.instance();
        instance.handleLogout();

        expect(component.state('currentUser')).toBe(null);

        localStorage.removeItem(CURRENT_USERNAME);
        AppUtils.getCurrentUser = originalGetCurrentUser;
    });

    it('should successfully call handleLogin', () => {
        const originalGetCurrentUser = AppUtils.getCurrentUser;
        AppUtils.getCurrentUser = () => Promise.resolve({});

        const component = shallow(<App.WrappedComponent
            params={{ router: jest.fn() }}
            history={{ push: jest.fn(), goBack: jest.fn() }}
        />);

        const instance = component.instance();
        instance.handleLogin();

        expect(toJson(component)).toMatchSnapshot();
        AppUtils.getCurrentUser = originalGetCurrentUser;
    });

});