import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import NotPermittedAlert from "../NotPermittedAlert";

describe('NotPermittedAlert', () => {

    it('should render successfully given a showFollowUp context', () => {
        const component = shallow(<NotPermittedAlert />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
