import '../styles/app.scss';
import React, { Component } from 'react';
import { client } from '../modules/api-client';
import Header from './Header';
import Sidebar from './Sidebar';

class App extends Component {
    render() {
        return (
            <div className="apollo-container">
                <Header />
                <Sidebar />
                <div className="main">
                    <div className="col-xs-12">
                        { this.props.children }
                    </div>
                </div>
            </div>
        )
    }
};

export default App;
