import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import CreateArgumentOptions from "../CreateArgumentOptions";
import {ARGUMENTATION_SCHEMES} from "../../../../constants";

describe('CreateArgumentOptions', () => {

    it('should render successfully', () => {
        const component = shallow(<CreateArgumentOptions handleSelect={jest.fn()} />);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should correctly call handleOptionSelect', () => {
        const component = shallow(<CreateArgumentOptions handleSelect={jest.fn()} />);
        const instance = component.instance();

        instance.handleOptionSelect(0);
        expect(component.state('selectedOption')).toBe(ARGUMENTATION_SCHEMES[0]);
    });

});
