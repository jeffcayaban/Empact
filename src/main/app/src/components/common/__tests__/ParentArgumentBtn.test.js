import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import ParentArgumentBtn from "../ParentArgumentBtn";

describe('ParentArgumentBtn', () => {

    it('should render successfully', () => {
        const component = shallow(<ParentArgumentBtn
            parentArgId={"testId"}
            showArg={jest.fn()}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render nothing', () => {
        const component = shallow(<ParentArgumentBtn
            showArg={jest.fn()}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });

});
