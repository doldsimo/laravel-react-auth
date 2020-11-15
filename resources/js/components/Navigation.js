import React, { Component } from "react";

import { Link } from 'react-router-dom';


export default class Navigation extends Component {

    handleLogout = () => {
        localStorage.clear();
        this.props.setUser(null);
    }

    render() {

        let buttons;

        if (this.props.user) {
            buttons = (
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/" onClick={this.handleLogout} className="nav-link">Abmelden</Link>
                        </li>
                    </ul>
                </div>
            );

        } else {
            buttons = (
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Einloggen</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link">Registrieren</Link>
                        </li>
                    </ul>
                </div>
            );
        }
        return (

            <nav className="navbar navbar-expand navbar-light fixed-top">
                <div className="container">
                    <Link to="/" className="navbar-brand">Start</Link>
                    {buttons}
                </div>
            </nav>

        );
    }

}