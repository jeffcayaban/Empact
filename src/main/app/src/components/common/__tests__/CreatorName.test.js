import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import MockArgument from '../../../other/mock-data/MockArgument';
import CreatorName from "../CreatorName";

describe('CreatorName', () => {

    it('should render successfully', () => {
        const component = shallow(<CreatorName content={MockArgument} />);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render successfully with Anonymous', () => {
        MockArgument.isAnonymous = true;

        const component = shallow(<CreatorName content={MockArgument} />);
        expect(toJson(component)).toMatchSnapshot();
    });

});
