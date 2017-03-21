import React, { Component } from 'react';
import { connect } from 'react-redux';
import { usersCreate } from '../../actions/users';

class ReduxTest extends Component {
    componentWillMount(){
        console.log(this.props);
    }
    componentDidMount(){
        this.props.createUser("apollo");
    }

    render(){
        return (
            <div>
                { this.state.username }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (username) => dispatch(usersCreate(username))
    };
};

const mapStateToProps = (state) => {
    return {
        username: state.username
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTest);
