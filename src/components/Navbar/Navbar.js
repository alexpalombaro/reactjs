import './Navbar.scss';
import React from 'react';
import { Link } from 'react-router';

class Navbar {

    render() {
        return (
            <div id="Navbar" role="navigation">
                <div className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <Link to="home" className="navbar-brand">
                                <img className="logo" src="./images/sig.svg" alt="Website signature logo"/>
                                <h2>Alessandro Palombaro<span className="subtext">Frontend developer</span></h2>
                            </Link>
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#navbar-collapse-target" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="navbar-collapse-target">
                            <ul className="nav navbar-right navbar-nav nav-pills">
                                <li><Link to="about">About</Link></li>
                                <li><Link to="info">Info</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Navbar;
