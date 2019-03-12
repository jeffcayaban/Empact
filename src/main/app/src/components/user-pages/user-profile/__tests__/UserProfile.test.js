import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import UserProfile from "../UserProfile";
import * as AppUtils from "../../../../utils/AppUtils";
import MockResponse from "../../../../other/mock-data/MockGetUserProfileResponse";

describe('UserProfile', () => {

    it('should render correctly given fetches are successful', () => {
        const originalGetUserProfile = AppUtils.getUserProfile;
        AppUtils.getUserProfile = () => Promise.resolve(MockResponse);

        const props = {
            match: {
                params: {
                    username: 'testUsername'
                }
            },
            currentUser: {
                username: 'testUsername'
            }
        };

        const component = shallow(<UserProfile {...props} />);
        expect(toJson(component)).toMatchSnapshot();

        AppUtils.getUserProfile = originalGetUserProfile;
    });

    it('should render correctly given fetches are unsuccessful', () => {
        const originalGetUserProfile = AppUtils.getUserProfile;
        AppUtils.getUserProfile = () => Promise.reject();

        const props = {
            match: {
                params: {
                    username: 'testUsername'
                }
            },
            currentUser: {
                username: 'testUsername'
            }
        };

        const component = shallow(<UserProfile {...props} />);
        expect(toJson(component)).toMatchSnapshot();

        AppUtils.getUserProfile = originalGetUserProfile;
    });
});
