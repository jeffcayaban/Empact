import React from "react";
import {Table} from "react-bootstrap";
import TableFooter from "./TableFooter";
import NoPetitionsAndExploreAlert from "./alerts/NoPetitionsAndExploreAlert";
import PetitionEntry from "./PetitionEntry";

/**
 * Displays the table of petitions.
 */

class PetitionsContentTable extends React.Component {

    render() {
        const { petitions, pageNumber, totalPages, showFollowUp, loadFromServer } = this.props;

        if (Array.isArray(petitions) && petitions.length) {
            // If there are petitions
            return (
                <div>
                    <Table bordered hover>
                        <tbody>
                        { petitions.map((petition, index) =>
                            <PetitionEntry
                                showCreatorName={true}
                                key={index}
                                petition={petition}
                                showCreationDetails={true}
                            />)
                        }
                        </tbody>
                    </Table>
                    <div style={{ paddingTop: '10px' }}>
                        <TableFooter
                            pageNumber={pageNumber}
                            totalPages={totalPages}
                            onPrevious={() => loadFromServer(pageNumber - 1)}
                            onNext={() => loadFromServer(pageNumber + 1)}
                        />
                    </div>
                </div>
            );

        } else {
            // If there are NO petitions.
            return <NoPetitionsAndExploreAlert showFollowUp={showFollowUp} />;
        }
    }

}

export default PetitionsContentTable;