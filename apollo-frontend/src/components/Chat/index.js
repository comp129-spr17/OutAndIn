import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { client } from '../../modules/api-client';

var jwt_decode = require('jwt-decode');

export default class Chat extends Component {
	constructor () { //constructor
		super();
		this.state= { //new object
			inputChatText: '',//text that you type into input box
			userID: jwt_decode(localStorage.getItem('token')).uid,
			messageList: [],
		};

		//bind 'this' referance
		this.handleChatInpChange = this.handleChatInpChange.bind(this);
		this.handleChatTextSend = this.handleChatTextSend.bind(this);
		this.handleChatDetails = this.handleChatDetails.bind(this);
		this.handleMessageAdd = this.handleMessageAdd.bind(this);
		this.handleChatFocusUpdate = this.handleChatFocusUpdate.bind(this);

		//event bus event handlers
		client.eventBusRegisterEvent('focusChat', this.handleChatFocusUpdate);
		
		//add socket event handlers
		client.socketRegisterEvent("messageAdded", this.handleMessageAdd);

		console.log("me: " + this.state.userID);
		
		client.userSetSocketID(this.state.userID);
		client.usersGetAll().then((u) =>{
			console.log('u');
			console.log(u);
		}).catch((err) =>{});
	}

	handleChatFocusUpdate(){
		var chatID = localStorage.getItem('focusChat');
		console.log('building msgs: ' + chatID);
		client.chatGetMessage(chatID).then((messages) => {
			//update messagelist
			console.log("msg");
			console.log(messages);
			this.setState({
				messageList: messages.data.results
			});
		}).catch((err) => {
			console.log('err 1');
		});
	}

	handleChatInpChange(event){
		this.props.inputChange(event.target.value);
		this.setState({inputChatText: event.target.value})  //setting value of this.state.value to what is typed in input box
	}

	handleChatTextSend(event){  	//storing chat in array
		event.preventDefault();
		if(this.state.inputChatText=='') //checking if value is empty
			return;

		//this.props.sendMessage(this.props.chat.inputText);
		client.chatAddMessage(
			localStorage.getItem('focusChat'),
			this.state.inputChatText
		).then((msg) => {
			console.log('msg');
			console.log(msg);
			this.setState({inputChatText: ''});
			this.forceUpdate();
			client.eventBusDispatchEvent("focusChat");
		}).catch((err) => {
			console.log('Err: ' + err);
		});
	}

	handleChatDetails(msg){
		this.setState({messageList: msg['body']['chat'].messages}); //parsing the server response
	}

	handleMessageAdd(chatID) {
		console.log("PING!: " + chatID);
		if(chatID == localStorage.getItem("focusChat")){
			this.handleChatFocusUpdate();
		}
	}

    render() {
		return (
			<div className="content">
				<div className="chat-header"></div>
                <div className="chat-timeline">
                    <div className="div-right">
                        <div className="bubble-dialog">
                            {
								this.state.messageList.map((msg, k) => {
                                	return <ChatDirectionComponent key={k} message={msg} userID={this.state.userID} />
                            	})
							}
                        </div>
                    </div>
                </div>
                <div className="chat-input">
                    <form className='form' onSubmit={this.handleChatTextSend}>
                       <input autoFocus type="text" value={this.state.inputChatText} onChange={this.handleChatInpChange} autoComplete="off" className='msg' placeholder='Type a message ...'/>
         
                    	<div className="chatIcons">
                    	<i className="chatImage fa fa-paperclip fa-2x"></i>
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
