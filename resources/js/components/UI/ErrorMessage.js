import React, { Component } from 'react';

class ErrorMessage extends Component {

    render() {
        let message = null;
        if (this.props.children != null) {
            message = (
                <div className="alert alert-danger" role="alert">
                    {this.props.children}
                </div>
            )
        }
        return message;

    }

}

export default ErrorMessage;