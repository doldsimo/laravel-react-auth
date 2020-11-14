import React, { Component } from "react";
import axios from "axios";

export default class Register extends Component {
    state = {

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
            }
        ).catch(
            err => {
                this.setState({
                    message: err.response.data.message
                })
            }
        )
    }


    render() {
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
                <h3>Einloggen</h3>
                <div className="form-group">
                    <label>Vorname</label>
                    <input type="text" className="form-control" placeholder="Vorname" onChange={e => this.firstName = e.target.value}></input>
                </div>
                <div className="form-group">
                    <label>Nachname</label>
                    <input type="text" className="form-control" placeholder="Nachname" onChange={e => this.lastName = e.target.value}></input>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Email" onChange={e => this.email = e.target.value}></input>
                </div>
                <div className="form-group">
                    <label>Passwort</label>
                    <input type="password" className="form-control" placeholder="Passwort" onChange={e => this.password = e.target.value}></input>
                </div>
                <div className="form-group">
                    <label>Passwort bestätigen</label>
                    <input type="password" className="form-control" placeholder="Passwort bestätigen" onChange={e => this.confirmPassword = e.target.value}></input>
                </div>

                <button className="btn btn-primary btn-block">Einloggen</button>
            </form>
        );
    }

}