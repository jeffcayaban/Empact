import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import PetitionContentProperty from "../PetitionContentProperty";

describe('PetitionContentProperty', () => {

    it('should render successfully', () => {
        const component = shallow(<PetitionContentProperty
            text={"testText"}
            labelText={"testLabelText"}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });
});
