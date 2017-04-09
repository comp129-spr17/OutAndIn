import React, { Component } from 'react';

export default class SidebarInfo extends Component {
    render() {
        return (
            <div className="sidebar-info-main">

                <div className="sidebar-info-people">
                PEOPLE
                </div>

                <div className="sidebar-info-files">
                FILES
                </div>

                <div className="sidebar-info-recent">
                RECENT FILES & IMAGES
                </div>

            </div>
        );
    }
}
