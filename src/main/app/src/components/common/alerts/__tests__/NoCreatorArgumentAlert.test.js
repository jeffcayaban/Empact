import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import {PETITION} from "../../../../constants";
import NoCreatorArgumentAlert from "../NoCreatorArgumentAlert";

describe('NoCreatorArgumentAlert', () => {

    it('should render successfully', () => {
        const component = shallow(<NoCreatorArgumentAlert contentType={PETITION} />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
