import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import ArgCounts from "../ArgCounts";

describe('ArgCounts', () => {

    it('should render successfully', () => {
        const component = shallow(<ArgCounts
            noOfForArguments={1}
            noOfAgainstArguments={1}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });
});
