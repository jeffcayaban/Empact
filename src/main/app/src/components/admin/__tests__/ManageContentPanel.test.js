import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import ManageContentPanel from "../ManageContentPanel";
import {DELETE, PETITION, USER} from "../../../constants";

describe('ManageContentPanel', () => {

    it('should render correctly given the content type is User', () => {

        const component = shallow(<ManageContentPanel
            contentAction={DELETE}
            handleSubmit={jest.fn()}
            contentType={USER}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render correctly given the content type is not User', () => {

        const component = shallow(<ManageContentPanel
            contentAction={DELETE}
            handleSubmit={jest.fn()}
            contentType={PETITION}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should correctly call handleUpdateContentId', () => {

        const testValue = 'testValue';

        const component = shallow(<ManageContentPanel
            contentAction={DELETE}
            handleSubmit={jest.fn()}
            contentType={PETITION}
        />);

        const instance = component.instance();
        instance.handleUpdateContentId({ target: { value: testValue } });
        expect(component.state().contentId).toBe(testValue)
    });
});
