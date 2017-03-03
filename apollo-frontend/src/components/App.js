import '../assets/scss/base.scss';
import React, { Component } from 'react';
import { client } from '../modules/api-client';

class App extends Component {
    render() {
        return (
            <div>
                <div>{this.props.children}</div>
            </div>
        )
    }
};

export default App;
