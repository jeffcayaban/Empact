import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import ArgumentPanel from "../ArgumentPanel";
import {PETITION} from "../../../constants";

describe('ArgumentPanel', () => {

    it('should render successfully', () => {
        const component = shallow(<ArgumentPanel
            isSupporting={true}
            subjectId={"testSubjectid"}
            parentCreatedById={"testParentCreatedById"}
            noOfArguments={1}
            isCreator={true}
            parentContentType={PETITION}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });
});
