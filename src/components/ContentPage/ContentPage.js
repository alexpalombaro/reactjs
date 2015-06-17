import './ContentPage.scss';
import React, { PropTypes } from 'react';

class ContentPage {

    static propTypes = {
        body: PropTypes.string.isRequired
    };

    render() {
        var { className, body, other } = this.props;

        return (
            <div className={'ContentPage ' + className}
                 dangerouslySetInnerHTML={{__html: body}} {...other} />
        );
    }

}

export default ContentPage;
