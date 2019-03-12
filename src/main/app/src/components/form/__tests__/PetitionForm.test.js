import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import MockPetition from '../../../other/mock-data/MockGetPetitionsResponse';
import PetitionForm from "../PetitionForm";
import {
    PETITION_CLOSING_DATE_ID,
    PETITION_IS_ANONYMOUS_ID,
    PETITION_SITUATION_ID,
    PETITION_TITLE_ID
} from "../../../constants";

describe('PetitionForm', () => {

    Date.now = jest.fn(() => 1489246534000);    // 11-03-2017

    it('should render successfully', () => {
        const component = shallow(<PetitionForm
            onSubmit={jest.fn()}
            onCancel={jest.fn()}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render successfully given the context of modification', () => {
        const component = shallow(<PetitionForm
            onSubmit={jest.fn()}
            onCancel={jest.fn()}
            petition={MockPetition.content}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should successfully call handleSubmit', () => {
        const mockOnSubmit = jest.fn();

        const component = shallow(<PetitionForm
            onSubmit={mockOnSubmit}
            onCancel={jest.fn()}
            petition={MockPetition.content}
        />);

        const instance = component.instance();
        instance.handleSubmit({ preventDefault: jest.fn() });

        expect(mockOnSubmit).toBeCalled();
    });

    it('should successfully call handleChange for the petition title field', () => {
        const value = 'test';
        const mockEvent = { target: { value: value } };

        const component = shallow(<PetitionForm
            onSubmit={jest.fn()}
            onCancel={jest.fn()}
            petition={MockPetition.content}
        />);

        const instance = component.instance();
        instance.handleChange(PETITION_TITLE_ID, mockEvent);
        expect(component.state('titleLength')).toBe(value.length);
    });

    it('should successfully call handleChange for other fields', () => {
        const value = '';
        const mockEvent = { target: { value: value } };

        const component = shallow(<PetitionForm
            onSubmit={jest.fn()}
            onCancel={jest.fn()}
            petition={MockPetition.content}
        />);

        const instance = component.instance();
        instance.handleChange(PETITION_SITUATION_ID, mockEvent);
        expect(component.state('formValidationStates')[PETITION_SITUATION_ID]).toBe('error');
    });

    it('should successfully call handleDateChange', () => {
        const testDate = 1551813447;

        const component = shallow(<PetitionForm
            onSubmit={jest.fn()}
            onCancel={jest.fn()}
            petition={MockPetition.content}
        />);

        const instance = component.instance();
        instance.handleDateChange(testDate);
        expect(component.state('formValidationStates')[PETITION_CLOSING_DATE_ID]).toBe(testDate);
        expect(component.state('formValidationStates')[PETITION_CLOSING_DATE_ID]).not.toBe("error");
    });

    it('should successfully call handleAnonymityChange', () => {
        const component = shallow(<PetitionForm
            onSubmit={jest.fn()}
            onCancel={jest.fn()}
            petition={MockPetition.content}
        />);

        const instance = component.instance();
        instance.handleAnonymityChange();
        expect(component.state('formFields')[PETITION_IS_ANONYMOUS_ID]).toBe(true);
    });
});