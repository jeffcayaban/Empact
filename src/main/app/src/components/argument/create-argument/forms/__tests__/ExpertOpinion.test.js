import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import ExpertOpinion from "../ExpertOpinion";

import MockArgument from '../../../../../other/mock-data/MockArgument.js';
import * as Helpers from "../../../../../utils/Helpers";

describe('ExpertOpinion', () => {

    it('should render successfully', () => {
        const component = shallow(<ExpertOpinion argument={MockArgument} />);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should successfully call handleSubmit', () => {
        const originalHandleArgumentSubmit = Helpers.handleArgumentSubmit;
        Helpers.handleArgumentSubmit = jest.fn();

        const component = shallow(<ExpertOpinion
            argument={MockArgument}
            isForEdit={false}
            sources={[ "testSource1" ]}
        />);

        const instance = component.instance();

        instance.handleSubmit({ preventDefault: jest.fn() });

        expect(Helpers.handleArgumentSubmit).toBeCalled();

        Helpers.handleArgumentSubmit = originalHandleArgumentSubmit;
    });

    it('should successfully call createEditArgRequest', () => {
        const component = shallow(<ExpertOpinion
            argument={MockArgument}
            isForEdit={true}
            sources={[ "testSource1" ]}
        />);

        const editArgRequest = component.instance().createEditArgRequest();

        expect(editArgRequest.id).toBe(MockArgument.id);
        expect(editArgRequest.expert).toBe(MockArgument.expert);
        expect(editArgRequest.expertDomain).toBe(MockArgument.expertDomain);
        expect(editArgRequest.expertAssertion).toBe(MockArgument.expertAssertion);
        expect(editArgRequest.sources).toEqual(MockArgument.sources);
        expect(editArgRequest.isAnonymous).toBe(MockArgument.isAnonymous);

    });

    it('should successfully call handleChangeAnonymity', () => {
        const component = shallow(<ExpertOpinion argument={MockArgument} />);

        const oldIsAnonymousValue = component.state('isAnonymous');
        component.instance().handleChangeAnonymity();
        const newIsAnonymousValue = component.state('isAnonymous');

        expect(oldIsAnonymousValue).not.toBe(newIsAnonymousValue);
    });

    it('should successfully call handleChangeSource', () => {
        const component = shallow(<ExpertOpinion argument={MockArgument} />);

        const newSource = 'testSourceNew';
        const event = { target: { value: newSource } };

        const oldSources = component.state('sources')[0];
        component.instance().handleChangeSource(0, event);
        const newSources = component.state('sources')[0];

        expect(oldSources).not.toBe(newSources);
        expect(newSources).toBe(newSource);
    });

    it('should successfully call handleRemoveSource', () => {
        const component = shallow(<ExpertOpinion argument={MockArgument} />);
        component.setState({ sources: ['testSource1', 'testSource2'] });
        component.instance().handleRemoveSource();
        expect(component.state('sources').length).toBe(1);
    });

    it('should successfully call handleAddSource', () => {
        const component = shallow(<ExpertOpinion argument={MockArgument} />);
        component.setState({ sources: ['testSource1'] });
        component.instance().handleAddSource();
        expect(component.state('sources').length).toBe(2);
    });
});
