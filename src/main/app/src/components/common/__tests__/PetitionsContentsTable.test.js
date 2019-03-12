import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import PetitionsContentTable from "../PetitionsContentTable";
import MockPetitions from '../../../other/mock-data/MockGetPetitionsResponse';

describe('PetitionsContentTable', () => {

    it('should render successfully given there exists petitions', () => {
        const component = shallow(<PetitionsContentTable
            petitions={MockPetitions.content}
            pageNumber={MockPetitions.page}
            totalPages={MockPetitions.totalPages}
            showFollowUp={true}
            loadFromServer={jest.fn()}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render an alert given there exists no petitions', () => {
        const component = shallow(<PetitionsContentTable
            petitions={[]}
            pageNumber={MockPetitions.page}
            totalPages={MockPetitions.totalPages}
            showFollowUp={true}
            loadFromServer={jest.fn()}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });

});
