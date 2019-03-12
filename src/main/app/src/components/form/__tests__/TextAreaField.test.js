import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import TextAreaField from "../TextAreaField";

describe('TextAreaField', () => {

    it('should render successfully', () => {
        const component = shallow(<TextAreaField id={"testId"} label={"testLabel"} maxLength={50} />);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render successfully', () => {
        const component = shallow(<TextAreaField
            id={"testId"}
            label={"testLabel"}
            maxLength={50}
            validationState={"error"}
        />);
        expect(toJson(component)).toMatchSnapshot();
    });
});