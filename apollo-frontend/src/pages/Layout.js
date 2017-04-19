import '../styles/app.scss';
import React, { Component } from 'react';
import { client } from '../modules/api-client';
import Header from '../components/Header';
import SidebarMain from '../pages/Sidebar';
import SidebarInfo from '../components/Sidebar/info';
import NewMessageModal from '../components/Modals/new-message';

class Layout extends Component {
	render() {
        return (
            <div>
                <Header />
				<div className="main-container">
					<NewMessageModal />
                    <SidebarMain />
					{ this.props.children }
					<SidebarInfo />
                </div>
            </div>
		);
    }
};

export default Layout;
