import React, { Component } from 'react';
import { Resources } from './Resources';
import { Releases } from './Releases';
import { Chatbot } from './Chatbot';

export default class App extends Component {
    render() {
        const {title} = this.props;
        return (
            <div>
                <h1>{title}</h1>
                <p>Welcome to {title} v0.0</p>
                <Chatbot />
                <hr/>
                <Releases />
                <hr/>
                <Resources />
                <hr/>
            </div>
        );
    }
}