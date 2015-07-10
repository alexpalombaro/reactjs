import './About.scss';
import React from 'react';

import AppActions from '../../actions/AppActions.js';
import AppStore from '../../stores/AppStore.js';

class About extends React.Component {

    constructor(props) {
        super(props);

        this._appStoreChangeHandler = this.appStoreChangeHandler.bind(this);
    }

    componentWillMount() {
        AppStore.onChange(this._appStoreChangeHandler);
        if (AppStore.getPage('/about')) {
            this.appStoreChangeHandler();
        } else {
            AppActions.loadPage('/about');
        }
    }

    componentWillUnmount() {
        AppStore.offChange(this._appStoreChangeHandler);
    }

    render() {
        return (
            <div className="About container" dangerouslySetInnerHTML={{__html: this.state.bodyText}}>
            </div>
        );
    }

    //
    // Event handlers
    // -----------------------------------------------------------------------------

    appStoreChangeHandler() {
        var page = AppStore.getPage('/about');
        if (this.page !== page) {
            this.page = page;
            this.setState({bodyText: this.page.body});
        }
    }
}

export default About;
