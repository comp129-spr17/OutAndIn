import '../assets/scss/base.scss';
import React, { Component } from 'react';
import { client } from '../modules/api-client';

class App extends Component {
    render() {
        return (
            <div>
                <h1>Apollo is working and running using {this.props.name}</h1>
                <button onClick={this.handleTextSend}></button>
            </div>
        )
    }
};

export default App;
