import React, { Component } from 'react';
var FontAwesome = require('react-fontawesome');

export default class SidebarInfo extends Component {
    render() {
        return (
            <div className="sidebar-info-main">

                <div className="sidebar-info-people">
                People
                <FontAwesome
                className="sidebar-info-addbutton"
                name='plus-circle' />
                </div>

                <div className="sidebar-info-files">
                Files
                </div>

                <div className="sidebar-info-recent">
                Recent Images & Video
                </div>

            </div>
        );
    }
}
