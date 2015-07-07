import './Logo.scss';
import React from 'react';

import svg from '../../assets/images/sig.svg';

class Logo extends React.Component {

    constructor(props) {
        super(props);
        this.props = Object.assign({
            className: ''
        });
    }

    static propTypes = {
        className: React.PropTypes.string
    };

    render() {
        return (
            <div className={'Logo ' + this.props.className} dangerouslySetInnerHTML={{__html: svg}}>
            </div>
        );
    }
}

export default Logo;
