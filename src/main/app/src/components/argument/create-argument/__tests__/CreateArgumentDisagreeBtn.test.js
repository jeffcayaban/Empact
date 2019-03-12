import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import CreateArgumentDisagreeBtn from "../CreateArgumentDisagreeBtn";

describe('CreateArgumentDisagreeBtn', () => {

    it('should render successfully given the user is the content creator', () => {
        const component = shallow(
            <CreateArgumentDisagreeBtn
                isContentCreator={true}
                closeHandler={jest.fn()}
                contentId={"testId"}
                contentType={"testContentType"}
            />
        );

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render successfully given the user is not the content creator', () => {
        const component = shallow(
            <CreateArgumentDisagreeBtn
                isContentCreator={false}
                closeHandler={jest.fn()}
                contentId={"testId"}
                contentType={"testContentType"}
            />
        );

        expect(toJson(component)).toMatchSnapshot();
    });
});
