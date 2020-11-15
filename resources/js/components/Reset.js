import React, { Component } from 'react';

import axios from 'axios';
import { Redirect } from 'react-router-dom';

import ErrorMessage from "./UI/ErrorMessage";

export default class Reset extends Component {
    state = {
        passwordError: null,
        passwordConfirmError: null
    }

    setErrorMessages = (data) => {
        this.setState({
            passwordError: data.errors.password ? data.errors.password[0] : null,
            passwordConfirmError: data.errors.password_confirm ? data.errors.password_confirm[0] : null
        });
    }


    handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            token: this.props.match.params.id,
            password: this.password,
            password_confirm: this.password_confirm
        }

        axios.post('api/reset', data).then(
            res => {
                console.log(res);
                this.setState({
                    reset: true
                });
            }
        ).catch(
            err => {
                this.setErrorMessages(err.response.data);
            }
        )
    };

    render() {
        if (this.state.reset) {
            return <Redirect to="/login" />
        }

        let error = '';

        if (this.state.message) {
            error = (
                <div className="alert alert-danger" role="alert">
                    {this.state.message}
                </div>
            );
        }
        return (
            <form onSubmit={this.handleSubmit}>
                {error}
                <h3>Passwort zurücksetzen</h3>
                <div className="form-group">
                    <label>Passwort</label>
                    <input type="password" className="form-control" placeholder="Passwort" onChange={e => this.password = e.target.value}></input>
                    <ErrorMessage>{this.state.passwordError}</ErrorMessage>
                </div>
                <div className="form-group">
                    <label>Passwort bestätigen</label>
                    <input type="password" className="form-control" placeholder="Passwort bestätigen" onChange={e => this.password_confirm = e.target.value}></input>
                    <ErrorMessage>{this.state.passwordConfirmError}</ErrorMessage>
                </div>
                <button className="btn btn-primary btn-block">Abschicken</button>
            </form>
        );
    }
}