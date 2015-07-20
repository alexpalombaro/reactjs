import './Navbar.scss';
import React from 'react';
import { Link } from 'react-router';
import Logo from '../Logo';

import classNames from 'classnames';

class Navbar extends React.Component {

    static propTypes = {
        hidden: React.PropTypes.bool,
        onResize: React.PropTypes.func

    };

    //
    // React
    // -----------------------------------------------------------------------------

    constructor(props) {
        super(props);

        this.state = {
            mouseOverBrand: false,
            hidden: false
        };
    }

    render() {
        return (
            <nav className="Navbar" role="navigation">
                <div className={this._resolveNavBarClass()}>
                    <div className="container">
                        <div className="navbar-header">
                            <Link to="home" className="navbar-brand"
                                  onMouseEnter={() => this.setState({mouseOverBrand: true})}
                                  onMouseLeave={() => {
                                      this.setState({mouseOverBrand: false});
                                      document.activeElement.blur();
                                  }}>
                                <Logo className={this._resolveLogoClass()}/>
                                <h2>Alessandro Palombaro <span className="subtext">Frontend developer</span></h2>
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
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    //
    // Component methods
    // -----------------------------------------------------------------------------

    /**
     * Generate class name for Logo component
     * @private
     */
    _resolveLogoClass() {
        return classNames('navbar-logo', {
            'inverse-active': this.state.mouseOverBrand,
            'inverse-inactive': !this.state.mouseOverBrand
        });
    }

    _resolveNavBarClass() {
        return classNames('navbar navbar-inverse navbar-fixed-top', {
            'hidden': this.props.hidden
        });
    }
}

export default Navbar;
