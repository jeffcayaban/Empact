import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import CreateArgumentInvite from "../CreateArgumentInvite";

describe('CreateArgumentInvite', () => {

    it('should render successfully given the user is the content creator', () => {
        const component = shallow(
            <CreateArgumentInvite
                contentId={"testId"}
                contentType={"testContentType"}
                closeHandler={jest.fn()}
                isContentCreator={true}
            />
        );

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render successfully given the user is not the content creator', () => {
        const component = shallow(
            <CreateArgumentInvite
                contentId={"testId"}
                contentType={"testContentType"}
                closeHandler={jest.fn()}
                isContentCreator={false}
            />
        );

        expect(toJson(component)).toMatchSnapshot();
    });
});
