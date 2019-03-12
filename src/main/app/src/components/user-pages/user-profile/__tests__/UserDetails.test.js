import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import UserDetails from "../UserDetails";

describe('UserDetails', () => {

    it('should render correctly', () => {
        const component = shallow(<UserDetails
            firstName={"testFirstName"}
            lastName={"testLastName"}
            userName={"testUserName"}
        />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
