import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import UnableToEditAlert from "../UnableToEditAlert";
import {PETITION} from "../../../../constants";

describe('UnableToEditAlert', () => {

    it('should render successfully', () => {
        const component = shallow(<UnableToEditAlert contentType={PETITION} />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
