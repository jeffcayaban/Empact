import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import TopContent from "../TopContent";

import MockPetitionResponse from '../../../other/mock-data/MockGetPetitionsResponse.js';
import MockArgumentResponse from '../../../other/mock-data/MockGetArgumentsResponse.js';

import {ARGUMENT, PETITION} from "../../../constants";

describe('TopContent', () => {

    it('should render petitions correctly', () => {
        const props = {
            mostDiscussedContent: MockPetitionResponse.content,
            contentMapFn: jest.fn(),
            contentType: PETITION
        };

        const component = shallow(<TopContent {...props} />);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render arguments correctly', () => {
        const props = {
            mostDiscussedContent: MockArgumentResponse.content,
            contentMapFn: jest.fn(),
            contentType: ARGUMENT
        };

        const component = shallow(<TopContent {...props} />);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render arguments correctly', () => {
        const props = {
            mostDiscussedContent: MockArgumentResponse.content,
            contentMapFn: jest.fn(),
            contentType: ARGUMENT
        };

        const component = shallow(<TopContent {...props} />);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render correctly when there are no content to display', () => {
        const props = {
            mostDiscussedContent: [],
            contentMapFn: jest.fn(),
            contentType: ARGUMENT
        };

        const component = shallow(<TopContent {...props} />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
