import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import NoContentAlert from "../NoContentAlert";
import {ARGUMENT, PETITION} from "../../../../constants";

describe('NoContentAlert', () => {

    it('should render successfully for petition', () => {
        const component = shallow(<NoContentAlert contentType={PETITION} />);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render successfully for argument', () => {
        const component = shallow(<NoContentAlert contentType={ARGUMENT} />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
