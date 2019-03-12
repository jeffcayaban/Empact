import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import {ARGUMENTATION_SCHEMES } from "../../../../../../constants";
import AcceptedCQ from "../AcceptedCQ";

import MockArgument from '../../../../../../other/mock-data/MockArgument';

describe('AcceptedCQ', () => {

    it('should render correctly', () => {
        const component = shallow(<AcceptedCQ argument={MockArgument} isSupporting={true} />);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should call handleShowArgumentOptions', () => {
        const component = shallow(<AcceptedCQ argument={MockArgument} isSupporting={true} />);
        const instance = component.instance();

        const oldShowOptionsValue = component.state().showOptions;
        instance.handleShowArgumentOptions();
        const newShowOptionsValue = component.state().showOptions;

        expect(newShowOptionsValue).not.toBe(oldShowOptionsValue);
        expect(newShowOptionsValue).toBe(true)
    });

    it('should call onOptionSelect', () => {
        const component = shallow(<AcceptedCQ argument={MockArgument} isSupporting={true} />);
        const instance = component.instance();
        instance.onOptionSelect(0);
        const newSelectedArgValue = component.state().selectedArgScheme;
        expect(newSelectedArgValue).toBe(ARGUMENTATION_SCHEMES[0])
    });

    it('should call explanationBtnCallbackFn', () => {
        const component = shallow(<AcceptedCQ argument={MockArgument} isSupporting={true} />);
        const instance = component.instance();

        const oldShowExplanationValue = component.state().showExplanation;
        instance.explanationBtnCallbackFn();
        const newShowExplanationValue = component.state().showExplanation;

        expect(newShowExplanationValue).not.toBe(oldShowExplanationValue);
        expect(newShowExplanationValue).toBe(true)
    });
});
