import React, { Component } from 'react';

export default class SidebarInfo extends Component {
    render() {
        return (
            <div className="sidebar-info-main">

                <div className="sidebar-info-people">
                People
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
