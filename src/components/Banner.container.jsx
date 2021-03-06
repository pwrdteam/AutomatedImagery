import React, {Component} from 'react';
import html2canvas from 'html2canvas';
import {BannerComponent} from './Banner.component';
import axios from 'axios';
import * as constVal from '../const/const';
export default class BannerContainer extends Component {
    constructor(props) {
		super(props);
		this.initializeRecognition = this.initializeRecognition.bind(this);
		this.startRecognition = this.startRecognition.bind(this);
		this.stopRecognition = this.stopRecognition.bind(this);
		this.switchRecognition = this.switchRecognition.bind(this);
		this.setInput = this.setInput.bind(this);
		this.updateRec = this.updateRec.bind(this);
		this.readOutLoud = this.readOutLoud.bind(this);
		this.showHide = this.showHide.bind(this);
		this.inputKeyPress = this.inputKeyPress.bind(this);
		this.send = this.send.bind(this);
		this.setcommonResponse = this.setcommonResponse.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.IsValidJSONString = this.IsValidJSONString.bind(this);
		this.checkIsNullProps = this.checkIsNullProps.bind(this);
		this.generateBanner = this.generateBanner.bind(this);
		this.toggleTabs = this.toggleTabs.bind(this);
		this.initializeSpeech = this.initializeSpeech.bind(this);
		this.downloadBanner = this.downloadBanner.bind(this);
		this.fnhtml2canvas = this.fnhtml2canvas.bind(this);
	
		this.state = {
			isRecording: false,
			conversationMe: [],
			conversationChatBot: [],
			//recognizer: new window.webkitSpeechRecognition(),
		};
		
		}
	
		componentWillMount() {
			//console.log('componentWillMount');
		}
	
		componentDidMount() {
			this.initializeRecognition();
			setTimeout(() => {
				this.setcommonResponse("🙂 Hello, How May I Help You.","ChatBot");
				this.readOutLoud("Hello, How May I Help You.");
			}, 2000);
			//console.log('componentDidMount');
		}
		
		initializeRecognition(){
			try {
					var Speech_Recognition = new (window.SpeechRecognition ||
																	window.webkitSpeechRecognition ||
																	window.mozSpeechRecognition ||
																	window.msSpeechRecognition)();
					if (!Speech_Recognition) {
						alert('Voice mic input is not supported in this version or browser,try with different version or browser.');
						console.log("Voice mic input is not available.");						
					} else {
						this.setState((state, props) => ({
							...state.recognizer = Speech_Recognition
						}),this.initializeSpeech);						
					}
			}
			catch(error) {
			  console.error('initializeRecognition error',error);
				alert('Voice mic input is not supported in this version or browser,try with different version or browser.');
				console.log("Voice mic input is not available.");	
			}
		}
		
		initializeSpeech(){
			try {
				if(!!this.state.recognizer){
					this.state.recognizer.continuous = true;                
					this.state.recognizer.onstart = this.updateRec;
					
					this.state.recognizer.onresult = (event) => {
						let text = "";
						for (var i = event.resultIndex; i < event.results.length; ++i) {
							text += event.results[i][0].transcript;
						}
						this.setInput(text);
						this.stopRecognition();
					};
					this.state.recognizer.onerror = function(event) {
					  console.log(`Oops I got an ${event.error} error`);
					};
					this.state.recognizer.onend = this.stopRecognition;
					this.state.recognizer.lang = "en-US";
					//this.state.recognizer.interimResults = false;
					//this.state.recognizer.maxAlternatives = 1;
					//this.state.recognizer.start();
				}
			}
			catch(error) {
			  console.error('initializeSpeech error',error);
			}
		}
	
	
		startRecognition() {
			try {
				if (!!this.state.recognizer) {
					if (this.state.isRecording) {
						this.stopRecognition();
					} else {
						this.state.recognizer.start();
						this.state.isRecording = true;
						this.updateRec();						
					}
			  }
			  else{
				  alert('Voice mic input is not supported in this version or browser,try with different version or browser.');
				  console.log("Voice mic input is not available.");
			  }
			} catch (e) {
				if (e.code && e.code != 11) {
					alert('Voice mic input is not supported in this version or browser,try with different version or browser.');
					console.log("Voice mic input is not available. Error: "+e);					
				}
			}
		}
	  
		stopRecognition() {
		  if (this.state.recognizer) {
				this.state.recognizer.stop();
				this.state.recognizer.stop();
			this.state.isRecording = false;
		  }
		  this.updateRec();
		}
	  
		switchRecognition() {
		this.startRecognition();
		}
	  
		setInput(text) {
		  let inputElement = document.getElementById('input');
		  inputElement.value = text;
		  this.send();
		}
	  
		updateRec() {
		  let recElement = document.getElementById('rec');
		  let recVal = this.state.isRecording ? "..." : constVal.micIcon;
		  recElement.innerHTML = recVal;
		}
	  
		inputKeyPress(event) {
			if (event.which == 13) {
				event.preventDefault();
				this.send();
				event.currentTarget.value = '';
			}
		}
	
		onFormSubmit(event) {
			event.preventDefault();
			this.send();       
		}
	  	
		readOutLoud(message) {
			try {
				/*-----------------------------
					Speech Synthesis 
				------------------------------*/
				var speech = new SpeechSynthesisUtterance();
	
				//Set the text and voice attributes.Text can be maximum 32767 characters.
				speech.text = message;
				
				//sets the volume, accepts between [0 - 1], defaults to 1
				speech.volume = 1;
				
				//set the speed, accepts between [0.1 - 10], defaults to 1
				speech.rate = 1;
				
				//set the pitch, accepts between [0 - 2], defaults to 1
				speech.pitch = 1;
				
				//Values for the language
				speech.lang = 'en-US'
				//speech.lang = 'hi-IN'
				
				window.speechSynthesis.speak(speech);
				////window.speechSynthesis.speak(new SpeechSynthesisUtterance(message));
				
			}
			catch(error) {
				console.error('SpeechSynthesisUtterance error',error);
			}
		}
	
		send() {
		try {
			let text = document.getElementById('input').value;
			if(!text) return;
			let taResponse = document.getElementById('response');
			let body = document.getElementsByTagName('body')[0];
			document.getElementById('input').value='';
			
			this.setState((state, props) => ({
				...state,
				...state.conversationMe.push("Sender: " + text + '\r\n')
			}));
			this.setcommonResponse(text,"Me");
		
			let url = constVal.baseUrl + "query?v=20150910",
			reqData = JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" });
			const headers = {
				'Content-Type': 'application/json',
				'Authorization': "Bearer " + constVal.accessToken
			  }        
			  axios.post(url, reqData, {
			  headers: headers
			  })
			  .then((res) => {
				  console.log('res',res);
				  var respText = '';
					if(res.data.result.fulfillment.messages.length > 0){
						for(let i=0;i<=res.data.result.fulfillment.messages.length-1;i++){
							if(this.IsValidJSONString(res.data.result.fulfillment.messages[i].speech)){
								let jsonResult = JSON.parse(res.data.result.fulfillment.messages[i].speech);
								if (!this.IsValidJSONString(res.data.result.fulfillment.speech)) {
									respText += res.data.result.fulfillment.speech + '\r\n';                            
								}
								jsonResult.filter((el)=> {
									let elData='';
									delete el.attributes;
									for (var k in el) {
										if (el.hasOwnProperty(k)) {
											elData += `${k}: ${el[k]}, `;
										}
									}
									elData = elData.substr(0,elData.length-2);
									respText += elData + '\r\n\n';
								});
								// this.setState((state, props) => ({
								//     ...state,
								//     ...state.isHappyMsgCnt++
								// }));
							}else if (res.data.result.fulfillment.speech === res.data.result.fulfillment.messages[i].speech) {
								respText += res.data.result.fulfillment.messages[i].speech;
							}
							else{
								respText += res.data.result.fulfillment.messages[i].speech + '\r\n';
							}
						}
					}
					else{
						var respText = !res.data.result.fulfillment.speech?'Please try again.':res.data.result.fulfillment.speech;                
					}
					this.setcommonResponse(respText,"ChatBot");
					this.readOutLoud(respText);
					this.generateBanner(res.data);
					taResponse.scrollTop = taResponse.scrollHeight;
					body.scrollTop = body.scrollHeight;
			  })
			  .catch((err) => {
				  console.log('axios.post err',err);
				  this.setcommonResponse("Internal Server Error");
			  });
			
		} catch (error) {
			console.error('send error',error);
		}		
		}
		
	generateBanner = (data) => {
		if(data.hasOwnProperty('result') && data.result.hasOwnProperty('parameters')){
			if (Object.getOwnPropertyNames(data.result.parameters).length >= 1) {					
				let isEmpty = this.checkIsNullProps(data.result.parameters);
				if(!isEmpty){
					console.log("isEmpty All input received ",isEmpty,data.result.parameters);
					if(data.result.parameters.type.toLowerCase() === "web"){			
						if(data.result.parameters.products.length >= 2) {
							document.getElementsByClassName('tab')[0].style.display='block';
							document.getElementsByClassName("tablinks")[1].click();
							let banner = document.getElementById('hdnBanner').innerHTML,bannerReal;
							bannerReal = banner;

							bannerReal = bannerReal.replace('/static/media/bgDefault.f671bf6d.png', constVal.getImage(data.result.parameters.background));
							bannerReal = bannerReal.replace('/static/media/8.18a578a2.png', constVal.getImage(data.result.parameters.products[0].replace(' ','_')));
							bannerReal = bannerReal.replace('/static/media/headphone.dd70be78.png', constVal.getImage(data.result.parameters.products[1].replace(' ','_')));
							bannerReal = bannerReal.replace('Add a description here', 'This banner is about "'+data.result.parameters.products[0]+'" and "'+data.result.parameters.products[1]+'" products.');
							let allBanner = document.getElementById('allBanner');
							allBanner.insertAdjacentHTML('beforeend',bannerReal);

						}
					}
					else if (data.result.parameters.type.toLowerCase() === "ad"){
						if(data.result.parameters.products.length >= 1) {
							document.getElementsByClassName('tab')[0].style.display='block';
							document.getElementsByClassName("tablinks")[0].click();
							let banner = document.getElementById('hdnBannerdisplayBanner').innerHTML,bannerReal;
							bannerReal = banner;
							bannerReal = bannerReal.replace('/static/media/bgDefault.f671bf6d.png', constVal.getImage(data.result.parameters.background));
							bannerReal = bannerReal.replace('/static/media/headphone.dd70be78.png', constVal.getImage(data.result.parameters.products[0].replace(' ','_')));
							bannerReal = bannerReal.replace('Add a description here', 'This banner is about "' + data.result.parameters.products[0]+'" product.');
							let alldisplayBanner = document.getElementById('alldisplayBanner');
							alldisplayBanner.insertAdjacentHTML('beforeend',bannerReal);
						}
					}
					else {
						console.log("generateBanner Banner_Type ",data.result.parameters.type);					
					}
					window.scrollTo(0,document.getElementsByTagName('body')[0].scrollHeight);
				}
			}
		}
		else{
			console.log("Check ! I Dont get executed usually!");
		}
	}

	checkIsNullProps = (obj) => {
		let isEmpty = false;
		for (var key in obj) {
			let check = !(obj[key] !== null && obj[key] !== "");
			if (check){
				isEmpty = true;
				break;
			}
		}
		return isEmpty;
	}
	
	IsValidJSONString(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}
	
	setcommonResponse(val,from) {
		let responseElement = document.getElementById('response');
		let div = document.createElement('div');
		div.className = from==="Me" ? "ConvMe" : "ConvCB";
		div.innerHTML = from==="Me" ? `<span>${val}</span>` : `<p>${val}</p>`;
		responseElement.appendChild(div);
	}

	showHide(e){
		e.preventDefault();
		let chatbotElement = document.getElementById('chatbot');
		let currTransform = getComputedStyle(chatbotElement).transform;
		if(currTransform === constVal.fixedMatrixVal || currTransform === 'none'){
			chatbotElement.style.transform = "translateY(92%)";
		}
		else{
			chatbotElement.style.transform = constVal.fixedMatrixVal;
		}
	}
	
	toggleTabs(evt, tabId) {
		var i, tabcontent, tablinks;
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}
		tablinks = document.getElementsByClassName("tablinks");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
		}
		document.getElementById(tabId).style.display = "block";
		evt.currentTarget.className += " active";
	}
	downloadBanner(e) {
		try {
			//console.log('downloadBanner called');
			let ad = document.getElementById('AD_Banner');
			if (ad.style.display==='block') {
				let alldisplayBanner = document.getElementById('alldisplayBanner');
				for (var i = 0; i < alldisplayBanner.children.length; i++) {
					var childEle = alldisplayBanner.children[i];
					this.fnhtml2canvas(childEle);
				}				
			} else {
				let allBanner = document.getElementById('allBanner');
				for (var i = 0; i < allBanner.children.length; i++) {
					var childEle = allBanner.children[i];
					this.fnhtml2canvas(childEle);
				}
			}
		} catch (error) {
			console.log('error in downloadBanner',error);
		}
 }

 fnhtml2canvas(element){
	try {	
		html2canvas(element)
		.then(canvas=> {

			var imgageData = canvas.toDataURL("image/png");
			var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
			
			var element = document.createElement('a');
			element.setAttribute('href', newData);
			element.setAttribute('download', 'banner.jpg');

			element.style.display = 'none';
			document.body.appendChild(element);

			element.click();
			document.body.removeChild(element);		

		}).catch(error => {
			console.log('error in fnhtml2canvas html2canvas',error);
		});	
	} catch (error) {		
		console.log('error in fnhtml2canvas',error);
	}
 }


    render() {
        return (
            <React.Fragment>
							<BannerComponent
								showHide = {this.showHide}
								onFormSubmit = {this.onFormSubmit}
								switchRecognition = {this.switchRecognition}
								toggleTabs = {this.toggleTabs}
								downloadBanner = {this.downloadBanner}
							/>
            </React.Fragment>

        )
    }
}