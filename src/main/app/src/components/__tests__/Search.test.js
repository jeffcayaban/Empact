import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import Search from "../Search";

import * as AppUtils from '../../utils/AppUtils';
import MockPetitions from '../../other/mock-data/MockGetPetitionsResponse';

describe('Search', () => {
    it('should render successfully', () => {
        const component = shallow(<Search />);
        component.setState({
            petitions: MockPetitions.content,
            page: MockPetitions.page,
            totalNoOfResults: MockPetitions.totalElements
        });

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render a loader', () => {
        const component = shallow(<Search />);
        component.setState({ isLoading: true });
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should successfully call fetchPetitions', () => {
        const originalSearchPetitions = AppUtils.searchPetitions;
        AppUtils.searchPetitions = () => Promise.resolve(MockPetitions);

        const component = shallow(<Search />);
        const instance = component.instance();

        instance.fetchPetitions(1, "asc");

        expect(toJson(component)).toMatchSnapshot();
        AppUtils.searchPetitions = originalSearchPetitions;
    });

    it('should successfully handle fetchPetitions failing', () => {
        const originalSearchPetitions = AppUtils.searchPetitions;
        AppUtils.searchPetitions = () => Promise.reject();

        const component = shallow(<Search />);
        const instance = component.instance();

        instance.fetchPetitions(1, "asc");

        expect(toJson(component)).toMatchSnapshot();
        AppUtils.searchPetitions = originalSearchPetitions;
    });

    it('should successfully call handleChangeSortBy', () => {
        const component = shallow(<Search />);
        const instance = component.instance();
        instance.handleChangeSortBy("2");
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should successfully call handleSubmit', () => {
        const originalSearchPetitions = AppUtils.searchPetitions;
        AppUtils.searchPetitions = () => Promise.reject();

        const component = shallow(<Search />);
        const instance = component.instance();

        instance.handleSubmit({ preventDefault: jest.fn() });

        expect(toJson(component)).toMatchSnapshot();
        AppUtils.searchPetitions = originalSearchPetitions;
    });

    it('should successfully call updateQuery', () => {
        const component = shallow(<Search />);
        const instance = component.instance();
        instance.updateQuery({ target: { value: 'testValue' } });
        expect(component.state('query')).toBe('testValue');
    });

    it('should successfully call updateOnClosed', () => {
        const component = shallow(<Search />);
        const oldShowClosedValue = component.state('showClosed');
        const instance = component.instance();
        instance.updateOnClosed();
        expect(component.state('showClosed')).not.toBe(oldShowClosedValue);
    });
});