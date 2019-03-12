import React from 'react'

//  Components
import ArgumentEntry from "../common/ArgumentEntry";
import HomeHeader from "./HomeHeader";
import Loader from "../Loader";
import PetitionEntry from "../common/PetitionEntry";
import TopContent from "./TopContent";

// Other
import { getMostDiscussedArguments, getMostDiscussedPetitions } from "../../utils/AppUtils";
import {
    ARGUMENT,
    DESCENDING,
    NO_OF_MOST_DISCUSSED_ARGUMENTS,
    NO_OF_MOST_DISCUSSED_PETITIONS,
    PETITION
} from "../../constants";

/**
 * Represents the home page of the system.
 */

class Home extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            mostDiscussedPetitionsSize: NO_OF_MOST_DISCUSSED_PETITIONS,
            mostDiscussedPetitions: [],
            mostDiscussedArgumentsSize: NO_OF_MOST_DISCUSSED_ARGUMENTS,
            mostDiscussedArguments: [],
        }
    }

    // Fetches the most discussed petitions.
    getMostDiscussedPetitions() {
        return getMostDiscussedPetitions(0, this.state.mostDiscussedPetitionsSize, DESCENDING, false)
    }

    // Fetches the most discussed arguments.
    getMostDiscussedArguments() {
        return getMostDiscussedArguments(this.state.mostDiscussedArgumentsSize, false)
    }

    // Generates an individual argument entry for an arguments table.
    static generateArgumentEntry(argument) {
        return (
            <ArgumentEntry showCreatorName={true} showCreatorBadge={false} key={argument.id} argument={argument}
                isSupporting={argument.isSupporting} />
        )
    }

    // Generates an individual petition entry for a petitions table.
    static generatePetitionEntry(petition) {
        return <PetitionEntry showCreatorName={true} key={petition.id} petition={petition} showCreationDetails={true} />
    }

    componentWillMount() {
        // Fetch the most discussed petitions and arguments.
        const fetches = [ this.getMostDiscussedPetitions(), this.getMostDiscussedArguments() ];

        Promise.all(fetches)
            .then((data) => {
                this.setState({
                    isLoading: false,
                    mostDiscussedPetitions: data[0].content,
                    mostDiscussedArguments: data[1].content
                })
            })
            .catch(() => this.setState({ isLoading: false }))
    }

    render() {
        if (!this.state.isLoading) {
            // Assumes that data fetching has completed.
            const { mostDiscussedPetitions, mostDiscussedArguments } = this.state;

            return (
                <div>
                    <HomeHeader />
                    <div>
                        <TopContent contentType={PETITION}
                            mostDiscussedContent={mostDiscussedPetitions}
                            contentMapFn={Home.generatePetitionEntry}
                        />
                        <TopContent
                            contentType={ARGUMENT}
                            mostDiscussedContent={mostDiscussedArguments}
                            contentMapFn={Home.generateArgumentEntry}
                        />
                    </div>
                </div>
            );
        } else {
            // Assumes that data is being fetched.
            return <Loader isLoading={this.state.isLoading} />
        }
    }
}

export default Home;