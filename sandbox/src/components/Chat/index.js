import React, { PropTypes, Component } from 'react'; 

export default class Chat extends Component { 
		constructor () { //constructor
	 			super(); //parent class(Component)
	 			this.state= { //new object
	 				value: '',
	 				holder:[]
	 			}; 
	 			this.handleTextSend = this.handleTextSend.bind(this);
	 			this.handleChange = this.handleChange.bind(this);
	 		}
	 		    handleChange(event) {
	    this.setState({value: event.target.value})
	}

	handleTextSend(event) {
		event.preventDefault();
		if(this.state.value=='') //resetting value of this.state.value 
			return;
		var obj = {from:'Abc', text:this.state.value};
		this.state.holder.push(obj);
		if(this.state.holder.length > 10 ) this.state.holder.shift();
		 this.setState({value: ''})
		this.forceUpdate();
	}

	 	render() { 		
       	return (
            <div> 
         <form className='form'>
            <input type="text" value={this.state.value} onChange={this.handleChange} autoComplete="off" className='msg' placeholder='message'/>
            <button onClick={this.handleTextSend}>Send</button>
        </form>
          	</div>
     	);
	}

}