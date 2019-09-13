import React from 'react';
import {Tabs, Tab} from 'react-bootstrap-tabs';
import '../css/bootstrap.min.css';
import '../css/style.css';
//import 'bootstrap';
import * as constVal from '../const/const';

export const BannerComponent = (props) => {
	//console.log("BannerComponent",props);
	const BgImg = { backgroundImage: `url('${constVal.getImage('bgDefault')}')` };
    return (
        <React.Fragment>
        <div className="container-fluid">
        <header>
            <div className="col-md-12" id="top-bar">
                <div><a href="/"><h2>CREATE BANNERS</h2></a></div>
                <button id="btnDownloadImg" className="btn btn-outline pull-right dwnload" onClick={props.downloadBanner} title="Download Banner"></button>
            </div>
        </header>
        <section id="banner-pnl">
            <div  className="col-md-12">
					
				<div className="tab">
					<button className="tablinks" onClick={(event)=> props.toggleTabs(event, 'AD_Banner')}>AD Banner</button>
					<button className="tablinks" onClick={(event)=> props.toggleTabs(event, 'Web_Banner')}>Web Banner</button>
				</div>

				<div id="AD_Banner" className="tabcontent">
					<div  id="adBannerDiv" className="tab-pane fade in active">
						<div id="hdnBannerdisplayBanner">
						<table className="dvBannerMain BgImage AdBg"id="dvAdBanner" style={BgImg}>
						<tbody>
							<tr><td>
								<p className="dvClsImage"id="dvAdImage">
									<img id="imgAdBack"className="imgBack"src={constVal.getImage('headphone')}alt="Image1"/>									
								</p>
								<h2 className="dvAdClsText"id="dvAdText">Add a description here</h2>
								<p id="dvAdDesc">
								<span className="dvClsAction"id="dvAdAction">
									<button id="btnAdAction"className="btnClsAction btn btn-primary btn-sm">Buy now</button>
								</span></p>
							</td></tr>
							</tbody>
						</table>
						</div>
						<p id="alldisplayBanner"></p>
					</div>
				</div>

				<div id="Web_Banner" className="tabcontent">
					<div id="webBannerDiv" className="tab-pane fade in">
						<div id="hdnBanner">
							<table className=" col-md-12 webBgImage WebBg"id="dvBanner" style={BgImg}>						
								<tbody>
								<tr><td>
									<div className=" col-md-3 dvClsImage"id="dvImage">
										<img id="imgBack"className="imgBack "src={constVal.getImage('eight')} alt="Image1"/>
										<img id="imgFront"className="imgFront "src={require('../css/images/bannerProducts/headphone.png')} alt="Image2"/>
									</div>
									<div className="col-md-3"id="dvDesc">
									<h2 className="dvWebClsText"id="dvText">Add a description here</h2>
									<span className="dvClsAction"id="dvAction">
										<button id="btnAction"className="btnClsAction btn btn-primary btn-md-3">Add to cart</button>
									</span></div>
								</td></tr>
								</tbody>
							</table>
						</div>
						<p id="allBanner"></p>
					</div>
				</div>
            </div>


        <div id="chatbot" className="fixed-right-bottom">            
			<div  className="panel panel-primary">
            <div className="subheading" onClick={props.showHide}><h3>Chatbot</h3></div>                      
				<div  id="response" className="panel-body"></div>    
				<hr/>           
            <div className="col-md-12">
            <div className="form-group usr-inpt" id="usr-inpt">
                <form id="mymsg" method="POST" onSubmit={props.onFormSubmit}>
                        <input id="input" name="input" type="text" className="form-control" placeholder="Type here..." />                            
                </form>
                <button id="rec" type="button" onClick={props.switchRecognition}>
                <i className="fa fa-microphone" aria-hidden="true"></i>
                </button>
            </div>
            </div>            
			</div>
        </div>

        </section>

        </div>
        </React.Fragment>
    )
};