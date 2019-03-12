import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import ActionCQ3 from "../ActionCQ3";

import MockGetPetitionsResponse from '../../../../../../other/mock-data/MockGetArgumentsResponse';

describe('ActionCQ3', () => {

    it('should render correctly', () => {
        const petitionData = MockGetPetitionsResponse.content[0];

        const component = shallow(
            <ActionCQ3
                petition={petitionData}
                isSupporting={true}
                petitionId={petitionData.id}
            />
        );

        expect(toJson(component)).toMatchSnapshot();
    });

});
