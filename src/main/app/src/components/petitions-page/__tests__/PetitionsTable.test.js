import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import MockData from '../../../other/mock-data/MockGetPetitionsResponse';
import * as AppUtils from '../../../utils/AppUtils';
import PetitionsTable from "../PetitionsTable";

describe('PetitionsTable', () => {

    it('should render successfully and get the most discussed petitions', () => {
        const originalGetMostDiscussedPetitions = AppUtils.getMostDiscussedPetitions;
        AppUtils.getMostDiscussedPetitions = () => Promise.resolve(MockData);

        const component = shallow(<PetitionsTable
            byNoOfArgs={true}
            sort={"testSort"}
        />);

        component.setState({ isLoading: false });

        expect(toJson(component)).toMatchSnapshot();
        AppUtils.getMostDiscussedPetitions = originalGetMostDiscussedPetitions;
    });

    it('should render successfully and get all the petitions', () => {
        const originalGetAllPetitions = AppUtils.getAllPetitions;
        AppUtils.getAllPetitions = () => Promise.resolve(MockData);

        const component = shallow(<PetitionsTable
            byNoOfArgs={false}
            sort={"testSort"}
        />);

        component.setState({ isLoading: false });

        expect(toJson(component)).toMatchSnapshot();
        AppUtils.getAllPetitions = originalGetAllPetitions;
    });
});
