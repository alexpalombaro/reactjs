import './Header.scss';
import React from 'react';

class Header {

    static propTypes = {
    };

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className="Header">
                <button type="submit" className="btn waves-effect waves-light" name="submit">Material Button</button>
            </div>
        );
    }
}

export default Header;
