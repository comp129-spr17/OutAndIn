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
			height: 199,
			width: 265,
			stream: null,
			captureState: 0
		};
		this.hasClass = this.hasClass.bind(this);
		this.addClass = this.addClass.bind(this);
		this.removeClass = this.removeClass.bind(this);

		//bind 'this' referance
		this.getMessages = this.getMessages.bind(this);
		this.handleChatInpChange = this.handleChatInpChange.bind(this);
		this.handleChatTextSend = this.handleChatTextSend.bind(this);
		this.handleMessageAdd = this.handleMessageAdd.bind(this);
		this.handleFileInput = this.handleFileInput.bind(this);
		this.enableWebcam = this.enableWebcam.bind(this);
		this.takePicture = this.takePicture.bind(this);
		this.handleTakePicture = this.handleTakePicture.bind(this);
		//event bus event handlers
		client.eventBusRegisterEvent('focusChat', this.getMessages);

		//add socket event handlers
		client.socketRegisterEvent("messageAdded", this.handleMessageAdd);

		console.log("me: " + this.state.userID);
		client.userSetSocketID(this.state.userID);
	}
	hasClass(el, className) {
	  if (el.classList)
		return el.classList.contains(className)
	  else
		return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
	}

	addClass(el, className) {
	  if (el.classList)
		el.classList.add(className)
	  else if (!hasClass(el, className)) el.className += " " + className
	}

	removeClass(el, className) {
	  if (el.classList)
		el.classList.remove(className)
	  else if (hasClass(el, className)) {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
		el.className=el.className.replace(reg, ' ')
	  }
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

	enableWebcam(){
		var streaming = false,
    	video = document.querySelector('#video'),
		canvas = document.querySelector('#canvas'),
		//photo = document.querySelector('#photo'),
		startbutton = document.querySelector('#capture');
		this.setState({width: 265, height: 199});
		console.log("WIDTH: ", this.state.width);	
		console.log("HEIGHT: ", this.state.height);	
		// Infer the vendor prefix
		navigator.getMedia = (
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia
		);
		
		var self = this;
  		navigator.getMedia({
      		video: true,
      		audio: false
    	}, function(stream) {
			if(navigator.mozGetUserMedia) {
        		video.mozSrcObject = stream;
			} else {
				self.setState({stream: stream});
        		var vendorURL = window.URL || window.webkitURL;
        		video.src = vendorURL.createObjectURL(stream);
      		}
			video.play();
    	}, function(err) {
      		console.log("An error occured! " + err);
    	});
  		video.addEventListener('canplay', function(ev) {
			if(!streaming) {
				//self.setState({height: video.videoHeight / (video.videoWidth / self.state.width)});
				video.setAttribute('width', self.state.width);
				video.setAttribute('height', self.state.height);
				canvas.setAttribute('width', self.state.width);
				canvas.setAttribute('height', self.state.height);
				streaming = true;
			}
  		}, false);
	}
  	
	takePicture() {
		document.querySelector("#photo").style.display = "inline-block";
    	document.querySelector('#video').style.display = "none";
		//document.querySelector('#canvas').style.display = "inline-block";
		this.setState({captureState: 1});
		//document.querySelector('#capture').innerText = "RETAKE";
    	document.querySelector('#canvas').width = this.state.width;
    	document.querySelector('#canvas').height = this.state.height;
    	document.querySelector('#canvas').getContext('2d').drawImage(document.querySelector("#video"), 0, 0, this.state.width, this.state.height);
		// Play camera sound
        var sound = document.getElementById("audio");
        sound.play()
		var data = document.querySelector("#canvas").toDataURL('image/png');
		document.querySelector("#photo").setAttribute('src', data);
		document.querySelector("#canvas").style.display = "none";
		var byteString = atob(data.split(',')[1]);

	  	// separate out the mime component
	  	var mimeString = data.split(',')[0].split(':')[1].split(';')[0]

	  	// write the bytes of the string to an ArrayBuffer
	  	var ab = new ArrayBuffer(byteString.length);
	  	var ia = new Uint8Array(ab);
	  	for(var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
	  	}

  		// write the ArrayBuffer to a blob, and you're done
	  	var blob = new Blob([ab], {type: mimeString});
	  	var fd = new FormData();
	  	fd.append('file', blob, Date.now() + '.jpg');
	  	client.upload(fd).then(function(res){
	 		console.log(res.data); 
	  	}).catch(function(err){
	 		console.log(err.response); 
	  	});
	}

	handleTakePicture(e){
		if(this.hasClass(document.querySelector(".chat-camera"), "active") && this.hasClass(document.querySelector(".chat-timeline"), "camera-active")){
			this.removeClass(document.querySelector(".chat-camera"), "active");
			this.removeClass(document.querySelector(".chat-timeline"), "camera-active");
			this.state.stream.getTracks()[0].stop();
			return;
		}
		this.addClass(document.querySelector(".chat-camera"), "active");
		this.addClass(document.querySelector(".chat-timeline"), "camera-active");
		this.enableWebcam();
		var self = this;
		document.querySelector("#capture").addEventListener('click', function(e){
			if(self.state.captureState == 0){
				self.takePicture();
			} else {
				document.querySelector("#photo").style.display = "none";
				document.querySelector("#video").style.display = "inline-block";
				document.querySelector("#canvas").style.display = "none";
				self.setState({captureState: 0});
				//document.querySelector("#capture").innerText= "CAPTURE";
			}
			e.preventDefault();
		}, false);
	}

    render() {
		return (
			<div className="content">
				<div className="chat-header"></div>
				<div className="chat-camera">
					<video id="video"></video>
					<canvas id="canvas" style={{display: "none"}}></canvas>
					<img src="" id="photo" alt="" style={{display: "none"}}/>
					<audio id="audio" src="https://www.soundjay.com/mechanical/camera-shutter-click-08.wav" autostart="false" ></audio>
					<i id="capture" className="fa fa-circle-o"></i>
				</div>
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
         
					   <div className="chat-input-icons">
						   <div className="chat-input-icons-container">
								<i className="chat-input-icon fa fa-paperclip fa-2x" onClick={this.handleFileInput}></i>
								<input id="file-upload" name="file" type="file" onChange={this.handleFileChoosen} />
							</div>
							<div className="chat-input-icons-container">
								<i className="chat-input-icon fa fa-camera fa-2x" onClick={this.handleTakePicture}></i>
							</div>
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
