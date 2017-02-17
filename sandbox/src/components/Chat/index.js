import React, { PropTypes, Component } from 'react'; 
import moment from 'moment';
export default class Chat extends Component { 
		constructor () { //constructor
	 			super(); //parent class(Component)

	 			this.state= { //new object
	 				value: '',//text that you type into input box
	 				name: '',
	 				holder:[]
	 			}; 
	 			this.handleTextSend = this.handleTextSend.bind(this);
	 			this.handleChange = this.handleChange.bind(this);
	 		}
	 		    handleChange(event) {
	    this.setState({value: event.target.value})  //setting value of this.state.value to what is typed in input box
	}

	handleTextSend(event) {  //storing chat in array
		event.preventDefault();
		if(this.state.value=='') //checking if value is empty
			return;

		this.sendAjax(this.state.name, this.state.value, this);
		this.setState({value: ''})
		this.forceUpdate();
	}

	sendAjax(name, message, self){
		var request = new XMLHttpRequest(); //create a request object
		request.onreadystatechange = function(){ //checking the status of the server
    		if(this.readyState == 4 && this.status == 200){
    			self.setState({holder: JSON.parse(this.responseText)}); //parsing the server response
    		}
		};
						
		request.open("POST", "http://localhost:4200/messagingHandler/global", true); //Creates the Post request
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //Modifies the header of the request
		request.send('user=' + name +'&message=' + message); // Sends the request to the server

	} //holds previous chats(when enter is clicked, the value of "value" is stored in holder)

	render() { 		//form for input message and send button creation)
	 	if(this.state.name == ''){
			var person = prompt("Please enter your name", this.state.name); //var person stores user input, which is name
			this.state.name=person; //setting name input from person var to the name var
			if(!person) this.state.name="Anon"; //if name is not entered, user is an anon 
		}
       	return (
       		//unordered list tag
            <div> 
            <div>
    			<ul className="messages" > 
    				{this.state.holder.map((msg, k) => { //mapping each element of holder to item in list(li) //line 62 added autofocus property(when page is rendered, focus on element)
                        return <li key={k}><span className='msgSender'>{msg.user}:</span> {msg.message} <span className='msgTimeStamp'>{moment.unix(msg.timeStamp).fromNow()}</span></li>
    				})}
   			   </ul>
			</div>
        		 <form className='form'> 
            	 <input autoFocus type="text" value={this.state.value} onChange={this.handleChange} autoComplete="off" className='msg' placeholder='Enter your message here:'/>
                 <button onClick={this.handleTextSend}></button>  
                 </form>

                 <sidebar className = 'sidebar'></sidebar>
          </div>
     	);
	}
}
