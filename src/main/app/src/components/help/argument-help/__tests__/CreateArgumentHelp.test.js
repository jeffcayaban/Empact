import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import CreateArgumentHelp from "../CreateArgumentHelp";

describe('CreateArgumentHelp', () => {

    it('should render successfully', () => {
        const component = shallow(<CreateArgumentHelp />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
