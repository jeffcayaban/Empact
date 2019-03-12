import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import ContentRetrievalAlert from "../ContentRetrievalAlert";
import {PETITION} from "../../../../constants";

describe('ContentRetrievalAlert', () => {

    it('should render successfully', () => {
        const component = shallow(<ContentRetrievalAlert contentType={PETITION} />);
        expect(toJson(component)).toMatchSnapshot();
    });
});
