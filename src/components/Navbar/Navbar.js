import './Navbar.scss';
import React from 'react';
import { Link } from 'react-router';

class Navbar {

    render() {
        return (
            <div className="navbar navbar-default" role="navigation">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="about">About</Link></li>
                            <li><Link to="info">Info</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

}

export default Navbar;
