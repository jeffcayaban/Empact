import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import MockArgument from '../../../../../other/mock-data/MockGetArgumentsResponse.js';
import PopularOpinion from "../PopularOpinion";
import * as Helpers from "../../../../../utils/Helpers";

describe('PopularOpinion', () => {

    const mockArgument = MockArgument.content;

    it('should render successfully', () => {
        const component = shallow(<PopularOpinion argument={mockArgument} />);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should successfully call handleSubmit', () => {
        const originalHandleArgumentSubmit = Helpers.handleArgumentSubmit;
        Helpers.handleArgumentSubmit = jest.fn();

        const component = shallow(<PopularOpinion
            argument={mockArgument}
            isForEdit={false}
            sources={[ "testSource1" ]}
        />);

        const instance = component.instance();

        instance.handleSubmit({ preventDefault: jest.fn() });

        expect(Helpers.handleArgumentSubmit).toBeCalled();

        Helpers.handleArgumentSubmit = originalHandleArgumentSubmit;
    });

    it('should successfully call createEditArgRequest', () => {
        const component = shallow(<PopularOpinion
            argument={mockArgument}
            isForEdit={true}
            sources={[ "testSource1" ]}
        />);

        const editArgRequest = component.instance().createEditArgRequest();

        expect(editArgRequest.id).toBe(mockArgument.id);
        expect(editArgRequest.sources).toBe(mockArgument.sources);
        expect(editArgRequest.isAnonymous).toBe(mockArgument.isAnonymous);
        expect(editArgRequest.explanation).toBe(mockArgument.explanation);

    });

    it('should successfully call handleChangeAnonymity', () => {
        const component = shallow(<PopularOpinion argument={mockArgument} />);

        const oldIsAnonymousValue = component.state('isAnonymous');
        component.instance().handleChangeAnonymity();
        const newIsAnonymousValue = component.state('isAnonymous');

        expect(oldIsAnonymousValue).not.toBe(newIsAnonymousValue);
    });

    it('should successfully call handleChangeSource', () => {
        const component = shallow(<PopularOpinion argument={mockArgument} />);
        component.setState({ sources: ['testSource'] });

        const newSource = 'testSourceNew';
        const event = { target: { value: newSource } };

        const oldSources = component.state('sources')[0];
        component.instance().handleChangeSource(0, event);
        const newSources = component.state('sources')[0];

        expect(oldSources).not.toBe(newSources);
        expect(newSources).toBe(newSource);
    });

    it('should successfully call handleRemoveSource', () => {
        const component = shallow(<PopularOpinion argument={mockArgument} />);
        component.setState({ sources: ['testSource1', 'testSource2'] });
        component.instance().handleRemoveSource();
        expect(component.state('sources').length).toBe(1);
    });

    it('should successfully call handleAddSource', () => {
        const component = shallow(<PopularOpinion argument={mockArgument} />);
        component.setState({ sources: ['testSource1'] });
        component.instance().handleAddSource();
        expect(component.state('sources').length).toBe(2);
    });

    it('should successfully call onExplanationChange', () => {
        const component = shallow(<PopularOpinion argument={mockArgument} />);
        const testExplanation = 'testExplanation';
        component.instance().onExplanationChange({ target: { value: testExplanation } });
        expect(component.state('userExplanation')).toBe(testExplanation);
    });
});
