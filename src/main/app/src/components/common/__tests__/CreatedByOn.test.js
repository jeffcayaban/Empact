import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import MockArgument from '../../../other/mock-data/MockArgument';
import CreatedByOn from "../CreatedByOn";

describe('CreatedByOn', () => {

    it('should render successfully', () => {
        const component = shallow(<CreatedByOn
            content={MockArgument}
            date={"testDate"}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });

});
