import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import Help from "../Help";

describe('Help', () => {

    it('should render successfully', () => {
        const component = shallow(<Help />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
