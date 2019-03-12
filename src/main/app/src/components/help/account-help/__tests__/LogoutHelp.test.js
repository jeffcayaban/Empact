import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import LogoutHelp from "../LogoutHelp";

describe('LogoutHelp', () => {

    it('should render successfully', () => {
        const component = shallow(<LogoutHelp />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
