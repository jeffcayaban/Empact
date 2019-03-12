import React from 'react';
import * as AppUtils from "../../../../utils/AppUtils";
import MockResponse from "../../../../other/mock-data/MockGetPetitionsResponse";
import {shallow} from "enzyme";
import toJson from "enzyme-to-json";
import UserPetitions from "../UserPetitions";

function createUserPetitions(props = {}) {
    return <UserPetitions {...props} />
}

describe('UserPetitions', () => {

    it('should render correctly given invalid inputs', () => {

        const originalGetUserPetitions = AppUtils.getUserPetitions;
        AppUtils.getUserPetitions = () => Promise.resolve(MockResponse);

        const component = shallow(createUserPetitions());
        expect(toJson(component)).toMatchSnapshot();

        AppUtils.getUserPetitions = originalGetUserPetitions;
    });

    it('should render correctly with the fetched petitions', () => {

        const originalGetUserPetitions = AppUtils.getUserPetitions;
        AppUtils.getUserPetitions = () => Promise.resolve(MockResponse);

        const props = { isUser: true, username: 'testUsername' };
        const component = shallow(createUserPetitions(props));
        expect(toJson(component)).toMatchSnapshot();

        AppUtils.getUserPetitions = originalGetUserPetitions;
    });

    it('should render correctly with the arguments being failed to be fetched', () => {

        const originalGetUserPetitions = AppUtils.getUserPetitions;
        AppUtils.getUserPetitions = () => Promise.reject();

        const props = { isUser: true, username: 'testUsername' };
        const component = shallow(createUserPetitions(props));
        expect(toJson(component)).toMatchSnapshot();

        AppUtils.getUserPetitions = originalGetUserPetitions;
    });

    it('should render correctly given the most discussed petitions are failed to be fetched', () => {

        const originalGetMostDiscussedPetitions = AppUtils.getMostDiscussedPetitionsByUser;
        AppUtils.getMostDiscussedPetitionsByUser = () => Promise.reject();

        const props = { isUser: true, username: 'testUsername' };
        const component = shallow(createUserPetitions(props));
        const instance = component.instance();

        instance.loadUserPetitions(0, 0, true,false);

        expect(toJson(component)).toMatchSnapshot();

        AppUtils.getMostDiscussedPetitionsByUser = originalGetMostDiscussedPetitions;
    });

    it('should display new petitions when requested to be sorted by oldest', () => {

        const originalGetMostDiscussedPetitions = AppUtils.getMostDiscussedPetitionsByUser;
        const originalGetUserPetitions = AppUtils.getUserPetitions;

        AppUtils.getUserPetitions = () => Promise.resolve(MockResponse);
        AppUtils.getMostDiscussedPetitionsByUser = () => Promise.resolve(MockResponse);

        const props = { isUser: true, username: 'testUsername' };
        const component = shallow(createUserPetitions(props));
        const instance = component.instance();

        instance.handleChangeSortBy("2");

        expect(toJson(component)).toMatchSnapshot();

        AppUtils.getMostDiscussedPetitionsByUser = originalGetMostDiscussedPetitions;
        AppUtils.getUserPetitions = originalGetUserPetitions;
    });

    it('should display new petitions when requested to be sorted by most discussed', () => {

        const originalGetMostDiscussedPetitions = AppUtils.getMostDiscussedPetitionsByUser;
        const originalGetUserPetitions = AppUtils.getUserPetitions;

        AppUtils.getUserPetitions = () => Promise.resolve(MockResponse);
        AppUtils.getMostDiscussedPetitionsByUser = () => Promise.resolve(MockResponse);

        const props = { isUser: true, username: 'testUsername' };
        const component = shallow(createUserPetitions(props));
        const instance = component.instance();

        instance.handleChangeSortBy("3");

        expect(toJson(component)).toMatchSnapshot();

        AppUtils.getMostDiscussedPetitionsByUser = originalGetMostDiscussedPetitions;
        AppUtils.getUserPetitions = originalGetUserPetitions;
    });

    it('should display new petitions when requested to be sorted by least discussed', () => {

        const originalGetMostDiscussedPetitions = AppUtils.getMostDiscussedPetitionsByUser;
        const originalGetUserPetitions = AppUtils.getUserPetitions;

        AppUtils.getUserPetitions = () => Promise.resolve(MockResponse);
        AppUtils.getMostDiscussedPetitionsByUser = () => Promise.resolve(MockResponse);

        const props = { isUser: true, username: 'testUsername' };
        const component = shallow(createUserPetitions(props));
        const instance = component.instance();

        instance.handleChangeSortBy("4");

        expect(toJson(component)).toMatchSnapshot();

        AppUtils.getMostDiscussedPetitionsByUser = originalGetMostDiscussedPetitions;
        AppUtils.getUserPetitions = originalGetUserPetitions;
    });
});
