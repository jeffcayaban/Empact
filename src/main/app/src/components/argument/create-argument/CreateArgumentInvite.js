import React from 'react'
import { Button, ButtonGroup, Glyphicon } from "react-bootstrap";
import { Route } from "react-router-dom";
import CreateArgumentDisagreeBtn from "./CreateArgumentDisagreeBtn";

/**
 * Is used to invite the user to create an argument. It is used on the argument and petition pages.
 */

class CreateArgumentInvite extends React.PureComponent {

    // Creates a message to invite the user to create an argument.
    createInviteMessage() {
        if (this.props.isContentCreator) {
            return <h4 align="center">Would you like to provide an argument to further support your view?</h4>;
        } else {
            const contentType = this.props.contentType.toLowerCase();

            return <h4 align="center">{`Do you agree or disagree with this ${contentType}?`}</h4>;
        }
    }

    render() {
        const { contentId, contentType, closeHandler, isContentCreator } = this.props;
        const displayedContentType = contentType.toLowerCase();

        return (
            <div>
                <div align="right">
                    <button type="button" className="linkButton" style={{ color: 'black' }} onClick={() => closeHandler()}>
                        <Glyphicon glyph="remove" className={"closeGlyphicon"} />
                    </button>
                </div>
                <div className={'createArgumentOptions'} style={{ paddingBottom: '20px' }}>
                    { this.createInviteMessage() }
                    <ButtonGroup className={"createArgInviteOptions"}>
                        <Route render={({ history }) => (
                            <Button onClick={() => { history.push(`/${displayedContentType}/${contentId}/agree`); }}>
                                { isContentCreator ? "Yes" : "Agree" }
                            </Button>
                        )}/>

                        <CreateArgumentDisagreeBtn isContentCreator={isContentCreator} closeHandler={closeHandler}
                            contentId={contentId} contentType={contentType} />
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

export default CreateArgumentInvite;