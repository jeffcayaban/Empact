import React from 'react'

import {Tabs, Tab, Grid, Col} from 'react-bootstrap';
import PetitionsTable from "./PetitionsTable";
import {withRouter} from "react-router-dom";
import {ASCENDING, DESCENDING, LEAST_DISCUSSED, MOST_DISCUSSED, NEWEST, OLDEST} from "../../constants";

/**
 * Displays the petitions for the explore petitions page.
 */

class Petitions extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentTab: 1 };
        this.handleSelect = this.handleSelect.bind(this);
    }

    // Updates the component's state to reflect the current tab of petitions that is selected.
    handleSelect(key) {
        (key !== this.state.currentTab) && this.setState({ currentTab: key });
    }

    render() {
        const currentTab = this.state.currentTab;
        return (
            <div>
                <div className={"centerStyle"}>
                    <h2>Petitions</h2>
                    <p align="center">Explore the petitions!</p>
                </div>
                <div className={'secondaryPageContainerStyle'}>
                    <Grid className={"divNoPadding"} style={{ paddingTop: '30px' }}>
                        <Col md={12} lg={12} className={"divNoPadding"}>
                            <Tabs id={"petitions-table-tabs"} activeKey={currentTab} onSelect={this.handleSelect}>
                                <Tab eventKey={1} title={NEWEST}>
                                    { currentTab === 1 && <PetitionsTable sort={DESCENDING} byNoOfArgs={false}/> }
                                </Tab>
                                <Tab eventKey={2} title={OLDEST}>
                                    { currentTab === 2 && <PetitionsTable sort={ASCENDING} byNoOfArgs={false}/> }
                                </Tab>
                                <Tab eventKey={3} title={MOST_DISCUSSED}>
                                    { currentTab === 3 && <PetitionsTable sort={DESCENDING} byNoOfArgs={true}/> }
                                </Tab>
                                <Tab eventKey={4} title={LEAST_DISCUSSED}>
                                    { currentTab === 4 && <PetitionsTable sort={ASCENDING} byNoOfArgs={true}/> }
                                </Tab>
                            </Tabs>
                        </Col>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default withRouter(Petitions);