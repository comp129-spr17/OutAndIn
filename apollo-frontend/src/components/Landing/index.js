import React, { PropTypes, Component } from 'react'; 
import { Link } from 'react-router';
import { client } from '../../modules/api-client';

export default class Landing extends Component {
    render(){
        return (
            <div className="landing">
                <div className="landing-overlay"></div>
                <div className="landing-container">
                    <div className="landing-form-container">
                        <div className="landing-form">            
                            <div className="landing-brand-container">
                                <div className="landing-logo">
                                    <img src="/img/logo.png"/>
                                </div>
                                <div className="landing-logo-name">
                                    <span>Apollo</span>
                                </div>
                            </div>
                            <div className="landing-slogan">
                                Messaging Made Easy
                            </div>
                            <div className="landing-actions-container">
                                <div className="landing-actions">
                                    <div className="landing-actions-button-left">
										<Link to="/register" className="btn btn-md">Register</Link>
                                    </div>
                                    <div className="landing-actions-button-right">
										<Link to="/login" className="btn btn-md">Log In</Link>
                                    </div>
                                    <hr/>
                                    <div className="landing-actions-forgot-password">
                                        Forgot your password? <a href="">Click Here</a>
                                    </div>
                                </div>
                            </div>
                            <div className="landing-footer">
                                Apollo © 2017
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        )    
    }
}
