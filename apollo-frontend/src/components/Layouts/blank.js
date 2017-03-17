import '../../styles/app.scss';
import React, { Component } from 'react';
import { client } from '../../modules/api-client';
import Header from '../Header';

class Blank extends Component {
    render() {
        return (
            <div className="apollo-container">
                <div className="col-xs-12">
                    { this.props.children }
                </div>
            </div>
        )
    }
};

export default Blank;
