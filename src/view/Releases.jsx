import React, { Component } from 'react';

export class Releases extends Component {
    render() {
        return (
            <div>
                <h3>Releases</h3>
                <p>v0.1 Add input box and dummy logic to handle input</p>
                <p>v0.2 Pass input to backend API, which queries against dynamoDB for AI response</p>
                <hr/>
                <h3>Upcoming releases</h3>
                <p>v0.3 Add training functionality to let the AI evolve</p>
                <p>v0.4 Add probability model to pick out the best AI response</p>
            </div>
        );
    }
}