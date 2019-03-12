import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import * as AppUtils from '../../../../utils/AppUtils';
import MockArgument from '../../../../other/mock-data/MockArgument';
import PetitionReport from "../PetitionReport";

describe('PetitionReport', () => {

    it('should display a no arguments message', () => {
        const component = shallow(<PetitionReport
            showReport={true}
            handleShowPetitionReport={jest.fn()}
            petition={{ id: 'testId' }}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should successfully render the page', () => {
        const originalGetPetitionReport = AppUtils.getPetitionReport;
        const petitionReportResponse = {
            supportingSituation: [MockArgument],
            supportingActionGoal: [MockArgument],
            notSupportingSituation: [MockArgument],
            notSupportingActionGoal: [MockArgument]
        };

        AppUtils.getPetitionReport = () => Promise.resolve(petitionReportResponse);

        const component = shallow(<PetitionReport
            showReport={true}
            handleShowPetitionReport={jest.fn()}
            petition={{ id: 'testId' }}
        />);

        component.setState(petitionReportResponse);

        expect(toJson(component)).toMatchSnapshot();
        AppUtils.getPetitionReport = originalGetPetitionReport;
    });

});
