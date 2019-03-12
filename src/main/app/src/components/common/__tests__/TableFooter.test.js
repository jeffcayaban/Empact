import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import TableFooter from "../TableFooter";

describe('TableFooter', () => {

    it('should render successfully', () => {
        const component = shallow(<TableFooter
            pageNumber={1}
            totalPages={3}
            onPrevious={jest.fn()}
            onNext={jest.fn()}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });
});
