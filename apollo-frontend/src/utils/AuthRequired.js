import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Landing from '../components/Landing';

export default function(ComposedComponent){
	class Authenticate extends Component {
		componentWillMount(){
			if(!localStorage.getItem("token") && !this.context.router.location.pathname == "/"){
				this.context.router.push("/login");
			}	
		}
		
		componentWillUpdate(nextProps){
			if(!localStorage.getItem("token")){
				this.context.router.push("/");
			}	
		}

		render(){
			if(this.context.router.location.pathname == "/" && !this.props.isAuthenticated && !localStorage.getItem("token")){
				return (
					<Landing { ...this.props } />
				);	
			} else {
				return (
					<ComposedComponent { ...this.props } />
				);
			}
		}
	}

	Authenticate.propTypes = {
		isAuthenticated: PropTypes.bool.isRequired	
	};

	Authenticate.contextTypes = {
		router: PropTypes.object.isRequired
	};

	function mapStateToProps(state){
		return {
			isAuthenticated: state.login.isAuthenticated
		};
	}
	
	return connect(mapStateToProps, null)(Authenticate);
}
