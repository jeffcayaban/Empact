import React from 'react';
import toJson from "enzyme-to-json";
import {shallow} from "enzyme";
import * as AppUtils from "../../../utils/AppUtils";

import ArgumentPage from "../ArgumentPage";
import MockArgument from "../../../other/mock-data/MockArgument.js";

function createArgumentPage(props = {}) {
    const mockRouter = jest.fn();
    return <ArgumentPage.WrappedComponent {...props} params={{ router: mockRouter }} />;
}

describe('ArgumentPage', () => {

    it('should render successfully', () => {

        const testUsername = "testUsername";

        // Mock getArgumentById

        const originalGetArgumentById = AppUtils.getArgumentById;
        AppUtils.getArgumentById = (id) => Promise.resolve(MockArgument);

        // Mock getParentArgumentById

        const originalGetParentArgumentById = AppUtils.getParentArgumentById;
        AppUtils.getParentArgumentById = (id) => Promise.resolve(MockArgument);

        // Mock isPetitionClosed

        const originalIsPetitionClosed = AppUtils.isPetitionClosed;
        AppUtils.isPetitionClosed = (id) => Promise.resolve(true);

        // Mock countArgsByArgumentIdAndIsSupporting

        const originalCountArgs = AppUtils.countArgsByArgumentIdAndIsSupporting;
        AppUtils.countArgsByArgumentIdAndIsSupporting = (id, isSupporting) => Promise.resolve(5);

        const component = shallow(createArgumentPage({
            match: { params: { id: 'testId' } },
            currentUser: { username: testUsername }
        }));

        expect(toJson(component)).toMatchSnapshot();

        AppUtils.getArgumentById = originalGetArgumentById;
        AppUtils.getParentArgumentById = originalGetParentArgumentById;
        AppUtils.isPetitionClosed = originalIsPetitionClosed;
        AppUtils.countArgsByArgumentIdAndIsSupporting = originalCountArgs;
    });
});
