import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import AdminControlPanelBtn from "../AdminControlPanelBtn";
import {USER} from "../../../constants";

describe('AdminControlPanelBtn', () => {
    it('should render correctly', () => {
        const component = shallow(<AdminControlPanelBtn contentType={`${USER}s`} />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
