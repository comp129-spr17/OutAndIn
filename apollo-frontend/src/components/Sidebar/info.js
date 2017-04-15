import React, { Component } from 'react';

export default class SidebarInfo extends Component {
    /*constructor() {
        super();
        this.state = {
            people: [],
            files: [],
            AddtoChatModalState: 0
        };

        this.toggleAddtoChatModal = this.toggleAddtoChatModal.bind(this);

        client.socketRegisterEvent('userAdded', this.handleUserAdded);
    } <<< Need to add onto this, not working atm. */

    render() {
        return (
            <div className="sidebar-info-main">
				<div className="sidebar-info-people">
                	People
					<i className="sidebar-info-addbutton fa fa-plus-circle fa-2x"></i>
                	<div className="sidebar-info-inner"></div>
                </div>
                <div className="sidebar-info-files">
                	Files
					<i className="sidebar-info-addbutton fa fa-plus-circle fa-2x"></i>
                	<div className="sidebar-info-inner">
						<i className="sidebar-info-fileiconaudio fa fa-file-audio-o fa-2x"></i>
						<i className="sidebar-info-fileiconaudio fa fa-file-audio-o fa-2x"></i>
						<i className="sidebar-info-fileiconaudio fa fa-file-audio-o fa-2x"></i>

                	</div>
                </div>
            </div>
        );
    }
}
