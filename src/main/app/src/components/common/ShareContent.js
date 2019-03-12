import React from 'react'
import { Button, FormControl, Glyphicon, OverlayTrigger, Popover } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";

/**
 * Provides the user with an option to share the content with other people. It displays a link that the user can share.
 */

class ShareContent extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            copied: false
        }
    }

    componentDidUpdate() {
        this.state.copied && setTimeout(() => this.setState({ copied: false }), 3000);
    }

    render() {
        const { contentType, contentId } = this.props;

        const systemPageRoot = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
        const contentPageUrl = `${systemPageRoot}/${contentType.toLowerCase()}/${contentId}`;
        const copiedConfirmation = <div className={"copiedConfirmationText"} align="center">Copied!</div>;

        const popoverClickRootClose = (
            <Popover id={"share-content-popover"} title={`Share ${contentType}`}>
                <FormControl bsSize="small" type="text" value={contentPageUrl} onChange={this.handleChange} readOnly />
                <div className={"copyLink"}>
                    <CopyToClipboard text={contentPageUrl} onCopy={() => this.setState({ copied: true })}>
                        <Button bsSize="small">Copy Link</Button>
                    </CopyToClipboard>
                    { this.state.copied && copiedConfirmation }
                </div>
            </Popover>
        );

        return (
            <button type="button" className={"linkButton"} style={{ color: 'black', fontWeight: 'normal' }}>
                <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popoverClickRootClose}>
                    <span><Glyphicon glyph="share-alt" className={"shareGlyph"} />Share</span>
                </OverlayTrigger>
            </button>
        );
    }
}

export default ShareContent;