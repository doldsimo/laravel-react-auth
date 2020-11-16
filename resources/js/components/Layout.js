import React, { Component } from 'react';

import axios from 'axios';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Navigation from './Navigation';
import Login from './Login';
import Register from './Register';
import Forgot from './Forgot';
import Reset from './Reset';
import Test from './Test';
import PrivateRoute from './PrivateRoute';

class Layout extends Component {
    state = {

    }

    componentDidMount = () => {
        axios.get('api/user')
            .then(res => {
                this.setUser(res.data);
            }).catch(err => {
                console.log(err);
            })
    }

    setUser = user => {
        this.setState({
            user: user
        });
    }

    render() {

        return (
            <BrowserRouter>
                <div>
                    <Navigation user={this.state.user} setUser={this.setUser} />
                    <div className="auth-wrapper">
                        <div className="auth-inner">
                            <Switch>
                                {/* Private Routes */}
                                <PrivateRoute exact path="/" component={() => <Home user={this.state.user} />} />
                                <PrivateRoute exact path="/test" component={() => <Test user={this.state.user} />} />

                                {/* Public Routes */}
                                <Route ecact path="/login" component={() => <Login setUser={this.setUser} user={this.state.user} />} />
                                <Route ecact path="/register" component={Register} />
                                <Route ecact path="/forgot" component={Forgot} />
                                <Route ecact path={"/reset/" + ":id"} component={Reset} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default Layout;
