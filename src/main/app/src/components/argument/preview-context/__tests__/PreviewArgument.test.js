import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import PreviewArgument from "../PreviewArgument";

import MockArgument from '../../../../other/mock-data/MockArgument.js';

describe('PreviewArgument', () => {

    it('should render successfully', () => {
        const component = shallow(
            <PreviewArgument
                argument={MockArgument}
                handleHide={jest.fn()}
                show={true}
                labels={['testLabel1', 'testLabel2', 'testLabel3']}
                renderContents={jest.fn()}
            />
        );

        expect(toJson(component)).toMatchSnapshot();
    });
});
