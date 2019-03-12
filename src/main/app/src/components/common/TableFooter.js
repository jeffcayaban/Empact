import React from 'react';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

/**
 * Displays pagination options for a table.
 */

class TableFooter extends React.Component {
    render() {
        const { pageNumber, totalPages, onPrevious, onNext } = this.props;
        const pageNumberText = `Page ${pageNumber + 1}`;

        return (
            <div className={"tableFooter"}>
                <Button title={"See previous page"} disabled={!(pageNumber > 0)} onClick={onPrevious}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span className={"previousPageBtnText"}>Previous</span>
                </Button>
                <p className={"tablePageNumber"}>{ pageNumberText }</p>
                <Button title={"See next page"} disabled={!(pageNumber < totalPages - 1)} onClick={onNext}>
                    <span className={"nextPageBtnText"}>Next</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                </Button>
            </div>
        );
    }
}

export default TableFooter;
