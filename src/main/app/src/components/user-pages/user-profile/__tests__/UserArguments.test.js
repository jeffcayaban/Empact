import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import UserArguments from "../UserArguments";
import * as AppUtils from "../../../../utils/AppUtils";
import MockResponse from '../../../../other/mock-data/MockGetArgumentsResponse.js';

function createUserArguments(props = {}) {
    return <UserArguments {...props} />
}

describe('UserArguments', () => {

    it('should render correctly given invalid inputs', () => {

        const originalGetUserArguments = AppUtils.getUserArguments;
        AppUtils.getUserArguments = () => Promise.resolve(MockResponse);

        const component = shallow(createUserArguments());
        expect(toJson(component)).toMatchSnapshot();

        AppUtils.getUserArguments = originalGetUserArguments;
    });

    it('should render correctly with the fetched arguments', () => {

        const originalGetUserArguments = AppUtils.getUserArguments;
        AppUtils.getUserArguments = () => Promise.resolve(MockResponse);

        const props = { isUser: true, username: 'testUsername' };
        const component = shallow(createUserArguments(props));
        expect(toJson(component)).toMatchSnapshot();

        AppUtils.getUserArguments = originalGetUserArguments;
    });

    it('should render correctly with the arguments being failed to be fetched', () => {

        const originalGetUserArguments = AppUtils.getUserArguments;
        AppUtils.getUserArguments = () => Promise.reject();

        const props = { isUser: true, username: 'testUsername' };
        const component = shallow(createUserArguments(props));
        expect(toJson(component)).toMatchSnapshot();

        AppUtils.getUserArguments = originalGetUserArguments;
    });

    it('should render correctly given the most discussed arguments are failed to be fetched', () => {

        const originalGetMostDiscussedArgs = AppUtils.getMostDiscussedArgumentsForUser;
        AppUtils.getMostDiscussedArgumentsForUser = () => Promise.reject();

        const props = { isUser: true, username: 'testUsername' };
        const component = shallow(createUserArguments(props));
        const instance = component.instance();

        instance.loadUserArguments(0, 0, "desc", false, false, true);

        expect(toJson(component)).toMatchSnapshot();

        AppUtils.getMostDiscussedArgumentsForUser = originalGetMostDiscussedArgs;
    });

    it('should display new arguments when requested to be sorted by oldest', () => {

        const originalGetMostDiscussedArgs = AppUtils.getMostDiscussedArgumentsForUser;
        const originalGetUserArguments = AppUtils.getUserArguments;

        AppUtils.getUserArguments = () => Promise.resolve(MockResponse);
        AppUtils.getMostDiscussedArgumentsForUser = () => Promise.resolve(MockResponse);

        const props = { isUser: true, username: 'testUsername' };
        const component = shallow(createUserArguments(props));
        const instance = component.instance();

        instance.handleChangeSortBy("2");

        expect(toJson(component)).toMatchSnapshot();

        AppUtils.getMostDiscussedArgumentsForUser = originalGetMostDiscussedArgs;
        AppUtils.getUserArguments = originalGetUserArguments;
    });

    it('should display new arguments when requested to be sorted by most discussed', () => {

        const originalGetMostDiscussedArgs = AppUtils.getMostDiscussedArgumentsForUser;
        const originalGetUserArguments = AppUtils.getUserArguments;

        AppUtils.getUserArguments = () => Promise.resolve(MockResponse);
        AppUtils.getMostDiscussedArgumentsForUser = () => Promise.resolve(MockResponse);

        const props = { isUser: true, username: 'testUsername' };
        const component = shallow(createUserArguments(props));
        const instance = component.instance();

        instance.handleChangeSortBy("3");

        expect(toJson(component)).toMatchSnapshot();

        AppUtils.getMostDiscussedArgumentsForUser = originalGetMostDiscussedArgs;
        AppUtils.getUserArguments = originalGetUserArguments;
    });

    it('should display new arguments when requested to be sorted by least discussed', () => {

        const originalGetMostDiscussedArgs = AppUtils.getMostDiscussedArgumentsForUser;
        const originalGetUserArguments = AppUtils.getUserArguments;

        AppUtils.getUserArguments = () => Promise.resolve(MockResponse);
        AppUtils.getMostDiscussedArgumentsForUser = () => Promise.resolve(MockResponse);

        const props = { isUser: true, username: 'testUsername' };
        const component = shallow(createUserArguments(props));
        const instance = component.instance();

        instance.handleChangeSortBy("4");

        expect(toJson(component)).toMatchSnapshot();

        AppUtils.getMostDiscussedArgumentsForUser = originalGetMostDiscussedArgs;
        AppUtils.getUserArguments = originalGetUserArguments;
    });

});
