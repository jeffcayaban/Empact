import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import ArgumentAgree from "../ArgumentAgree";
import {CURRENT_USERNAME} from "../../../../../constants";
import * as AppUtils from "../../../../../utils/AppUtils";

import MockArgument from '../../../../../other/mock-data/MockArgument';

describe('ArgumentAgree', () => {

    it('should render a loader', () => {
        const component = shallow(
            <ArgumentAgree match={{ params: { id: 'testId' } }} />
        );

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render a content retrieval alert', () => {
        const component = shallow(<ArgumentAgree match={{ params: { id: 'testId' } }} />);
        component.setState({ argument: null, isRootPetitionClosed: false, isLoading: false });
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should successfully render the page', () => {
        const originalIsPetitionClosed = AppUtils.isPetitionClosed;
        const originalGetArgumentById = AppUtils.getArgumentById;

        AppUtils.isPetitionClosed = () => Promise.resolve(true);
        AppUtils.getArgumentById = () => Promise.resolve(MockArgument);
        localStorage.setItem(CURRENT_USERNAME, "test");

        const component = shallow(<ArgumentAgree match={{ params: { id: 'testId' } }} />);
        component.setState({ argument: MockArgument, isRootPetitionClosed: false, isLoading: false });

        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME);
        AppUtils.isPetitionClosed = originalIsPetitionClosed;
        AppUtils.getArgumentById = originalGetArgumentById;
    });

    it('should display an error if the getArgumentById call fails', () => {
        const originalIsPetitionClosed = AppUtils.isPetitionClosed;
        const originalGetArgumentById = AppUtils.getArgumentById;

        AppUtils.isPetitionClosed = () => Promise.resolve(true);
        AppUtils.getArgumentById = () => Promise.reject();
        localStorage.setItem(CURRENT_USERNAME, "test");

        const component = shallow(<ArgumentAgree match={{ params: { id: 'testId' } }} />);
        component.setState({ argument: MockArgument, isRootPetitionClosed: false, isLoading: false });

        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME);
        AppUtils.isPetitionClosed = originalIsPetitionClosed;
        AppUtils.getArgumentById = originalGetArgumentById;
    });

    it('should render a redirect to the login page', () => {
        const originalIsPetitionClosed = AppUtils.isPetitionClosed;
        AppUtils.isPetitionClosed = () => Promise.resolve(true);

        const component = shallow(<ArgumentAgree match={{ params: { id: 'testId' } }} />);
        component.setState({ argument: MockArgument, isRootPetitionClosed: false, isLoading: false });

        expect(toJson(component)).toMatchSnapshot();
        AppUtils.isPetitionClosed = originalIsPetitionClosed;
    });

    it('should render an unable to create argument alert', () => {
        const originalIsPetitionClosed = AppUtils.isPetitionClosed;
        AppUtils.isPetitionClosed = () => Promise.resolve(false);

        localStorage.setItem(CURRENT_USERNAME, "test");

        const component = shallow(<ArgumentAgree match={{ params: { id: 'testId' } }}  />);
        component.setState({ argument: MockArgument, isRootPetitionClosed: true, isLoading: false });

        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME);

        AppUtils.isPetitionClosed = originalIsPetitionClosed;
    });
});
