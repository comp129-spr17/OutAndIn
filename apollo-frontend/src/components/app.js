import '../assets/scss/base.scss';
import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
            <div>
		        <h1>Apollo is working and running using {this.props.name}</h1>
            </div>
        )
  }
};

export default App;
