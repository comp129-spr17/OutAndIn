import '../../styles/app.scss';
import React, { Component } from 'react';
import { client } from '../../modules/api-client';
import Header from '../Header';
import SidebarMain from '../Sidebar/main';
import SidebarInfo from '../Sidebar/info';
import NewMessageModal from '../Modals/new-message';

class Main extends Component {
    render() {
        return (
            <div className="apollo-container">
                <Header />
				<div className="main-container">
					<NewMessageModal />
                    <SidebarMain />
                    { this.props.children }
                    <SidebarInfo />
                </div>
            </div>
        )
    }
};

export default Main;
