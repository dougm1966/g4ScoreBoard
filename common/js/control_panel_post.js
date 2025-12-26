'use strict';
//  G4ScoreBoard addon for OBS Copyright 2022-2025 Norman Gholson IV
//  https://g4billiards.com http://www.g4creations.com
//  this is a purely javascript/html/css driven scoreboard system for OBS Studio
//  free to use and modify and use as long as this copyright statment remains intact. 
//  Salotto logo is the copyright of Salotto and is used with their permission.
//  for more information about Salotto please visit https://salotto.app

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// variable declarations
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	var scoreAmount = 1; // Depreciated, change is now done via control panel gui
	var cLogoName = "Custom";  // 13 character limit. it will auto trim to 13 characters.
	const bc = new BroadcastChannel('g4-main');
	const bcr = new BroadcastChannel('g4-recv'); // return channel from browser_source 
	var hotkeyP1ScoreUp;
	var hotkeyP1ScoreDown;
	var hotkeyP2ScoreUp;
	var hotkeyP2ScoreDown;
	var hotkeyScoreReset;
	var hotkeyP1Extension;
	var hotkeyP2Extension;
	var hotkey30Clock;
	var hotkey60Clock;
	var hotkeyStopClock;
	var hotkeySwap;
	var hotkeyP1ScoreUpOld = hotkeyP1ScoreUp;
	var hotkeyP2ScoreUpOld = hotkeyP2ScoreUp;
	var hotkeyP1ScoreDownOld = hotkeyP1ScoreDown;
	var hotkeyP2ScoreDownOld = hotkeyP2ScoreDown;
	var hotkeyScoreResetOld = hotkeyScoreReset;
	var hotkeyP1ExtensionOld = hotkeyP1Extension;
	var hotkeyP2ExtensionOld = hotkeyP2Extension;
	var hotkey30ClockOld = hotkey30Clock;
	var hotkey60ClockOld = hotkey60Clock;
	var hotkeyStopClockOld = hotkeyStopClock;
	var hotkeySwapOld = hotkeySwap;
	var tev;
	var p1ScoreValue;
	var p2ScoreValue;
	var warningBeep = new Audio("./common/sound/beep2.mp3");
	var foulSound = new Audio("./common/sound/buzz.mp3");
	var timerIsRunning;
	var msg;
	var msg2;
	var racemsg;
	var wagermsg;
	var slider = document.getElementById("scoreOpacity");
	var sliderValue;
	var countDownTime;
	var shotClockxr = null;
	var playerNumber;
	var p1namemsg;
	var p2namemsg;
	var playerx;
	var c1value;
	var c2value;
	var pColormsg;
	var leftSponsorLogo;
	var rightSponsorLogo;
	var leftSponsorLabel;
	var rightSponsorLabel;
				
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// onload stuff
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Purge legacy sponsor logo keys (removed permanently)
	localStorage.removeItem("useSalotto");
	localStorage.removeItem("useCustomLogo");
	localStorage.removeItem("customLogo0");
	localStorage.removeItem("customLogo4");
	localStorage.removeItem("clogoNameStored");
	localStorage.removeItem("sallogoNameStored");

	slider.oninput = function() {
			sliderValue = this.value/100;
			bc.postMessage({opacity:sliderValue});
			}

	document.getElementById('settingsBox2').onclick = function() { 
			document.getElementById('settingsBox2').style.border = "1px solid blue";
			document.getElementById('FileUploadL4').click();
			setTimeout(rst_scr_btn,100);
			};
			
		document.getElementById('logoSsImg1').onclick = function() { 
			document.getElementById('logoSsImg1').style.border = "1px solid blue";
			document.getElementById('FileUploadL1').click();
			setTimeout(rst_scr_btn,100);
			};	
		
		document.getElementById('logoSsImg2').onclick = function() { 
			document.getElementById('logoSsImg2').style.border = "1px solid blue";
			document.getElementById('FileUploadL2').click();
			setTimeout(rst_scr_btn,100);
			};				
			
		document.getElementById('logoSsImg3').onclick = function() { 
			document.getElementById('logoSsImg3').style.border = "1px solid blue";
			document.getElementById('FileUploadL3').click();
			setTimeout(rst_scr_btn,100);
			};

		document.getElementById('settingsBox4').onclick = function() {
			document.getElementById('settingsBox4').style.border = "1px solid blue";
			document.getElementById('FileUploadL0').click();
			setTimeout(rst_scr_btn,100);
			};

	document.getElementById('p1PhotoBtn').onclick = function() {
			document.getElementById('p1PhotoBtn').style.border = "1px solid blue";
			document.getElementById('FileUploadP1Photo').click();
			setTimeout(function() { document.getElementById('p1PhotoBtn').style.border = "none"; }, 100);
			};

	document.getElementById('p2PhotoBtn').onclick = function() {
			document.getElementById('p2PhotoBtn').style.border = "1px solid blue";
			document.getElementById('FileUploadP2Photo').click();
			setTimeout(function() { document.getElementById('p2PhotoBtn').style.border = "none"; }, 100);
			};

	// Update "All" checkbox based on individual settings
	updateAllCheckbox();

	if (localStorage.getItem('p1colorSet') !== null) {
		var cvalue = localStorage.getItem('p1colorSet');
		document.getElementById('p1colorDiv').style.background = localStorage.getItem('p1colorSet');
		document.getElementsByTagName("select")[0].options[0].value = cvalue;
		if (cvalue == "orange"  || cvalue == "khaki"  || cvalue == "tomato" || cvalue == "red" || cvalue == "white" || cvalue == "orangered" || cvalue == "orange" || cvalue == "lightgreen" || cvalue == "lightseagreen")  { document.getElementById("p1colorDiv").style.color= "#000";} else { document.getElementById("p1colorDiv").style.color= "lightgrey";};

	}

	if (localStorage.getItem('p2colorSet') !== null) {
		var cvalue = localStorage.getItem('p2colorSet');
		document.getElementById('p2colorDiv').style.background = localStorage.getItem('p2colorSet');
		if (cvalue == "orange"  || cvalue == "khaki"  || cvalue == "tomato" || cvalue == "red" || cvalue == "orangered" || cvalue == "white" || cvalue == "orange" || cvalue == "lightgreen" || cvalue == "lightseagreen")  { document.getElementById("p2colorDiv").style.color= "#000";} else { document.getElementById("p2colorDiv").style.color= "lightgrey";};

	}

	if (localStorage.getItem('p1ScoreCtrlPanel') > 0 || localStorage.getItem('p1ScoreCtrlPanel') == "" ) {
		p1ScoreValue = localStorage.getItem('p1ScoreCtrlPanel');
		msg = { player:'1', score:p1ScoreValue };
		bc.postMessage(msg);
		} else {
		p1ScoreValue = 0;
		msg = { player:'1', score:p1ScoreValue };
		bc.postMessage(msg);
		}

	if (localStorage.getItem('p2ScoreCtrlPanel') > 0 || localStorage.getItem('p2ScoreCtrlPanel') == "" ) {
		p2ScoreValue = localStorage.getItem('p2ScoreCtrlPanel');
		msg = { player:'2', score:p2ScoreValue };
		bc.postMessage(msg);
		} else {
		p2ScoreValue = 0;
		msg = { player:'2', score:p2ScoreValue };
		bc.postMessage(msg);
		}

	if (localStorage.getItem("showLeftSponsorLogo") == "yes") {
			document.getElementById("showLeftSponsorLogoSetting").checked = true;
			leftSponsorLogoSetting();
				} 	else {
			leftSponsorLogoSetting();
			}

	if (localStorage.getItem("showRightSponsorLogo") == "yes") {
			document.getElementById("showRightSponsorLogoSetting").checked = true;
			rightSponsorLogoSetting();
			} else {
				rightSponsorLogoSetting();
				}			

	if (localStorage.getItem("useClock") == "yes") {
			console.log("Clock = TRUE");
			document.getElementById("useClockSetting").checked = true;
			clockSetting();
				} else {
				// Do not alter sponsor logo toggles when clock is disabled
				clockSetting()
				}			

	if (localStorage.getItem("customLogo1") != null) {document.getElementById("l1Img").src = localStorage.getItem("customLogo1");} else { document.getElementById("l1Img").src = "./common/images/placeholder.png"; };
	if (localStorage.getItem("customLogo2") != null) {document.getElementById("l2Img").src = localStorage.getItem("customLogo2");} else { document.getElementById("l2Img").src = "./common/images/placeholder.png"; };
	if (localStorage.getItem("customLogo3") != null) {document.getElementById("l3Img").src = localStorage.getItem("customLogo3");} else { document.getElementById("l3Img").src = "./common/images/placeholder.png"; };
	if (localStorage.getItem("leftSponsorLogo") != null) {
		document.getElementById("l0Img").src = localStorage.getItem("leftSponsorLogo");
		document.getElementById("l0Img").classList.add("has-image");
	} else { document.getElementById("l0Img").src = "./common/images/placeholder.png"; };
	if (localStorage.getItem("rightSponsorLogo") != null) {
		document.getElementById("l4Img").src = localStorage.getItem("rightSponsorLogo");
		document.getElementById("l4Img").classList.add("has-image");
	} else { document.getElementById("l4Img").src = "./common/images/placeholder.png"; };

	// Load player photos from localStorage
	if (localStorage.getItem("player1_photo") != null) {
		// Show image and hide text for main button display
		document.getElementById("p1PhotoDisplay").src = localStorage.getItem("player1_photo");
		document.getElementById("p1PhotoDisplay").style.display = "block";
		document.getElementById("p1PhotoDelete").style.display = "block";
		document.getElementById("p1PhotoText").style.display = "none";
	} else { 
		document.getElementById("p1PhotoDisplay").src = "./common/images/placeholder.png"; 
	};
	if (localStorage.getItem("player2_photo") != null) {
		// Show image and hide text for main button display
		document.getElementById("p2PhotoDisplay").src = localStorage.getItem("player2_photo");
		document.getElementById("p2PhotoDisplay").style.display = "block";
		document.getElementById("p2PhotoDelete").style.display = "block";
		document.getElementById("p2PhotoText").style.display = "none";
	} else { 
		document.getElementById("p2PhotoDisplay").src = "./common/images/placeholder.png"; 
	};

	if (localStorage.getItem("slideShow") == "yes") { document.getElementById("logoSlideshowChk").checked = true; logoSlideshow(); };
	if (localStorage.getItem("obsTheme") == "28") { document.getElementById("obsTheme").value = "28"; }
	if (localStorage.getItem("b_style") == "1") { document.getElementById("bsStyle").value = "1"; }
	if (localStorage.getItem("b_style") == "2") { document.getElementById("bsStyle").value = "2"; }
	if (localStorage.getItem("b_style") == "3") { document.getElementById("bsStyle").value = "3"; }
	if (localStorage.getItem("leftSponsorLabel") != null) { document.getElementById("leftSponsorLabel").innerHTML = localStorage.getItem("leftSponsorLabel").substring(0, 13); }
	if (localStorage.getItem("rightSponsorLabel") != null) { document.getElementById("rightSponsorLabel").innerHTML = localStorage.getItem("rightSponsorLabel").substring(0, 13); }
	document.getElementById("p1Name").value = localStorage.getItem("p1NameCtrlPanel");
	document.getElementById("p2Name").value = localStorage.getItem("p2NameCtrlPanel");
	document.getElementById("raceInfoTxt").value = localStorage.getItem("raceInfo");
	document.getElementById("wagerInfoTxt").value = localStorage.getItem("wagerInfo");
	document.getElementById("verNum").innerHTML = versionNum;			
	postNames();startThemeCheck();
			
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// broadcast channel events from browser_source
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			

	bcr.onmessage = (event) => {
		tev = event.data;
		console.log(tev);
		if (tev == 10) {
			document.getElementById("shotClockShow").setAttribute("onclick", "clockDisplay('hide')");
			document.getElementById("shotClockShow").innerHTML = "Hide Clock";
			document.getElementById("shotClockShow").style.border = "1px solid lime";
		}
		if (tev < 6 && tev > 0) {    //tev > 0   this prevents both sounds from playing at 0.
			warningBeep.loop = false;
			warningBeep.play();
		}
		if (tev == 0) {
			foulSound.loop = false;
			foulSound.play();
			setTimeout("stopClock()", 1000);
		}
	}
			