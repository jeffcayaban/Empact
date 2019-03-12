import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import MockArgument from '../../../other/mock-data/MockArgument';
import ArgumentSources from "../ArgumentSources";

describe('ArgumentSources', () => {

    it('should render successfully given the argument has no sources', () => {
        MockArgument.sources = [];
        const component = shallow(<ArgumentSources argument={MockArgument} />);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render successfully given the argument has sources', () => {
        MockArgument.sources = ["testSource"];
        const component = shallow(<ArgumentSources argument={MockArgument} />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
