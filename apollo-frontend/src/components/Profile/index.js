import React, { PropTypes, Component } from 'react';
import { client } from '../../modules/api-client';
import { hasClass, addClass, removeClass } from '../../utils/DOMTools';


class Header extends Component{
    render() {
        return (
            <div className='profile-header'>
            </div>
        );
    }
}


export default class Profile extends Component {
    constructor(){
        super();
        this.handleFileInput = this.handleFileInput.bind(this);
        this.registerCameraEvents = this.registerCameraEvents.bind(this);
        this.enableWebcam = this.enableWebcam.bind(this);
        this.disableWebcam = this.disableWebcam.bind(this);
        this.takePicture = this.takePicture.bind(this);
        this.handleTakePicture = this.handleTakePicture.bind(this);

    }

    componentWillMount(){
        console.log("USERID: " + this.props.userID);
        this.props.getProfile(this.props.userID);
    }

     componentDidMount(){
      $('.modal-content').hide();
        this.registerCameraEvents();

      // $('.profile-pic-icon').hide();
      // $('.profile-avatar').hover(function(){
      //   $('.profile-pic-icon').show();
      // },function(){
      //   $('.profile-pic-icon').hide();
      // });
    }




    showModal(){
      $('.modal-content').show();
    }

    hideModal(){
      $('.modal-content').hide();
    }

     handleFileInput(e){
      var fileInput = document.getElementById("file-upload");
      fileInput.click();
     }



    handleTakePicture(e){
      var chatCamera = document.querySelector(".chat-camera");
      var chatTimeline = document.querySelector(".chat-timeline");
      var captureRemove = document.querySelector("#capture-remove");
      var captureUpload = document.querySelector("#capture-upload");
      var photo = document.querySelector("#photo");
      var close = $('#cameraToggle').html();
      if(close=='Close Camera'){
        if(hasClass(chatCamera, "active") && hasClass(chatTimeline, "camera-active")){
            removeClass(chatCamera, "active");
            removeClass(chatTimeline, "camera-active");
            // Disable the webcam
            this.disableWebcam();
        }
        $('#cameraToggle').html('Open Camera');
        return;
      }
      $('#cameraToggle').html('Close Camera');

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
                <Header></Header>
                <div className='profile-container'>
                    <div >
                      <div onClick={this.showModal}>
                        <div className='profile-avatar'>
                            <i className = "profile-pic-user fa fa-user-circle-o fa-5x"> </i>
                        </div>
                      </div>
                        <div className="profile-info-container">
                            <p className='profile-name' >{this.props.profile.user.name} </p>
                            <p className='profile-handle' > {this.props.profile.user.handle} </p>
                        </div>
                    </div>
                </div>

                <div className='modal-container'>
                    <div className="modal-content">
                        <div className="modal-footer">
                          <button type="button" id="cameraToggle" className="btn btn-default" onClick={this.handleTakePicture} >Open Camera</button>
                          <button type="button" className="btn btn-default" onClick={this.handleFileInput} > Choose File </button>
                            <input style={{display: "none"}} id="file-upload" name="file" type="file" onChange={this.handleFileChoosen} />
                          <button type="button" className="btn btn-default" onClick={this.hideModal}>Close</button>
                        </div>
                    </div>
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
                <div className="chat-timeline"></div>
            </div>
        );
    }
}
