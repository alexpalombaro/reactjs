import './Navbar.scss';
import React from 'react';
import { Link } from 'react-router';
import Logo from '../Logo';

import AppStore from '../../stores/AppStore.js';

import classNames from 'classnames';

class Navbar extends React.Component {

    static propTypes = {
        hideOnScroll: React.PropTypes.number,
        showOnScroll: React.PropTypes.number
    };

    //
    // React
    // -----------------------------------------------------------------------------

    constructor(props) {
        super(props);

        this.scrollY = AppStore.getScroll().y;
        this.scrollTotal = 0;

        this.state = {
            mouseOverBrand: false,
            hidden: false
        };

        this._appStoreChangeHandler = this._appStoreChangeHandler.bind(this);
    }

    componentWillMount() {
        AppStore.onChange(this._appStoreChangeHandler);
    }

    componentWillUnmount() {
        AppStore.offChange(this._appStoreChangeHandler);
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
            'hidden': this.state.hidden
        });
    }

    //
    // Event Handlers
    // -----------------------------------------------------------------------------

    /**
     * Triggered on AppStore change
     * @private
     */
    _appStoreChangeHandler() {

        //console.log(React.findDOMNode(this).firstChild.clientHeight);

        var newScrollY = AppStore.getScroll().y;
        if (newScrollY !== this.scrollY) {
            this._updateScrollTotal(newScrollY);
            if (this.props.showOnScroll && this.scrollTotal < this.props.showOnScroll && this.state.hidden) {
                this.setState({hidden: false});
            }
            else if (this.props.hideOnScroll && this.scrollTotal > this.props.hideOnScroll && !this.state.hidden) {
                this.setState({hidden: true});
            }

            this.scrollY = newScrollY;
        }
    }

    /**
     *
     * @param newScrollY
     * @private
     */
    _updateScrollTotal(newScrollY) {
        if (newScrollY > this.scrollY && this.scrollTotal > -1) {
            this.scrollTotal += newScrollY - this.scrollY;
        }
        else if (newScrollY < this.scrollY && this.scrollTotal < 1) {
            this.scrollTotal -= this.scrollY - newScrollY;
        }
        else {
            this.scrollTotal = 0;
        }
    }

}

export default Navbar;
