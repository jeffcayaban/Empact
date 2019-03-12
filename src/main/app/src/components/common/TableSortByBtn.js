import React from "react";
import { DropdownButton, MenuItem } from "react-bootstrap";
import {LEAST_DISCUSSED, MOST_DISCUSSED, NEWEST, OLDEST} from "../../constants";

/**
 * Displays the different sorting options for a table.
 */

class TableSortByBtn extends React.PureComponent {

    render() {
        const { id, title, totalContentCount, onSelect, showMoreOptions } = this.props;
        const allowSort = totalContentCount <= 1;

        if (showMoreOptions) {
            return (
                <DropdownButton id={id} title={title} onSelect={onSelect} disabled={allowSort}>
                    <MenuItem key={1} eventKey="1" disabled={allowSort}>{NEWEST}</MenuItem>
                    <MenuItem key={2} eventKey="2" disabled={allowSort}>{OLDEST}</MenuItem>
                    <MenuItem key={3} eventKey="3" disabled={allowSort}>{MOST_DISCUSSED}</MenuItem>
                    <MenuItem key={4} eventKey="4" disabled={allowSort}>{LEAST_DISCUSSED}</MenuItem>
                </DropdownButton>
            );
        } else {
            return (
                <div>
                    <DropdownButton id={id} title={title} onSelect={onSelect} disabled={allowSort}>
                        <MenuItem key={1} eventKey="1" disabled={allowSort}>{NEWEST}</MenuItem>
                        <MenuItem key={2} eventKey="2" disabled={allowSort}>{OLDEST}</MenuItem>
                    </DropdownButton>
                </div>
            )
        }
    }
}

export default TableSortByBtn;