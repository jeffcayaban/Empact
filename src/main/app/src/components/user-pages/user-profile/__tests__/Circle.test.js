import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import Circle from "../Circle";

describe('Circle', () => {

    it('should render correctly', () => {
        const component = shallow(<Circle />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
