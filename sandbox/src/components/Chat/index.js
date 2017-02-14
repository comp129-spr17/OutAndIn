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
	    this.setState({value: event.target.value})  //setting value of this.state.value to what is typed in input box
	}

	handleTextSend(event) {  //storing chat in array
		event.preventDefault();
		if(this.state.value=='') //checking if value is empty
			return;
		var obj = {from: this.state.name, text:this.state.value};
		this.state.holder.push(obj);  //pushing name of sender and chat in array (add to array)
		if(this.state.holder.length > 10 ) this.state.holder.shift(); //holds last ten chats. If size is greater than 10, popping oldest message every time a new one is sent(remove from array).
		 this.setState({value: ''})
		this.forceUpdate();
	}

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
    				{this.state.holder.map((msg, k) => { //mapping each element of holder to item in list(li)
    				return <li key={k}><span className='msgSender'>{msg.from}:</span> {msg.text}</li>
    				})}
   			   </ul>
			</div>
        		 <form className='form'> 
            	 <input type="text" value={this.state.value} onChange={this.handleChange} autoComplete="off" className='msg' placeholder='message'/>
                 <button onClick={this.handleTextSend}>Send</button>  
                 </form>

                 <sidebar className = 'sidebar'></sidebar>
          </div>
     	);
	}

}