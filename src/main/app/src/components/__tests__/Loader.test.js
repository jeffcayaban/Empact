import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import Loader from "../Loader";

describe('Loader', () => {
    it('should render correctly', () => {
        const component = shallow(<Loader />);
        expect(toJson(component)).toMatchSnapshot();
    });
});