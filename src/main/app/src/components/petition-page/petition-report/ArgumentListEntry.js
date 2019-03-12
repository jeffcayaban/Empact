import React from "react";
import {Route} from "react-router-dom";

/**
 * Displays an argument for the ArgumentHorizontalList component.
 */

class ArgumentListEntry extends React.PureComponent {

    render() {
        const { argumentId, labels } = this.props;

        return (
            <Route render={({ history }) => (
                <div className="menu-item" onClick={() => { history.push(`/argument/${argumentId}`)}}>
                    <div className={"centerStyle"} style={{ paddingBottom: '20px', paddingTop: '10px' }}>
                        <div className={"argumentListEntryId"}>
                            ID: { argumentId }
                        </div>
                        <div className={"argumentListEntryTitle"}>
                            { labels[0] }
                        </div>
                        <div style={{ fontSize: '13px', paddingTop: '10px' }}>
                            { labels[1] }
                        </div>
                    </div>
                </div>
            )}/>
        );
    }
}

export default ArgumentListEntry;