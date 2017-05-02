import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { client } from '../../modules/api-client';
import {hasClass, addClass, removeClass} from '../../utils/DOMTools';

/* TO PRANAV: The icon implementation is all the way at the bottom under the div "sidebar-info-inner"!*/

export default class SidebarInfo extends Component {
	constructor(){
		super();
		this.state = {
			curChat: ''
		};
		this.handlePeopleAdd = this.handlePeopleAdd.bind(this);
		this.handleFileChoosen = this.handleFileChoosen.bind(this);
		this.handleFileAdded = this.handleFileAdded.bind(this);
		this.listFiles = this.listFiles.bind(this);
		this.selectFile = this.selectFile.bind(this);

		client.socketRegisterEvent('fileAdded', this.handleFileAdded);
	}

	componentWillUpdate(nextProps, nextState){
		console.log("info prop update");
		if(nextProps.sidebar.chatFocused.uuid != this.state.curChat){
			//pull new chat people and files
			this.setState({
				curChat: nextProps.sidebar.chatFocused.uuid
			});

			console.log("GET PEOPLE: ");
			console.log(nextProps);
			this.props.getPeople(nextProps.sidebar.chatFocused.uuid);
			this.props.getFiles(nextProps.sidebar.chatFocused.uuid);
		}
	}

	//activate modal
	handlePeopleAdd(){
		console.log(this.props);
		var el = document.getElementById('new-message-modal');

		if(hasClass(el, 'active')){
			removeClass(el, 'active');
			removeClass(el, 'addPeople');
		}else{
			addClass(el, 'active');
			addClass(el, 'addPeople');
			client.eventBusDispatchEvent('modal');
		}
	}

	handleFileAdded(){
		this.props.getFiles(this.props.sidebar.chatFocused.uuid);
	}

    handleFileChoosen(e){
        console.log("CLICK: ", e.target.value);
        var data = new FormData();
        data.append('file', document.getElementById("file-upload").files[0]);
        console.log("FORM DATA: ", data.getAll('file'));
        client.upload(data, this.props.sidebar.chatFocused.uuid).then((res) => {
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

	selectFile(file){
		
	}

	listFiles(){
		var _self = this;
		console.log(this.props.info);
		const files = this.props.info.files.map(function(file){
			console.log("FILE VIEW");
			return (
				<i className="sidebar-info-fileicon fa fa-file-o" onClick={_self.selectFile(file.path)}>{file.name}</i>
			);
		});
		return (
			<div>{files}</div>
		);
	
	}

	listPeople(){
		var _self = this;

		const people = this.props.info.people.map(function(user){
			return (
				<div className="new-message-modal-users-item" >
					<div className="new-message-modal-users-item-image">
						<div className="modal-item-avatar">
							<img src={ user[0].avatar } alt="Modal Image" />
						</div>
						<div className="modal-item-status"></div>
					</div>
					<div className="modal-item-details">
						<div className="new-message-modal-users-item-name">
							<h4>{ user[0].username }</h4>
						</div>
					</div>
				</div>

			);
		});
		return (
			<div className="new-message-modal-users-found-list">{people}</div>
		);
	}

    render() {
        return (
            <div className="sidebar-info-main">
				<div className="sidebar-info-people">
					<div className="sidebar-info-people-header">
						<div className="sidebar-info-people-header-name">
							People
						</div>
						<div className="sidebar-info-people-add">
							<i onClick={this.handlePeopleAdd} className="sidebar-info-plus-button fa fa-plus-circle fa-2x"></i>
						</div>
					</div>
                	<div className="sidebar-info-inner">
									{this.listPeople()}
					</div>
                </div>
				<div className="sidebar-info-files">
					<div className="sidebar-info-files-header">
						<div className="sidebar-info-files-header-name">
							Files
						</div>
						<div className="sidebar-info-file-upload">
							<i className="sidebar-info-plus-button fa fa-plus-circle fa-2x" onClick={this.handleFileInput}></i>
							<input id="file-upload" name="file" type="file" onChange={this.handleFileChoosen} />
						</div>
					</div>
					<div className="sidebar-info-inner">
					{this.listFiles()}
                	</div>
                </div>
            </div>
        );
    }
}
