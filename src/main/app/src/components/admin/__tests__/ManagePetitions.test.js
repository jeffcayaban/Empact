import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import { ROLE_ADMIN } from "../../../constants";
import ManagePetitions from "../ManagePetitions";
import { CURRENT_USERNAME } from "../../../constants";
import * as AppUtils from "../../../utils/AppUtils";

describe('ManagePetitions', () => {

    it('should render correctly given the content type is User', () => {
        const currentUser = { authorities: [ROLE_ADMIN] };

        localStorage.setItem(CURRENT_USERNAME, "test");
        const component = shallow(<ManagePetitions
            isAuthenticated={true}
            currentUser={currentUser}
        />);

        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME);
    });

    it('should render an alert given the user is not logged in.', () => {
        const component = shallow(<ManagePetitions
            isAuthenticated={true}
            currentUser={null}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should correctly call handleClosingPetitionRequest', () => {
        const testId = 'testId';
        const currentUser = { authorities: [ROLE_ADMIN] };
        localStorage.setItem(CURRENT_USERNAME, "test");

        const component = shallow(<ManagePetitions
            isAuthenticated={true}
            currentUser={currentUser}
        />);

        const instance = component.instance();
        const mockEvent = { preventDefault: jest.fn() };

        instance.handleClosingPetitionRequest(mockEvent, testId);

        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME);
    });

    it('should correctly call handleDeletePetitionRequest', () => {
        const testId = 'testId';
        const currentUser = { authorities: [ROLE_ADMIN] };
        localStorage.setItem(CURRENT_USERNAME, "test");

        const component = shallow(<ManagePetitions
            isAuthenticated={true}
            currentUser={currentUser}
        />);

        const instance = component.instance();
        const mockEvent = { preventDefault: jest.fn() };

        instance.handleDeletePetitionRequest(mockEvent, testId);

        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME);
    });

    it('should correctly call handleClosingPetition', () => {

        const testId = 'testId';
        const currentUser = { authorities: [ROLE_ADMIN] };
        const originalHandleClosingPetition = AppUtils.closePetition;
        AppUtils.closePetition = () => Promise.resolve();

        localStorage.setItem(CURRENT_USERNAME, "test");

        const component = shallow(<ManagePetitions
            isAuthenticated={true}
            currentUser={currentUser}
        />);

        const instance = component.instance();
        instance.handleClosingPetition({ value: true }, testId);

        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME);
        AppUtils.closePetition = originalHandleClosingPetition;
    });

    it('should unsuccessfully call handleClosingPetition given the API call was not successful', () => {
        const testId = 'testId';
        const currentUser = { authorities: [ROLE_ADMIN] };
        const originalHandleClosingPetition = AppUtils.closePetition;
        AppUtils.closePetition = () => Promise.reject();

        localStorage.setItem(CURRENT_USERNAME, "test");

        const component = shallow(<ManagePetitions
            isAuthenticated={true}
            currentUser={currentUser}
        />);

        const instance = component.instance();
        instance.handleClosingPetition({ value: true }, testId);

        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME);
        AppUtils.closePetition = originalHandleClosingPetition;
    });

    it('should correctly call handleDeletePetition', () => {

        const testId = 'testId';
        const currentUser = { authorities: [ROLE_ADMIN] };
        const originalHandleClosingPetition = AppUtils.deletePetition;
        AppUtils.deletePetition = () => Promise.resolve();

        localStorage.setItem(CURRENT_USERNAME, "test");

        const component = shallow(<ManagePetitions
            isAuthenticated={true}
            currentUser={currentUser}
        />);

        const instance = component.instance();
        instance.handleDeletePetition({ value: true }, testId);

        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME);
        AppUtils.deletePetition = originalHandleClosingPetition;
    });

    it('should unsuccessfully call handleDeletePetition given the API call was not successful', () => {
        const testId = 'testId';
        const currentUser = { authorities: [ROLE_ADMIN] };
        const originalHandleClosingPetition = AppUtils.deletePetition;
        AppUtils.deletePetition = () => Promise.reject();

        localStorage.setItem(CURRENT_USERNAME, "test");

        const component = shallow(<ManagePetitions
            isAuthenticated={true}
            currentUser={currentUser}
        />);

        const instance = component.instance();
        instance.handleDeletePetition({ value: true }, testId);

        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME);
        AppUtils.deletePetition = originalHandleClosingPetition;
    });
});
