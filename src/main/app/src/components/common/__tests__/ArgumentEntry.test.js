import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import ArgumentEntry from "../ArgumentEntry";

import MockArgument from '../../../other/mock-data/MockArgument';
import * as AppUtils from '../../../utils/AppUtils';

function createArgumentEntry(props = {}) {
    const mockRouter = jest.fn();
    return <ArgumentEntry.WrappedComponent {...props} params={{ router: mockRouter }} />;
}

describe('ArgumentEntry', () => {

    it('should render successfully', () => {
        const originalCountArgs = AppUtils.countArgsByArgumentIdAndIsSupporting;
        AppUtils.countArgsByArgumentIdAndIsSupporting = () => Promise.resolve(5);

        const props = {
            showCreatorBadge: true,
            showCreatorName: true,
            argument: MockArgument,
            parentArgument: MockArgument,
            key: 1,
            parentContentCreatorId: "testId",
        };

        const component = shallow(createArgumentEntry(props));

        expect(toJson(component)).toMatchSnapshot();
        AppUtils.countArgsByArgumentIdAndIsSupporting = originalCountArgs;
    });

    it('should render successfully given no parent argument', () => {
        const originalCountArgs = AppUtils.countArgsByArgumentIdAndIsSupporting;
        AppUtils.countArgsByArgumentIdAndIsSupporting = () => Promise.resolve(5);

        MockArgument.parentArgumentId = null;

        const props = {
            showCreatorBadge: true,
            showCreatorName: true,
            argument: MockArgument,
            key: 1,
            parentContentCreatorId: "testId",
        };

        const component = shallow(createArgumentEntry(props));

        expect(toJson(component)).toMatchSnapshot();
        AppUtils.countArgsByArgumentIdAndIsSupporting = originalCountArgs;
    });
});
