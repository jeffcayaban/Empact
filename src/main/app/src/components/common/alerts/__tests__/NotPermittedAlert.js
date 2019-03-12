import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import NoPetitionsAndExploreAlert from "../NoPetitionsAndExploreAlert";

describe('NoPetitionsAndExploreAlert', () => {

    it('should render successfully given a showFollowUp context', () => {
        const component = shallow(<NoPetitionsAndExploreAlert showFollowUp={true} />);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render successfully', () => {
        const component = shallow(<NoPetitionsAndExploreAlert showFollowUp={false} />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
