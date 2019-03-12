import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import ArgumentHorizontalList from "../ArgumentHorizontalList";

import MockArgument from '../../../../other/mock-data/MockArgument';

describe('ArgumentHorizontalList', () => {

    it('should render successfully', () => {
        const component = shallow(<ArgumentHorizontalList userArguments={[MockArgument]} />);
        expect(toJson(component)).toMatchSnapshot();
    });

});
