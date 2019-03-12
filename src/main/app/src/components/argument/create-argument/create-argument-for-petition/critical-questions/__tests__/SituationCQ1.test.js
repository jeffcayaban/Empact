import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import MockGetPetitionsResponse from '../../../../../../other/mock-data/MockGetArgumentsResponse';
import SituationCQ1 from "../SituationCQ1";

describe('SituationCQ1', () => {

    it('should render correctly', () => {
        const petitionData = MockGetPetitionsResponse.content[0];

        const component = shallow(
            <SituationCQ1
                petition={petitionData}
                isSupporting={true}
                petitionId={petitionData.id}
            />
        );

        expect(toJson(component)).toMatchSnapshot();
    });

});
