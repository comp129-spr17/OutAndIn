import React, { PropTypes, Component } from 'react'; 

export default class Chat extends Component { 
		constructor () { //constructor
	 			super(); //parent class(Component)
	 			this.state= { //new object
	 				value: '',//text that you type into input box
	 				name: '',
	 				holder:[] //holds previous chats(when enter is clicked, the value of "value" is stored in holder)
	 			}; 
	 			this.handleTextSend = this.handleTextSend.bind(this);
	 			this.handleChange = this.handleChange.bind(this);
	 		}
	 		    handleChange(event) {
	    this.setState({value: event.target.value})
	}

	handleTextSend(event) {
		event.preventDefault();
		if(this.state.value=='') //checking if value is empty
			return;
		var obj = {from: this.state.name, text:this.state.value};
		this.state.holder.push(obj);
		if(this.state.holder.length > 10 ) this.state.holder.shift(); //holds last ten chats 
		 this.setState({value: ''})
		this.forceUpdate();
	}

	 	render() { 		//form for input message and send button creation)
	 		if(this.state.name == ''){
				var person = prompt("Please enter your name", this.state.name);
				this.state.name=person;
			if(!person) this.state.name="Anon";
		}
       	return (
            <div> 
            <div>
    			<ul className="messages" >
    				{this.state.holder.map((msg, k) => {
    				return <li key={k}><span className='msgSender'>{msg.from}:</span> {msg.text}</li>
    				})}
   			   </ul>
			</div>
        		 <form className='form'> 
            	 <input type="text" value={this.state.value} onChange={this.handleChange} autoComplete="off" className='msg' placeholder='message'/>
                 <button onClick={this.handleTextSend}>Send</button>  
                 </form>
          </div>
     	);
	}

}