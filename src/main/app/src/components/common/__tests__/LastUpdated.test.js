import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import LastUpdated from "../LastUpdated";

describe('LastUpdated', () => {

    it('should render successfully', () => {
        const component = shallow(<LastUpdated
            creationDateTime={1551903569}
            lastUpdatedDateTime={1551903565}
            showGoalPreview={jest.fn()}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render nothing', () => {
        const component = shallow(<LastUpdated
            creationDateTime={1551903565}
            lastUpdatedDateTime={1551903565}
            showGoalPreview={jest.fn()}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });

});
