import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Landing from '../components/Landing';
import { client } from '../modules/api-client';

export default function(ComposedComponent){
	class Authenticate extends Component {
		componentWillMount(){
			var location = this.context.router.location.pathname;
			var self = this;
			client.sessionVerify().then((res) => {
				if(location == "/login" || location == "/register"){
					self.context.router.push("/");
					return;
				}
			}).catch((err) => {
				if(location == "/login" || location == "/register"){
					localStorage.removeItem("token");
					return;
				}
				if(!location == "/"){
					localStorage.removeItem("token");
					self.context.router.push("/login");
					return;
				}
			});
		}
		
		componentWillUpdate(nextProps){
			var self = this;
			client.sessionVerify().then((res) => {
				return;	
			}).catch((err) => {
				localStorage.removeItem("token");
				self.context.router.push("/login");
			});
		}

		render(){
			if(!localStorage.getItem("token")){
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

	Authenticate.contextTypes = {
		router: PropTypes.object.isRequired
	};
	
	return connect()(Authenticate);
}
