import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { client } from '../../modules/api-client';

export default class Chat extends Component {
	constructor () { //constructor
	 	super();
        this.state= { //new object
            error: 1, // username taken error
	 		value: '',//text that you type into input box
	 		username: '',
            holder: [],
            messagesEnd: ''
        };

		//bind 'this' referance
		this.handleMessage = this.handleMessage.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleTextSend = this.handleTextSend.bind(this);
		this.promptForUsername = this.promptForUsername.bind(this);
        this.handleUserInit = this.handleUserInit.bind(this);

		//add socket event handlers
        client.socketRegisterEvent("message", this.handleMessage);
        client.socketRegisterEvent("userInit", this.handleUserInit);
    }

    handleMessage(msg) {
        this.setState({holder: msg}); //parsing the server response
    }

    handleChange(event) {
	    this.setState({value: event.target.value})  //setting value of this.state.value to what is typed in input box
    }

	handleTextSend(event) {  //storing chat in array
		event.preventDefault();
		if(this.state.value=='') //checking if value is empty
            return;
        client.sendMessage({user: this.state.username, message: this.state.value});
		this.setState({value: ''})
        this.forceUpdate();
        $("html, body").animate({ scrollTop: $(document).height()}, 1000);
    }

    promptForUsername(){
        var username = " ";
        if(this.state.username == ''){
            if(!this.state.error == 1){
                username = prompt(this.state.error + "\n" + "Please enter your name", this.state.username); //var person stores user input, which is name
            } else {
                username = prompt("Please enter your name", this.state.username); //var person stores user input, which is name
            }
            if(username == null){
                return false;
            }
            client.userInit(username);
        }
    }

    handleUserInit(res){
        // Check if an error occured
        if(res["code"] == 0) {
			//success
	        var username = res["details"]["username"];
	        this.setState({username: username, error: 0});
        }
		else if(res["code"] == 1 || res["code"] == 2)
		{
			//username taken
			this.setState({username: '', error: res["code"]});
            return;
		}
    }

    render() {
        // Check if the Database is being set up
        if(this.state.error == 2){
			console.log("Render: ERROR");
            return(<div>Database Error or currently being set up</div>);
        } else if(this.state.username == '' && this.state.error == 1){
			console.log("Render: FINE");
            return (<div>{this.promptForUsername()}</div>);
        }

        return (
            <div className="page">
                <div className="row">
                    <div className="chat-timeline">
                        <div className="container" >
                            <div className="div-right">
                                <div className="bubble-dialog">
                                    {this.state.holder.map((msg, k) => {
                                        return <ChatComponent key={k} message={msg} selfname={this.state.username} />
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="chat-input">
                        <form className='form'>
                            <input autoFocus type="text" value={this.state.value} onChange={this.handleChange} autoComplete="off" className='msg' placeholder='Enter your message here:'/>
                            <button onClick={this.handleTextSend}></button>
                        </form>
                    </div>
                </div>
            </div>
     	);
	}
}

class ChatComponent extends React.Component {
	render() {
		if(this.props.selfname==this.props.message.user)
			return <RightChatComponent msg={this.props.message} />
		else
			return <LeftChatComponent msg={this.props.message} />
	}
}

class RightChatComponent extends React.Component {
	render() {
		return (
			<div className="bubble-right">
				<span className='msgSender'> me:  { "\u00a0\u00a0" } </span> {this.props.msg.message} <br/> <span className='msgTimeStamp'>{moment.unix(this.props.msg.timeStamp).fromNow()} </span>
			</div>
		)
	}
}


class LeftChatComponent extends React.Component {
	render() {
		return (
			<div className="bubble-left">
				<span className='msgSender'>{this.props.msg.user}:  { "\u00a0\u00a0" }</span> {this.props.msg.message} <br/> <span className='msgTimeStamp'>{moment.unix(this.props.msg.timeStamp).fromNow()} </span>
			</div>
		)
	}
}
