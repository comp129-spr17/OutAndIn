import '../../styles/app.scss';
import React, { Component } from 'react';
import { client } from '../../modules/api-client';
import Header from '../Header';

class Blank extends Component {
    render() {
        return (
            <div className="apollo-container">
                { this.props.children }
            </div>
        )
    }
};

export default Blank;
