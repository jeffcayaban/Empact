import React from "react";
import { ListGroupItem } from "react-bootstrap";

/**
 * Displays the sources for a given argument.
 */

class ArgumentSources extends React.PureComponent {

    render() {
        const argument = this.props.argument;

        if (argument.sources.length > 0) {
            // Assumes that the argument has some sources.

            return (
                <ListGroupItem>
                    <p><strong>Sources:</strong></p>
                    <ul>
                        { argument.sources.map((source, index) =>
                            <li key={index}>
                                <a href={source} target="_blank" rel="noopener noreferrer">
                                    {`Link ${index + 1}`}
                                </a>
                            </li>
                        )}
                    </ul>
                </ListGroupItem>
            );
        } else {
            // Assumes that the argument has no sources.
            return null;
        }
    }
}

export default ArgumentSources;