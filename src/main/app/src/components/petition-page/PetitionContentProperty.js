import React from "react";
import { ListGroupItem } from "react-bootstrap";

/**
 * Represents a container for displaying an element of a petition.
 */

class PetitionContentProperty extends React.PureComponent {

    render() {
        const { text, labelText } = this.props;
        return (
            <ListGroupItem>
                <h5 style={{ fontWeight: 'bold' }}>{labelText}</h5>
                <p>{text}</p>
            </ListGroupItem>
        );
    }

}

export default PetitionContentProperty;