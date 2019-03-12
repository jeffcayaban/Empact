import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import ClosedPetitionActions from "../ClosedPetitionActions";

describe('ClosedPetitionActions', () => {

    it('should render successfully', () => {
        const component = shallow(<ClosedPetitionActions />);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should successfully call handleDelete', () => {
        const component = shallow(<ClosedPetitionActions
            deletePetition={() => Promise.resolve()}
        />);

        const instance = component.instance();
        instance.handleDelete({ value: true }, () => Promise.resolve());
        expect(toJson(component)).toMatchSnapshot();
    });


});
