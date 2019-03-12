import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import ArgumentFormBase from "../ArgumentFormBase";

describe('ArgumentFormBase', () => {

    it('should render successfully', () => {
        const component = shallow(
            <ArgumentFormBase
                sources={["testSource1"]}
                handleAddSource={jest.fn()}
                handleRemoveSource={jest.fn()}
                isAnonymous={false}
                handleChangeSource={jest.fn()}
                handleChangeAnonymity={jest.fn()}
            />
        );

        expect(toJson(component)).toMatchSnapshot();
    });
});
