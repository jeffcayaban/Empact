import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import * as AppUtils from '../../../utils/AppUtils';
import * as Helpers from '../../../utils/Helpers';

import Register from "../Register";
import {PASSWORD_ID} from "../../../constants";

describe('Register', () => {

    it('should render successfully', () => {
        const component = shallow(<Register />);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should successfully call generateUserDetailForm', () => {
        const component = shallow(<Register />);
        const instance = component.instance();
        instance.generateUserDetailForm();

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should successfully call checkUsernameAvailability if the username is available', () => {
        const originalCheckUsernameAvailability = AppUtils.checkUsernameAvailability;
        AppUtils.checkUsernameAvailability = () => Promise.resolve({ available: true });

        const component = shallow(<Register />);
        const instance = component.instance();
        instance.checkUsernameAvailability({ preventDefault: jest.fn() });

        expect(toJson(component)).toMatchSnapshot();

        AppUtils.checkUsernameAvailability = originalCheckUsernameAvailability;
    });

    it('should successfully call checkUsernameAvailability if the username is unavailable', () => {
        const originalCheckUsernameAvailability = AppUtils.checkUsernameAvailability;
        AppUtils.checkUsernameAvailability = () => Promise.resolve({ available: false });

        const component = shallow(<Register />);
        const instance = component.instance();
        instance.checkUsernameAvailability({ preventDefault: jest.fn() });

        expect(toJson(component)).toMatchSnapshot();

        AppUtils.checkUsernameAvailability = originalCheckUsernameAvailability;
    });

    it('should successfully call checkUsernameAvailability if the api fails', () => {
        const originalCheckUsernameAvailability = AppUtils.checkUsernameAvailability;
        AppUtils.checkUsernameAvailability = () => Promise.reject();

        const component = shallow(<Register />);
        const instance = component.instance();
        instance.checkUsernameAvailability({ preventDefault: jest.fn() });

        expect(toJson(component)).toMatchSnapshot();

        AppUtils.checkUsernameAvailability = originalCheckUsernameAvailability;
    });

    it('should successfully call handleSignIn', () => {
        const originalSendLoginRequest = Helpers.sendLoginRequest;
        Helpers.sendLoginRequest = jest.fn();

        const component = shallow(<Register />);
        const instance = component.instance();
        instance.handleSignIn();

        expect(Helpers.sendLoginRequest).toBeCalled();

        Helpers.sendLoginRequest = originalSendLoginRequest;
    });

    it('should successfully call onSubmit', () => {
        const originalSignup = AppUtils.signup;
        AppUtils.signup = () => Promise.resolve({ value: true });

        const component = shallow(<Register />);
        const instance = component.instance();
        instance.onSubmit("testData");

        expect(toJson(component)).toMatchSnapshot();

        AppUtils.signup = originalSignup;
    });

    it('should generate an error if signup fails', () => {
        const originalSignup = AppUtils.signup;
        AppUtils.signup = () => Promise.reject();

        const component = shallow(<Register />);
        const instance = component.instance();
        instance.onSubmit("testData");

        expect(toJson(component)).toMatchSnapshot();

        AppUtils.signup = originalSignup;
    });

    it('should successfully call handleSubmit', () => {
        const component = shallow(<Register />);
        component.setState({ formFields: {
                PASSWORD_ID: 'test',
                CONFIRM_PASSWORD_ID: 'test'
            }});

        const instance = component.instance();

        instance.handleSubmit({ preventDefault: jest.fn() });

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should successfully call handleChange', () => {
        const component = shallow(<Register />);
        component.setState({ formFields: { PASSWORD_ID: 'test' }, formValidationStates: { PASSWORD_ID: 'test'}});

        const instance = component.instance();
        instance.handleChange(PASSWORD_ID, { target: { value: 'testValue' }});

        expect(component.state('formFields')[PASSWORD_ID]).toBe('testValue');
    });

    it('should successfully call onChangeUsername', () => {
        const component = shallow(<Register />);
        const instance = component.instance();
        instance.onChangeUsername();
        expect(component.state('isUsernameChosen')).toBe(false);
    });
});
