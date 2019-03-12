import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import AdminControlPanel from "../AdminControlPanel";
import {ROLE_ADMIN} from "../../../constants";
import {CURRENT_USERNAME} from "../../../constants";

describe('AdminControlPanel', () => {

    it('should render correctly given the logged in user is an admin', () => {

        localStorage.setItem(CURRENT_USERNAME, "test");

        const currentUser = { authorities: [ROLE_ADMIN] };
        const component = shallow(<AdminControlPanel
            isAuthenticated={true}
            currentUser={currentUser}
        />);

        expect(toJson(component)).toMatchSnapshot();

        localStorage.removeItem(CURRENT_USERNAME)
    });

    it('should render an alert given the user is not logged in.', () => {

        const component = shallow(<AdminControlPanel
            isAuthenticated={true}
            currentUser={null}
        />);

        expect(toJson(component)).toMatchSnapshot();
    });
});
