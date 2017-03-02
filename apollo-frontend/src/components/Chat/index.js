import React, { PropTypes, Component } from 'react'; 
import moment from 'moment';
import { client } from '../../modules/api-client';

export default class Chat extends Component { 
	constructor () { //constructor
	 	super();
	 	this.state= { //new object
	 		value: '',//text that you type into input box
	 		name: '',
	 		holder: [],
	 		friends: ['Friend1','Friend2']
        };

		this.handleTextSend = this.handleTextSend.bind(this);
	 	this.handleChange = this.handleChange.bind(this);
		this.handleMessage = this.handleMessage.bind(this);
        client.socketRegisterEvent("message", this.handleMessage);
    }
    
    handleMessage(msg) {
        this.setState({holder: JSON.parse(msg)}); //parsing the server response
    }
	
    handleChange(event) {
	    this.setState({value: event.target.value})  //setting value of this.state.value to what is typed in input box
    }

	handleTextSend(event) {  //storing chat in array
		event.preventDefault();
		if(this.state.value=='') //checking if value is empty
            return;
		client.sendMessage({user: this.state.name, message: this.state.value});	
		client.userAdd({name: 'TEST NAME'});
        //this.sendAjax(this.state.name, this.state.value, this);
		this.setState({value: ''})
        this.forceUpdate();
	}

	render() { 		//form for input message and send button creation)
	 	if(this.state.name == ''){
			var person = prompt("Please enter your name", this.state.name); //var person stores user input, which is name
			this.state.name=person; //setting name input from person var to the name var
			if(!person) this.state.name="Anon"; //if name is not entered, user is an anon 
		}

	    var sidebarContent = <b>Sidebar content</b>;

       	return (
            <div className="container" > 
            	<SideBar friends={this.state.friends} />
            	<div className="div-right">
	  				<div className="bubble-dialog">
	  					{this.state.holder.map((msg, k) => { 
            				return <ChatComponent key={k} message={msg} selfname={this.state.name} />
            			})}
					</div>
	    		 	<form className='form'> 
	        	 		<input autoFocus type="text" value={this.state.value} onChange={this.handleChange} autoComplete="off" className='msg' placeholder='Enter your message here:'/>
		             	<button onClick={this.handleTextSend}></button>  
	            	</form>
            	</div>
          	</div>
     	);
	}
}


class SideBar extends React.Component {
  render() {
    return <div className="div-left" >
        		{this.props.friends.map((friend, k) => { 
                			return <div className="sidebar-container" key={k}> <img className="img-circle" src="https://www.abeautifulsite.net/content/uploads/2014/08/rounded-image-250x250.png"/> <p className="sidebar-name"> {friend} </p> </div>
	    			})
        		}
        	</div>;
  	}
}

class ChatComponent extends React.Component{
	render(){
		if(this.props.selfname==this.props.message.user)
			return <RightChatComponent msg={this.props.message} />
		else
			return <LeftChatComponent msg={this.props.message} />
	}
}

class RightChatComponent extends React.Component{
	render(){
		return(
			<div className="bubble-right">
				<span className='msgSender'> me : &nbps; </span> {this.props.msg.message} <br/> <span className='msgTimeStamp'>{moment.unix(this.props.msg.timeStamp).fromNow()} </span>
			</div>
		)
	}
}


class LeftChatComponent extends React.Component{
	render(){
		return(
			<div className="bubble-left">
				<span className='msgSender'>{this.props.msg.user}: &nbsp;</span> {this.props.msg.message} <br/> <span className='msgTimeStamp'>{moment.unix(this.props.msg.timestamp).fromNow()} </span>
			</div>
		)
	}
}
