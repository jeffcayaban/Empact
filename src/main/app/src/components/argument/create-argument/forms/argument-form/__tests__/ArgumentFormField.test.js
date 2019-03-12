import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import ArgumentFormField from "../ArgumentFormField";

describe('ArgumentFormField', () => {

    it('should render successfully', () => {
        const component = shallow(
            <ArgumentFormField
                id={"testId"}
                label={"testLabel"}
                maxLength={90}
                value={"testValue"}
            />
        );

        expect(toJson(component)).toMatchSnapshot();
    });
});
