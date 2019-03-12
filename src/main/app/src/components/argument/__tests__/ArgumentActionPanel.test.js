import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import * as AppUtils from "../../../utils/AppUtils";

import ArgumentActionPanel from "../ArgumentActionPanel";

describe('ArgumentActionPanel', () => {

    it('should render successfully', () => {
        const component = shallow(<ArgumentActionPanel argumentId={"testArgumentId"}/>);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should correctly call handleDelete given the content is an argument', () => {
        const originalDeleteArgument = AppUtils.deleteArgument;
        AppUtils.deleteArgument = (request) => Promise.resolve();

        const component = shallow(<ArgumentActionPanel
            isAnArgument={true}
            argumentId={"testArgumentId"}
        />);

        const instance = component.instance();

        instance.handleDelete({argumentId: 'testArgumentId'});

        expect(toJson(component)).toMatchSnapshot();

        AppUtils.deleteArgument = originalDeleteArgument;
    });

    it('should correctly call handleDelete given the content is a petition', () => {
        const originalDeleteArgument = AppUtils.deleteArgument;
        AppUtils.deleteArgument = (request) => Promise.resolve();

        const component = shallow(<ArgumentActionPanel
            isAnArgument={false}
            argumentId={"testArgumentId"}
        />);

        const instance = component.instance();

        instance.handleDelete({argumentId: 'testArgumentId'});

        expect(toJson(component)).toMatchSnapshot();

        AppUtils.deleteArgument = originalDeleteArgument;
    });

    it('should correctly call handleDelete given an unknown content type', () => {
        const originalDeleteArgument = AppUtils.deleteArgument;
        AppUtils.deleteArgument = (request) => Promise.resolve();

        const component = shallow(<ArgumentActionPanel argumentId={"testArgumentId"}/>);
        const instance = component.instance();

        instance.handleDelete({argumentId: 'testArgumentId'});

        expect(toJson(component)).toMatchSnapshot();

        AppUtils.deleteArgument = originalDeleteArgument;
    });

    it('should correctly display an error given the deleteArgument call fails', () => {
        const originalDeleteArgument = AppUtils.deleteArgument;
        AppUtils.deleteArgument = (request) => Promise.reject();

        const component = shallow(<ArgumentActionPanel argumentId={"testArgumentId"}/>);
        const instance = component.instance();

        instance.handleDelete({argumentId: 'testArgumentId'});

        expect(toJson(component)).toMatchSnapshot();

        AppUtils.deleteArgument = originalDeleteArgument;
    });
});