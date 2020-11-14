import React, { Component } from 'react';
import axios from 'axios';


export default class Forgot extends Component {
    state = {

    }

    handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: this.email
        };

        axios.post('api/forgot', data).then(
            res => {
                this.setState({
                    message: res.data.message,
                    classes: 'success'
                })
            }
        ).catch(err => {
            this.setState({
                message: err.response.data.message,
                classes: 'danger'
            })
        });
    }

    render() {
        let message = '';

        if (this.state.message) {
            const classes = "alert alert-" + this.state.classes;
            message = (
                <div className={classes} role="alert">
                    {this.state.message}
                </div>
            );
        }

        return (
            <form onSubmit={this.handleSubmit}>
                {message}
                <h3>Passwort vergessen</h3>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Email" onChange={e => this.email = e.target.value}></input>
                </div>
                <button className="btn btn-primary btn-block">Abschicken</button>
            </form>
        );
    }
}