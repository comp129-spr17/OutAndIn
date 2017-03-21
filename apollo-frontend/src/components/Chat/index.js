import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { client } from '../../modules/api-client';

export default class Chat extends Component {
	constructor () { //constructor
	 	super();
        this.state= { //new object
            error: 1, // username taken error
	 		inputChatText: '',//text that you type into input box
	 		userID: -1,
            messageList: [],
            messagesEnd: ''
        };

		//bind 'this' referance
		this.userInit = this.userInit.bind(this);

		this.handleChatInpChange = this.handleChatInpChange.bind(this);
		this.handleChatTextSend = this.handleChatTextSend.bind(this);
		this.handleChatDetails = this.handleChatDetails.bind(this);
		this.handleMessageAdd = this.handleMessageAdd.bind(this);
		this.handleUserInit = this.handleUserInit.bind(this);

		//add socket event handlers
		client.socketRegisterEvent("chatDetails", this.handleChatDetails);
		client.socketRegisterEvent("messageAdd", this.handleMessageAdd);
		client.socketRegisterEvent("userInit", this.handleUserInit);

    }

	userInit(){
		var username = "";
		if(this.state.userID == -1){
			if(!this.state.error == 1){
				username = prompt(this.state.error + "\n" + "Please enter your name", username); //var person stores user input, which is name
			} else {
				username = prompt("Please enter your name", username); //var person stores user input, which is name
			}
			if(username == null){
				return false;
			}

			client.userInit({username: username}).then((res) =>{
				if(res.header.code == 0){
					//fine
				}else {
					//username already taken
					this.userInit();
				}
				this.setState({
					userID: res.body.id,
					error: res.header.code
				});
			});
		}
	}

    handleChatInpChange(event){
	    this.setState({inputChatText: event.target.value})  //setting value of this.state.value to what is typed in input box
    }

	handleChatTextSend(event){  	//storing chat in array
		event.preventDefault();
		if(this.state.inputChatText=='') //checking if value is empty
            return;
        client.messageAdd({user: this.state.userID, message: this.state.inputChatText});
		this.setState({inputChatText: ''});
        this.forceUpdate();

        //$("html, body").animate({ scrollTop: $(document).height()}, 1000);
    }

	handleUserInit(msg){
		if(msg.header.code == 0)
		{
			console.log("YEE");
			//get user data
			client.userDetails({id:this.state.userID});
		}
		else
		{
			console.log("SHEE");
			//username already taken
			this.userInit();
		}

		this.setState({
			userID: msg.body.userID,
			error: msg.header.code
		});
	}

	handleChatDetails(msg){
		this.setState({messageList: msg['body']['chat'].messages}); //parsing the server response
	}

	handleMessageAdd(msg) {
		client.chatDetails({
			id: msg['chat']
		});
	}

    render() {
        // Check if the Database is being set up
        if(this.state.error == 2){
            return(<div>Database Error or currently being set up</div>);
        } else if(this.state.userID == -1 && this.state.error == 1){
            return (<div>{this.userInit()}</div>);
        }

  return (
            <div className="content">
                <div className="chat-timeline">
                    <div className="div-right">
                        <div className="bubble-dialog">
                            {
								this.state.messageList.map((msg, k) => {
                                	return < ChatDirectionComponent key={k} message={msg} selfname={this.state.username} />
                            	})
							}
                        </div>
                    </div>
                </div>
                <div className="chat-input">
                    <form className='form'>
                        <input autoFocus type="text" value={this.state.inputChatText} onChange={this.handleChatInpChange} autoComplete="off" className='msg' placeholder='Type your message ...'/>
                    </form>
                </div>
            </div>
     	);
	}
}

class ChatDirectionComponent extends React.Component {
	render() {
		if(this.props.selfname==this.props.message.user)
			return <FloatRightChatComponent msg={this.props.message} />
		else
			return <FloatLeftChatComponent msg={this.props.message} />
	}
}

class FloatRightChatComponent extends React.Component {
	render() {
		return (
			<div className="bubble-right">
				<span className='msgSender'> me:  { "\u00a0\u00a0" } </span> {this.props.msg.message} <br/> <span className='msgTimeStamp'>{moment.unix(this.props.msg.timeStamp).fromNow()} </span>
			</div>
		)
	}
}


class FloatLeftChatComponent extends React.Component {
	render() {
		return (
			<div className="bubble-left">
				<span className='msgSender'>{this.props.msg.user}:  { "\u00a0\u00a0" }</span> {this.props.msg.message} <br/> <span className='msgTimeStamp'>{moment.unix(this.props.msg.timeStamp).fromNow()} </span>
			</div>
		)
	}
}
