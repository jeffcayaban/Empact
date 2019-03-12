import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import ClosedCheckbox from "../ClosedCheckbox";

describe('ClosedCheckbox', () => {

    it('should render successfully', () => {
        const component = shallow(<ClosedCheckbox onChange={jest.fn()} />);
        expect(toJson(component)).toMatchSnapshot();
    });

});
