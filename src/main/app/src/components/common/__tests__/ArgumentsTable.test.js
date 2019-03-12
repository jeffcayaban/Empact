import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import MockArgument from '../../../other/mock-data/MockArgument';
import MockArguments from '../../../other/mock-data/MockGetArgumentsResponse';
import ArgumentsTable from "../ArgumentsTable";
import * as AppUtils from '../../../utils/AppUtils';

import {ARGUMENT, OLDEST, PETITION} from "../../../constants";

function createArgumentsTable(props = {}) {
    const mockRouter = jest.fn();
    return <ArgumentsTable.WrappedComponent {...props} params={{ router: mockRouter }} />;
}

describe('ArgumentsTable', () => {

    it('should render successfully for an argument whose parent is a petition', () => {
        const originalGetArgumentsByPetition = AppUtils.getArgumentsByRootPetitionId;
        AppUtils.getArgumentsByRootPetitionId = () => Promise.resolve(MockArguments);

        const props = {
            parentArgument: MockArgument,
            isSupporting: true,
            parentContentCreatorId: "testId",
            parentContentType: PETITION
        };

        const component = shallow(createArgumentsTable(props));
        component.setState({ argumentsList: MockArguments.content });

        expect(toJson(component)).toMatchSnapshot();
        AppUtils.getArgumentsByRootPetitionId = originalGetArgumentsByPetition;
    });

    it('should render successfully for the most discussed arguments whose parent is a petition', () => {
        const props = {
            parentArgument: MockArgument,
            isSupporting: true,
            parentContentCreatorId: "testId",
            parentContentType: PETITION
        };

        const component = shallow(createArgumentsTable(props));
        component.setState({ argumentsList: MockArguments.content });

        const instance = component.instance();
        instance.getArgumentsFromServer(0, 1, "asc", "testId", true, PETITION, true);

        expect(toJson(component)).toMatchSnapshot();
    });


    it('should render successfully for an argument whose parent is an argument', () => {
        const originalGetArgumentsByArgumentId = AppUtils.getArgumentsByArgumentId;
        AppUtils.getArgumentsByArgumentId = () => Promise.resolve(MockArguments);

        const props = {
            parentArgument: MockArgument,
            isSupporting: true,
            parentContentCreatorId: "testId",
            parentContentType: ARGUMENT
        };

        const component = shallow(createArgumentsTable(props));
        component.setState({ argumentsList: MockArguments.content });

        expect(toJson(component)).toMatchSnapshot();
        AppUtils.getArgumentsByArgumentId = originalGetArgumentsByArgumentId;
    });

    it('should render successfully for the most discussed arguments whose parent is an argument', () => {
        const props = {
            parentArgument: MockArgument,
            isSupporting: true,
            parentContentCreatorId: "testId",
            parentContentType: ARGUMENT
        };

        const component = shallow(createArgumentsTable(props));
        component.setState({ argumentsList: MockArguments.content });

        const instance = component.instance();
        instance.getArgumentsFromServer(0, 1, "asc", "testId", true, ARGUMENT, true);

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render successfully call handleChangeSortBy for Oldest', () => {
        const props = {
            parentArgument: MockArgument,
            isSupporting: true,
            parentContentCreatorId: "testId",
            parentContentType: ARGUMENT
        };

        const component = shallow(createArgumentsTable(props));
        component.setState({ argumentsList: MockArguments.content });

        const instance = component.instance();
        instance.handleChangeSortBy("2");

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render successfully call handleChangeSortBy for Most Discussed', () => {
        const props = {
            parentArgument: MockArgument,
            isSupporting: true,
            parentContentCreatorId: "testId",
            parentContentType: ARGUMENT
        };

        const component = shallow(createArgumentsTable(props));
        component.setState({ argumentsList: MockArguments.content });

        const instance = component.instance();
        instance.handleChangeSortBy("3");

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render successfully call handleChangeSortBy for Least Discussed', () => {
        const props = {
            parentArgument: MockArgument,
            isSupporting: true,
            parentContentCreatorId: "testId",
            parentContentType: ARGUMENT
        };

        const component = shallow(createArgumentsTable(props));
        component.setState({ argumentsList: MockArguments.content });

        const instance = component.instance();
        instance.handleChangeSortBy("4");

        expect(toJson(component)).toMatchSnapshot();
    });
});
