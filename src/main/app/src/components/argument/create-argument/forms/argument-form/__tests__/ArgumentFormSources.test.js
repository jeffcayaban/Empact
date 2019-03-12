import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import ArgumentFormSources from "../ArgumentFormSources";

describe('ArgumentFormSources', () => {

    it('should render successfully', () => {
        const component = shallow(
            <ArgumentFormSources
                sources={[ "testSource1" ]}
                handleChangeSource={jest.fn()}
            />
        );

        expect(toJson(component)).toMatchSnapshot();
    });
});
