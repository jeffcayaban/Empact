import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import HomeHeader from "../HomeHeader";

describe('HomeHeader', () => {

    it('should render correctly', () => {
        const component = shallow(<HomeHeader />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
