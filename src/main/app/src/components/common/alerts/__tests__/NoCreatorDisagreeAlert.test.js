import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import NoCreatorDisagreeAlert from "../NoCreatorDisagreeAlert";

describe('NoCreatorDisagreeAlert', () => {

    it('should render successfully', () => {
        const component = shallow(<NoCreatorDisagreeAlert />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
