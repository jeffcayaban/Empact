import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import ExpertiseCQ from "../ExpertiseCQ";
import {ARGUMENTATION_SCHEMES } from "../../../../../../constants";

import MockArgument from '../../../../../../other/mock-data/MockArgument';

describe('ExpertiseCQ', () => {

    it('should render correctly', () => {
        const component = shallow(<ExpertiseCQ argument={MockArgument} isSupporting={true} />);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should call handleShowArgumentOptions', () => {
        const component = shallow(<ExpertiseCQ argument={MockArgument} isSupporting={true} />);
        const instance = component.instance();

        const oldShowOptionsValue = component.state().showOptions;
        instance.handleShowArgumentOptions();
        const newShowOptionsValue = component.state().showOptions;

        expect(newShowOptionsValue).not.toBe(oldShowOptionsValue);
        expect(newShowOptionsValue).toBe(true)
    });

    it('should call onOptionSelect', () => {
        const component = shallow(<ExpertiseCQ argument={MockArgument} isSupporting={true} />);
        const instance = component.instance();
        instance.onOptionSelect(0);
        const newSelectedArgValue = component.state().selectedArgScheme;
        expect(newSelectedArgValue).toBe(ARGUMENTATION_SCHEMES[0])
    });
});
