import React from 'react';
import NoPetitionsAlert from "../common/alerts/NoPetitionsAndExploreAlert";
import {Col, Grid, Table} from "react-bootstrap";
import NoArgumentsAlert from "../common/alerts/NoArgumentsAndExploreAlert";
import { PETITION } from "../../constants";

/**
 * Displays the top content within the system. This can either be petitions or arguments.
 */

class TopContent extends React.PureComponent {

    // Generates the table of content.
    generateContentTable() {
        const { mostDiscussedContent, contentMapFn } = this.props;

        return (
            <Table bordered hover>
                <tbody>
                    { mostDiscussedContent.map(contentMapFn) }
                </tbody>
            </Table>
        )
    }

    render() {
        const { mostDiscussedContent, contentType } = this.props;
        const noContentAlert = (contentType === PETITION) ? <NoPetitionsAlert /> : <NoArgumentsAlert />;

        return (
            <Grid className={"topContentContainer"}>
                <Col md={12} lg={12} className={'noSidePadding'}>
                    <h4 style={{ paddingBottom: '8px' }} id={"content-table-title"}>
                        {`Most Discussed ${contentType}s`}
                    </h4>
                    { (mostDiscussedContent && mostDiscussedContent.length > 0)
                        ? this.generateContentTable() : noContentAlert }
                </Col>
            </Grid>
        );
    }
}

export default TopContent;