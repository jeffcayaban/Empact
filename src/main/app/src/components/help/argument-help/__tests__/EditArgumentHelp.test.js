import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import EditArgumentHelp from "../EditArgumentHelp";

describe('EditArgumentHelp', () => {

    it('should render successfully', () => {
        const component = shallow(<EditArgumentHelp />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
