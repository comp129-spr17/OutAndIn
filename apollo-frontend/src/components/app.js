import '../assets/scss/base.scss';
import React, { Component } from 'react';
import { client } from '../modules/api-client';

class App extends Component {
    constructor(){
        super();
        this.data = "";
    }

    componentDidMount(){
        client.usersGetAll().then((res) => {
            this.setState({data: res.data});
            console.log(res.data);
        }).catch((err) => { 
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <div> {this.data} </div>
                { this.props.children }
            </div>
        )
    }
};

export default App;
