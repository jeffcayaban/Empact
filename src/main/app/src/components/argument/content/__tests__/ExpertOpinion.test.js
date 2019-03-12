import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import ExpertOpinion from "../ExpertOpinion";

import MockArgument from '../../../../other/mock-data/MockArgument';

describe('ExpertOpinion', () => {

    it('should render correctly', () => {

        const component = shallow(<ExpertOpinion
            argument={MockArgument}
            labels={[ "test1", "test2", "test3" ]}
            showPetition={jest.fn()}
            includePreview={true}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });
});
