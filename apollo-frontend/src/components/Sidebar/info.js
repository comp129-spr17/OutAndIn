import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { client } from '../../modules/api-client';

export default class SidebarInfo extends Component {
    /*constructor() {
        super();

    this.handleMessageAdd = this.handleMessageAdd.bind(this);

    }*/

    handleFileChoosen(e){
        console.log("CLICK: ", e.target.value);
        var data = new FormData();
        data.append('file', document.getElementById("file-upload").files[0]);
        console.log("FORM DATA: ", data.getAll('file'));
        client.upload(data).then((res) => {
            console.log(res.data);  
        }).catch((err) => {
            console.log(err.response);  
        });
    }

    handleFileInput(e){
        console.log("CLICK: ", e.target.value);
        let fileInput = document.getElementById("file-upload");
        fileInput.click();
    }

    render() {
        return (
            <div className="sidebar-info-main">
				<div className="sidebar-info-people">
                	People
					<i className="sidebar-info-plus-button fa fa-plus-circle fa-2x"></i>
                	<div className="sidebar-info-inner"></div>
                </div>
				<div className="sidebar-info-files">
					<div className="sidebar-info-files-header">
						<div className="sidebar-info-files-name">
							Files
						</div>
						<div className="sidebar-info-file-upload">
							<i className="sidebar-info-plus-button fa fa-plus-circle fa-2x" onClick={this.handleFileInput}></i>
							<input id="file-upload" name="file" type="file" onChange={this.handleFileChoosen} />
						</div>
					</div>
					<div className="sidebar-info-inner">
						<i className="sidebar-info-fileicon fa fa-file-audio-o fa-2x"></i>
						<i className="sidebar-info-fileicon fa fa-file-video-o fa-2x"></i>
                        <i className="sidebar-info-fileicon fa fa-file-video-o fa-2x"></i>
                	</div>
                </div>
            </div>
        );
    }
}
