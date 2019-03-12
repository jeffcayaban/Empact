import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import TableSortByBtn from "../TableSortByBtn";

describe('TableSortByBtn', () => {

    it('should render successfully given more options are to be shown', () => {
        const component = shallow(<TableSortByBtn
            id={"testId"}
            title={"testTitle"}
            totalContentCount={2}
            onSelect={jest.fn()}
            showMoreOptions={true}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render successfully given more options are not to be shown', () => {
        const component = shallow(<TableSortByBtn
            id={"testId"}
            title={"testTitle"}
            totalContentCount={2}
            onSelect={jest.fn()}
            showMoreOptions={false}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });
});
