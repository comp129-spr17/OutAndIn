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
                name='plus-circle'
                size='2x'/>
                </div>

                <div className="sidebar-info-files">
                Files

                <FontAwesome
                className="sidebar-info-addbutton"
                name='plus-circle'
                size='2x'/>

                <FontAwesome
                className="sidebar-info-fileicon"
                name= 'file-audio-o'
                size='2x'/>

                <FontAwesome
                className="sidebar-info-fileicon"
                name='file-video-o'
                size='2x'/>
                </div>

                <div className="sidebar-info-recent">
                Recent Images & Video

                <FontAwesome
                className="sidebar-info-addbutton"
                name='plus-circle'
                size='2x'/>
                </div>

            </div>
        );
    }
}
