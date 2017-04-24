/**
 *  Apollo
 *  @description: Chats component
 *  @author: Out-N-In Team
 *  @license: MIT
 */

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { client } from '../../modules/api-client';
import { hasClass, addClass, removeClass } from '../../utils/DOMTools';
import jwtDecode from 'jwt-decode';

export default class Chat extends Component {
	constructor(){ 
		super();
		this.state = {
			inputText: '',
			userID: jwtDecode(localStorage.getItem('token')).uid,
			messageList: [],
			height: 199,
			width: 265,
			stream: null,
			captureState: 0
		};
		
		// Chat methods
		this.getMessages = this.getMessages.bind(this);
		this.handleChatInpChange = this.handleChatInpChange.bind(this);
		this.handleSendMessage = this.handleSendMessage.bind(this);
		this.handleMessageAdd = this.handleMessageAdd.bind(this);
		//event bus event handlers
		client.eventBusRegisterEvent('focusChat', this.getMessages);
		//add socket event handlers
		client.socketRegisterEvent("messageAdded", this.handleMessageAdd);
		client.userSetSocketID(this.state.userID);

		// File methods
		this.handleFileInput = this.handleFileInput.bind(this);

		// Camera methods
		this.enableWebcam = this.enableWebcam.bind(this);
		this.disableWebcam = this.disableWebcam.bind(this);
		this.handleTakePicture = this.handleTakePicture.bind(this);
		this.registerCameraEvents = this.registerCameraEvents.bind(this);
		this.takePicture = this.takePicture.bind(this);
		this.uploadImage = this.uploadImage.bind(this);
	}

	componentDidMount(){
		this.registerCameraEvents();
	}
	
	getMessages(){
		this.props.getMessages(this.props.sidebar.chatFocused);
	}

	handleChatInpChange(event){
		this.props.inputChange(event.target.value);
	}

	/**
	 * HandleSendMessage
	 * @description: Send the message for the given chat to the server
	 * @param: {none} 
	 * @return: {none}
	 */
	handleSendMessage(event){
		// Check for empty input
		if(!this.props.chat.inputText == '' || !this.props.sidebar.chatFocused == '') 
			this.props.sendMessage(this.props.sidebar.chatFocused, this.props.chat.inputText);
		event.preventDefault();
	}

	//from other users
	handleMessageAdd(chatID){
		console.log("PING: " + chatID);
		if(chatID == this.props.sidebar.chatFocused){
			this.getMessages();
		}
	}

	/**
	 * HandleFileChoosen
	 * @description: Get choosen file and upload it
	 * @param: {none} 
	 * @return: {none}
	 */
	handleFileChoosen(event){
		var data = new FormData();
		data.append('file', document.getElementById("file-upload").files[0]);
		// TODO:(mcervco) Handle this error visually
		client.upload(data).then((res) => {
			console.log(res.data);
		}).catch((err) => {
			console.log(err.response);
		});
	}

	/**
	 * HandleFileInput
	 * @description: Handle the file input button
	 * @param: {none} 
	 * @return: {none}
	 */
	handleFileInput(e){
		var fileInput = document.getElementById("file-upload");
		fileInput.click();
	}

	/**
	 * EnableWebcam
	 * @description: Enable the webcam
	 * @param: {none} 
	 * @return: {none}
	 */
	enableWebcam(){
		var streaming = false;
		var video = document.querySelector('#video');
		var canvas = document.querySelector('#canvas');
		this.setState({width: 265, height: 199});
		
		// Determine the vendor prefix
		navigator.getMedia = (
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia
		);
		
		var self = this;
		// Get the video stream from the webcam
		navigator.getMedia({
			video: true,
			audio: false
		}, function(stream) {
			// Handle mozilla stream
			if(navigator.mozGetUserMedia) {
				video.mozSrcObject = stream;
				self.setState({stream: stream});
			} else {
				// All other streams
				self.setState({stream: stream});
				var vendorURL = window.URL || window.webkitURL;
				video.src = vendorURL.createObjectURL(stream);
			}
			video.play();
		}, function(err) {
			console.log("Could not get the video stream from the webcam: " + err);
		});

		// Register video play event
		video.addEventListener('canplay', function(ev){
			if(!streaming){
				//self.setState({height: video.videoHeight / (video.videoWidth / self.state.width)});
				video.setAttribute('width', self.state.width);
				video.setAttribute('height', self.state.height);
				canvas.setAttribute('width', self.state.width);
				canvas.setAttribute('height', self.state.height);
				streaming = true;
			}
		}, false);
	}
	
	/**
	 * DisableWebcam
	 * @description: Disable the webcam 
	 * @param: {none} 
	 * @return: {none}
	 */
	disableWebcam(){
		this.state.stream.getTracks()[0].stop();
	}

	/**
	 * TakePicture
	 * @description: Take a still image from the webcam
	 * @param: {none} 
	 * @return: {none}
	 */
	takePicture() {
		var photo = document.querySelector("#photo");
		var video = document.querySelector("#video");
		var capture = document.querySelector('#capture')
		var captureRemove = document.querySelector('#capture-remove');
		var captureUpload = document.querySelector('#capture-upload');
		var canvas = document.querySelector('#canvas');
		// Display the photo div
		photo.style.display = "inline-block";
		// Hide the video div
		video.style.display = "none";
		this.setState({captureState: 1});
		// Hide the capture button
		capture.style.display = "none";
		// Display the options for captured photos
		captureRemove.style.display = "inline-block";
		captureUpload.style.display = "inline-block";
		// Get still image from the video and write it to the canvas element
		canvas.getContext('2d').drawImage(video, 0, 0, this.state.width, this.state.height);
		// Play camera sound
		var sound = document.getElementById("audio");
		sound.play()
		// Get image attached to the canvas
		var data = canvas.toDataURL('image/png');
		// Set the image to the photo div
		photo.setAttribute('src', data);
		// Hide the canvas
		canvas.style.display = "none";
	}

	/**
	 * UploadImage
	 * @description: Upload the still image taken to the server
	 * @param: {none} 
	 * @return: {promise} Upload image to server
	 */
	uploadImage(){
		// Get image from canvas element
		var data = document.querySelector("#canvas").toDataURL('image/png');
		document.querySelector("#photo").setAttribute('src', data);
		document.querySelector("#canvas").style.display = "none";
		
		// Code below from stackoverflow
		// http://stackoverflow.com/a/12300351	
		var byteString = atob(data.split(',')[1]);
		// separate out the mime component
		var mimeString = data.split(',')[0].split(':')[1].split(';')[0]
		// write the bytes of the string to an ArrayBuffer
		var ab = new ArrayBuffer(byteString.length);
		var ia = new Uint8Array(ab);
		for(var i = 0; i < byteString.length; i++){
			ia[i] = byteString.charCodeAt(i);
		}
		// write the ArrayBuffer to a blob, and you're done
		var blob = new Blob([ab], { type: mimeString });

		// Create Form Data instance and inject the image
		var fd = new FormData();
		fd.append('file', blob, Date.now() + '.jpg');
		return client.upload(fd);
	}

	/**
	 * HandleTakePicture
	 * @description: Handle the visual state of taking a picture
	 * @param: {none} 
	 * @return: {none}
	 */
	handleTakePicture(e){
		var chatCamera = document.querySelector(".chat-camera");
		var chatTimeline = document.querySelector(".chat-timeline");
		var captureRemove = document.querySelector("#capture-remove");
		var captureUpload = document.querySelector("#capture-upload");
		var photo = document.querySelector("#photo");
		// Hide the camera div
		if(hasClass(chatCamera, "active") && hasClass(chatTimeline, "camera-active")){
			removeClass(chatCamera, "active");
			removeClass(chatTimeline, "camera-active");
			// Disable the webcam
			this.disableWebcam();
			return;
		}
		// Show the camera div
		addClass(chatCamera, "active");
		addClass(chatTimeline, "camera-active");
		// Enable the webcam
		this.enableWebcam();
	}

	/**
	 * RegisterCameraEvents
	 * @description: Register the camera button events
	 * @param: {none} 
	 * @return: {none}
	 */
	registerCameraEvents(){
		var captureRemove = document.querySelector("#capture-remove");
		var captureUpload = document.querySelector("#capture-upload");
		var video = document.querySelector("#video");
		var photo = document.querySelector("#photo");
		var canvas = document.querySelector("#canvas");
		var capture = document.querySelector('#capture');

		var self = this;
		// Handle click event for removing captured image
		captureRemove.addEventListener('click', function(e){
			self.setState({captureState: 0});
			captureRemove.style.display = "none";
			captureUpload.style.display = "none";
			photo.style.display = "none";
			video.style.display = "inline-block";
			canvas.style.display = "none";
			capture.style.display = "inline-block";
			e.preventDefault();
		}, false);

		// Handle click event for uploading captured image
		captureUpload.addEventListener('click', function(e){
			self.setState({captureState: 0});
			captureRemove.style.display = "none";
			captureUpload.style.display = "none";
			photo.style.display = "none";
			video.style.display = "inline-block";
			canvas.style.display = "none";
			capture.style.display = "inline-block";
			// TODO:(mcervco) Figure out a visual way of saying the image upload failed
			self.uploadImage().then(function(res){
				console.log(res.data);
			}).catch(function(err){
				console.log(err.response);
			});
			e.preventDefault();
		}, false);
		
		// Handle click event for taking a picture
		capture.addEventListener('click', function(e){
			if(self.state.captureState == 0){
				self.takePicture();
			} else {
				captureRemove.style.display = "none";
				captureUpload.style.display = "none";
				photo.style.display = "none";
				video.style.display = "inline-block";
				canvas.style.display = "none";
				self.setState({captureState: 0});
			}
			e.preventDefault();
		}, false);
	}

    render() {
		return (
			<div className="content">
				<div className="chat-header">
					<div className="chat-header-fullname">Maxine Lien</div>
					<div className="chat-header-username">@m_lien</div>
				</div>
				<div className="chat-camera">
					<div className="chat-camera-container">
						<i className="fa fa-close" id="capture-remove"></i>
						<i className="fa fa-save" id="capture-upload"></i>
						<video id="video"></video>
						<canvas id="canvas" style={{display: "none"}}></canvas>
						<img src="" id="photo" alt="" style={{display: "none"}}/>
						<audio id="audio" src="https://www.soundjay.com/mechanical/camera-shutter-click-08.wav"></audio>
						<i id="capture" className="fa fa-circle-o"></i>
					</div>
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
                    <form className='form' onSubmit={this.handleSendMessage}>
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
				<span className='msgSender'>{ "\u00a0\u00a0" } </span> {this.props.msg.message} <br/> <span className='msgTimeStamp'>{moment.unix(this.props.msg.timestamp).fromNow()} </span>
			</div>
		)
	}
}


class FloatLeftChatComponent extends React.Component {
	render() {
		return (
			<div className="bubble-left">
				<span className='msgSender'> { "\u00a0\u00a0" }</span> {this.props.msg.message} <br/> <span className='msgTimeStamp'>{moment.unix(this.props.msg.timestamp).fromNow()} </span>
			</div>
		)
	}
}
