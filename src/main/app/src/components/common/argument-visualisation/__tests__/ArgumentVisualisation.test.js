import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import ArgumentVisualisation from "../ArgumentVisualisation";

describe('ArgumentVisualisation', () => {

    it('should render successfully', () => {
        const component = shallow(<ArgumentVisualisation
            contentId={"testId"}
            isPetition={true}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should successfully call handleShowArgumentOverview', () => {
        const component = shallow(<ArgumentVisualisation
            contentId={"testId"}
            isPetition={true}
        />);

        const oldShowArgumentOverviewValue = component.state('showArgumentOverview');

        const instance = component.instance();
        instance.handleShowArgumentOverview();

        expect(component.state('showArgumentOverview')).not.toBe(oldShowArgumentOverviewValue);
    });

    it('should successfully call handleShowArgumentOverviewKey', () => {
        const component = shallow(<ArgumentVisualisation
            contentId={"testId"}
            isPetition={true}
        />);

        const oldShowArgumentOverviewKey = component.state('showArgumentOverviewKey');

        const instance = component.instance();
        instance.handleShowArgumentOverviewKey();

        expect(component.state('showArgumentOverviewKey')).not.toBe(oldShowArgumentOverviewKey);
    });
});
