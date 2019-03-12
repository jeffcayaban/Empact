import React from 'react';
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";

import CreateArgumentPanel from "../CreateArgumentPanel";

describe('CreateArgumentPanel', () => {

    it('should render nothing given the petition is closed', () => {
        const component = shallow(
            <CreateArgumentPanel
                argumentId={"testArgumentId"}
                isRootPetitionClosed={true}
                isArgumentCreator={true}
            />
        );

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should render successfully given the petition is not closed', () => {
        const component = shallow(
            <CreateArgumentPanel
                argumentId={"testArgumentId"}
                isRootPetitionClosed={false}
                isArgumentCreator={true}
            />
        );

        expect(toJson(component)).toMatchSnapshot();
    });


    it('should successfully call handleShowCreateArgumentInvite', () => {
        const component = shallow(<CreateArgumentPanel argumentId={"testArgumentId"} />);
        const instance = component.instance();

        const oldShowCreateArgumentValue = component.state('showCreateArgument');
        instance.handleShowCreateArgumentInvite();
        const newShowCreateArgumentValue = component.state('showCreateArgument');

        expect(newShowCreateArgumentValue).not.toBe(oldShowCreateArgumentValue);
    });
});
