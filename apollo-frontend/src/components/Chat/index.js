import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { client } from '../../modules/api-client';

var jwt_decode = require('jwt-decode');

export default class Chat extends Component {
	constructor () { //constructor
		super();
		this.state= { //new object
			inputText: '',//text that you type into input box
			userID: jwt_decode(localStorage.getItem('token')).uid,
			messageList: [],
		};

		//bind 'this' referance
		this.getMessages = this.getMessages.bind(this);
		this.handleChatInpChange = this.handleChatInpChange.bind(this);
		this.handleChatTextSend = this.handleChatTextSend.bind(this);
		this.handleMessageAdd = this.handleMessageAdd.bind(this);
		this.handleFileInput = this.handleFileInput.bind(this);
		//event bus event handlers
		client.eventBusRegisterEvent('focusChat', this.getMessages);

		//add socket event handlers
		client.socketRegisterEvent("messageAdded", this.handleMessageAdd);

		console.log("me: " + this.state.userID);
		client.userSetSocketID(this.state.userID);
	}

	getMessages(){
		this.props.getMessages(this.props.sidebar.chatFocused);
	}

	handleChatInpChange(event){
		this.props.inputChange(event.target.value);
	}

	handleChatTextSend(event){  	//storing chat in array
		event.preventDefault();
		if(this.props.chat.inputText == '' || this.props.sidebar.chatFocused == '') //checking if value is empty
			return;
		this.props.sendMessage(this.props.sidebar.chatFocused, this.props.chat.inputText);
	}

	//from other users
	handleMessageAdd(chatID){
		console.log("PING: " + chatID);
		if(chatID == this.props.sidebar.chatFocused){
			this.getMessages();
		}
	}

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
			<div className="content">
				<div className="chat-header"></div>
                <div className="chat-timeline">
                    <div className="div-right">
                        <div className="bubble-dialog">
                            {
								this.props.chat.messages.map((msg, k) => {
                                	return <ChatDirectionComponent key={k} message={msg} userID={this.state.userID} />
                            	})
							}
                        </div>
                    </div>
                </div>
                <div className="chat-input">
                    <form className='form' onSubmit={this.handleChatTextSend}>
                       <input autoFocus type="text" value={this.props.chat.inputText} onChange={this.handleChatInpChange} autoComplete="off" className='msg' placeholder='Type a message ...'/>
         
                    	<div className="chatIcons">
							<i className="chatImage fa fa-paperclip fa-2x" onClick={this.handleFileInput}></i>
							<input id="file-upload" name="file" style={{maxWidth: 0, opacity: 0, height: 0}} type="file" onChange={this.handleFileChoosen} />
                    	</div>
					    
					</form>
                </div>
            </div>
     	);
	}
}

class ChatDirectionComponent extends React.Component {
	render() {
		if(this.props.userID==this.props.message.created_by)
			return <FloatRightChatComponent msg={this.props.message} />
		else
			return <FloatLeftChatComponent msg={this.props.message} />
	}
}

class FloatRightChatComponent extends React.Component {
	render() {
		return (
			<div className="bubble-right">
				<span className='msgSender'>{ "\u00a0\u00a0" } </span> {this.props.msg.message} <br/> <span className='msgTimeStamp'>{moment.unix(this.props.msg.timeStamp).fromNow()} </span>
			</div>
		)
	}
}


class FloatLeftChatComponent extends React.Component {
	render() {
		return (
			<div className="bubble-left">
				<span className='msgSender'> { "\u00a0\u00a0" }</span> {this.props.msg.message} <br/> <span className='msgTimeStamp'>{moment.unix(this.props.msg.timeStamp).fromNow()} </span>
			</div>
		)
	}
}
