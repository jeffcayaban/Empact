import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import {formatTimestampToDate, truncateText} from "../../utils/Helpers";
import { countArgsByPetitionIdAndIsSupporting } from "../../utils/AppUtils";
import ArgCounts from "./ArgCounts";
import PetitionClosingTime from "./PetitionClosingTime";
import {
    MOBILE_MAX_WIDTH,
    PETITION_ENTRY_SITUATION_ALT_MAX_LENGTH,
    PETITION_ENTRY_SITUATION_MAX_LENGTH
} from "../../constants";

/**
 * Displays the details of a petition in a compact form. It is used for the table of petitions.
 */

class PetitionEntry extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            noOfForArguments: 0,
            noOfAgainstArguments: 0
        }
    }

    // Fetches the number of supporting and opposing arguments that are made to the petition.
    fetchArgumentNumbers() {
        const petitionId = this.props.petition.id;

        countArgsByPetitionIdAndIsSupporting(petitionId, true)
            .then(response => this.setState({ noOfForArguments: response }))
            .catch(error => console.error(error));

        countArgsByPetitionIdAndIsSupporting(petitionId, false)
            .then(response => this.setState({ noOfAgainstArguments: response }))
            .catch(error => console.error(error));
    }

    // Generates the creator's name.
    static generateCreatorName(petition) {
        if (petition.isAnonymous) {
            return <span className={"creatorNameStyle"}>Anonymous</span>
        } else {
            const petitionCreator = petition.createdBy;
            return (
                <span className={"creatorNameStyle"}>
                    <Link to={`/user/${petitionCreator.username}`}>
                        {`${petitionCreator.firstName} ${petitionCreator.lastName}`}
                    </Link>
                </span>
            )
        }
    }

    // Generates the details of the petition's creation.
    generateCreationDetails() {
        const { petition, showCreatorName } = this.props;
        const creationDate = formatTimestampToDate(petition.creationDateTime);

        if (showCreatorName) {
            // Assumes that the creator name is to be displayed.

            return (
                <div className={"creationDetailsStyle"}>
                    {`By `}
                    { PetitionEntry.generateCreatorName(petition) }
                    {` on ${creationDate} • `}
                    <PetitionClosingTime closingDateTime={petition.closingDateTime} />
                </div>
            )
        } else {
            // Assumes that the creator name is not to be displayed.

            return (
                <div className={"creationDetailsStyle"}>
                    {`Created on ${creationDate} • `}
                    <PetitionClosingTime closingDateTime={petition.closingDateTime} />
                </div>
            );
        }
    }

    componentWillMount(prevProps, prevState, snapshot) {
        this.fetchArgumentNumbers();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        (prevProps !== this.props) && this.fetchArgumentNumbers();
    }

    render() {
        const { noOfForArguments, noOfAgainstArguments } = this.state;
        const { key, petition, showCreationDetails } = this.props;

        const situationMaxLength = window.innerWidth < MOBILE_MAX_WIDTH
            ? PETITION_ENTRY_SITUATION_ALT_MAX_LENGTH
            : PETITION_ENTRY_SITUATION_MAX_LENGTH;

        return (
            <tr id={key}>
                <th className={"argumentPanelRow"}>
                    <div className={"spaceBetweenElements"} style={{ paddingBottom: '10px' }}>
                        <div>
                            <Link id={"petitionEntryTitle"} to={`/petition/${petition.id}`}>
                                { petition.title }
                            </Link>
                        </div>
                        <ArgCounts
                            noOfForArguments={noOfForArguments}
                            noOfAgainstArguments={noOfAgainstArguments}
                        />
                    </div>
                    <div style={{ paddingBottom: '10px' }}>
                        { truncateText(petition.situation, situationMaxLength) }
                    </div>
                    { showCreationDetails && this.generateCreationDetails() }
                </th>
            </tr>
        );
    }
}

export default withRouter(PetitionEntry);