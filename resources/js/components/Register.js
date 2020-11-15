import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import ErrorMessage from "./UI/ErrorMessage";

export default class Register extends Component {
    state = {
        firstNameError: null,
        lastNameError: null,
        emailError: null,
        passwordError: null,
        passwordConfirmError: null
    }

    setErrorMessages = (data) => {
        this.setState({
            firstNameError: data.errors.first_name ? data.errors.first_name[0] : null,
            lastNameError: data.errors.last_name ? data.errors.last_name[0] : null,
            emailError: data.errors.email ? data.errors.email[0] : null,
            passwordError: data.errors.password ? data.errors.password[0] : null,
            passwordConfirmError: data.errors.password_confirm ? data.errors.password_confirm[0] : null
        });
        console.log(this.state);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            password: this.password,
            password_confirm: this.confirmPassword
        }

        axios.post('/api/register', data).then(
            res => {
                console.log(res);
                this.setState({
                    registered: true
                });
            }
        ).catch(
            err => {
                console.log(err.response.data.errors)
                this.setErrorMessages(err.response.data);
            }
        )
    }


    render() {
        if (this.state.registered) {
            return <Redirect to="/login" />
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Registrieren</h3>
                <div className="form-group">
                    <label>Vorname</label>
                    <input type="text" className="form-control" placeholder="Vorname" onChange={e => this.firstName = e.target.value}></input>
                    <ErrorMessage>{this.state.firstNameError}</ErrorMessage>
                </div>
                <div className="form-group">
                    <label>Nachname</label>
                    <input type="text" className="form-control" placeholder="Nachname" onChange={e => this.lastName = e.target.value}></input>
                    <ErrorMessage>{this.state.lastNameError}</ErrorMessage>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Email" onChange={e => this.email = e.target.value}></input>
                    <ErrorMessage>{this.state.emailError}</ErrorMessage>
                </div>
                <div className="form-group">
                    <label>Passwort</label>
                    <input type="password" className="form-control" placeholder="Passwort" onChange={e => this.password = e.target.value}></input>
                    <ErrorMessage>{this.state.passwordError}</ErrorMessage>
                </div>
                <div className="form-group">
                    <label>Passwort bestätigen</label>
                    <input type="password" className="form-control" placeholder="Passwort bestätigen" onChange={e => this.confirmPassword = e.target.value}></input>
                    <ErrorMessage>{this.state.passwordConfirmError}</ErrorMessage>
                </div>

                <button className="btn btn-primary btn-block">Einloggen</button>
            </form>
        );
    }

}