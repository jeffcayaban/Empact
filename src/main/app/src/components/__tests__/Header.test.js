import React from 'react';
import {ROLE_ADMIN} from "../../constants";
import Header from "../Header";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

function createHeader(props = {}) {
    const mockRouter = jest.fn();
    return <Header.WrappedComponent {...props} params={{ router: mockRouter }} />;
}

describe('Header', () => {

    it('should render correctly when the user is logged in', () => {
        const props = { currentUser: { username: 'testUsername', authorities: [ROLE_ADMIN] } };
        const component = shallow(createHeader(props));
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render correctly when the user is not logged in', () => {
        const component = shallow(createHeader());
        expect(toJson(component)).toMatchSnapshot();
    });
});