import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import MockArgument from '../../../../other/mock-data/MockArgument';
import ArgumentListEntry from "../ArgumentListEntry";

describe('ArgumentListEntry', () => {

    it('should render successfully', () => {
        const mockLabels = ["testLabel1", "testLabel2"];

        const component = shallow(<ArgumentListEntry
            argument={[MockArgument]}
            labels={mockLabels}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });

});
