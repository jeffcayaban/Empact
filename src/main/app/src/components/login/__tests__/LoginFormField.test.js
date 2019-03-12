import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import LoginFormField from "../LoginFormField";

describe('LoginFormField', () => {

    it('should render successfully', () => {
        const component = shallow(<LoginFormField
            name={"testName"}
            type={"text"}
            onChange={jest.fn()}
            fieldValue={"testFieldValue"}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });
});
