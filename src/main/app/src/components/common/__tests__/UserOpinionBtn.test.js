import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import UserOpinionBtn from "../UserOpinionBtn";

describe('UserOpinionBtn', () => {

    it('should render successfully', () => {
        const component = shallow(<UserOpinionBtn
            showOptions={jest.fn()}
            showArgTemplates={jest.fn()}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });
});
