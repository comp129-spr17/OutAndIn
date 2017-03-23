import React, { Component } from 'react';

export default class ReduxTest extends Component {
    constructor(){
        super();
        this.changeTheName = this.changeTheName.bind(this);
    }

    changeTheName(){
        var name = "dale";
        this.props.changeUsername(name);
    }
    render(){
        return (
            <div>
                <button onClick={this.changeTheName}></button>
                { this.props.username }
            </div>
        );
    }
}
