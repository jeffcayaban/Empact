import React from 'react'
import BarLoader from "react-spinners/BarLoader";

/**
 * Is a loader that will be displayed whenever data is being fetched.
 */

class Loader extends React.PureComponent {
    render() {
        return (
            <div className={'loaderContainerStyle'}>
                <div className={'centerStyle'}>
                    <BarLoader color={'#7d7d7d'} loading={this.props.isLoading} />
                </div>
            </div>
        );
    }
}

export default Loader;
