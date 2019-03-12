import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import RegisterFormField from "../RegisterFormField";

describe('RegisterFormField', () => {

    it('should render successfully', () => {
        const component = shallow(<RegisterFormField
            id={"testId"}
            handleChange={jest.fn()}
            name={"testName"}
            type={"text"}
            placeholder={"testPlaceholder"}
            maxLength={100}
            minLength={10}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });
});
