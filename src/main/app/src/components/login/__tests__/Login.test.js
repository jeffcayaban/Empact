import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import Login from "../Login";

describe('Login', () => {

    it('should render successfully', () => {
        const component = shallow(<Login onLogin={jest.fn()} />);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should call handleUsernameChange successfully', () => {
        const component = shallow(<Login onLogin={jest.fn()} />);
        const instance = component.instance();

        instance.handleUsernameChange({ target: { value: 'testValue' } });
        expect(component.state('username')).toBe('testValue');
    });

    it('should call handlePasswordChange successfully', () => {
        const component = shallow(<Login onLogin={jest.fn()} />);
        const instance = component.instance();

        instance.handlePasswordChange({ target: { value: 'testValue' } });
        expect(component.state('password')).toBe('testValue');
    });
});
