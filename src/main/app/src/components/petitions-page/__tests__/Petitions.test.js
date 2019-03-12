import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import Petitions from "../Petitions";

describe('PetitionsTable', () => {

    it('should render successfully and get the most discussed petitions', () => {
        const component = shallow(<Petitions.WrappedComponent params={{ router: jest.fn() }} />);
        expect(toJson(component)).toMatchSnapshot();
    });

});
