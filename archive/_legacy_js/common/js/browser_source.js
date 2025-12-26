'use strict';

//  G4ScoreBoard addon for OBS Copyright 2022-2025 Norman Gholson IV
//  https://g4billiards.com http://www.g4creations.com
//  this is a purely javascript/html/css driven scoreboard system for OBS Studio
//  free to use and modify and use as long as this copyright statment remains intact. 
//  Salotto logo is the copyright of Salotto and is used with their permission.
//  for more information about Salotto please visit https://salotto.app


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////            
//						functions
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////            

	function postLogo() {
		var customLogo0 = localStorage.getItem("customLogo0");
		if (customLogo0 && customLogo0 !== "") {
			document.getElementById("g4Logo").src = customLogo0;
		}
		var customLogo4 = localStorage.getItem("customLogo4");
		if (customLogo4 && customLogo4 !== "") {
			document.getElementById("salottoLogo").src = customLogo4;
		}
	}
	
	function clearWinBlink() {
		document.getElementById("player1Score").classList.remove("winBlink");
		document.getElementById("player2Score").classList.remove("winBlink");
	}
	
	function sleep(milliseconds) {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > milliseconds){
			break;
			}
		}
	}
	
	// Shot clock state variables
	window.clockPaused = false;
	window.pausedTimeRemaining = 0;
	window.originalDuration = 31000;

	function shotTimer(shottime){
		// Stop any existing timer first
		if (window.shotClockxr !== null && window.shotClockxr !== undefined) {
			clearInterval(window.shotClockxr);
		}

		window.clockPaused = false;
		window.originalDuration = shottime;
		countDownTime = new Date().getTime() + shottime;
		sleep(1); //fixes clock 0 glitch. 1ms wait time. allows time for countdowntime to reliably update.

		var progressBar = document.getElementById("shotClockVis");
		// Reset progress bar for fresh start
		progressBar.classList.remove("startTimer", "start60");
		progressBar.style.transition = "none";
		progressBar.style.width = "90%";
		progressBar.offsetHeight; // Force reflow

		if (shottime == 61000) {
			progressBar.style.transition = "width 60s linear";
			progressBar.classList.replace("fadeOutElm","fadeInElm");
		} else {
			progressBar.style.transition = "width 30s linear";
		}
		progressBar.style.width = "0px";

		startClockInterval();
	}

	function resumeClock() {
		if (!window.clockPaused || window.pausedTimeRemaining <= 0) return;

		window.clockPaused = false;
		countDownTime = new Date().getTime() + window.pausedTimeRemaining;

		var progressBar = document.getElementById("shotClockVis");
		var remainingSecs = window.pausedTimeRemaining / 1000;
		progressBar.style.transition = "width " + remainingSecs + "s linear";
		progressBar.style.width = "0px";

		startClockInterval();
	}

	function startClockInterval() {
		window.shotClockxr = setInterval(function() {
		var now = new Date().getTime();
		var distance = countDownTime - now;
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		document.getElementById("shotClockVis").style.background = "lime";
		document.getElementById("shotClock").style.background = "green";
		if (distance > 21000){ document.getElementById("shotClock").style.color = "white"; };
		if (distance > 5000 && distance < 21000) { document.getElementById("shotClock").style.color = "black"; };
		if (distance > 60000) { seconds = seconds + 60; };
		document.getElementById("shotClock").innerHTML = seconds + "s";
			if (distance < 31000) {
				document.getElementById("shotClockVis").classList.replace("fadeOutElm","fadeInElm");
				document.getElementById("shotClockVis").style.background = "lime";
				}
			if (distance < 26000) {
				document.getElementById("shotClockVis").style.opacity = "0.7";
				}
			if (distance < 21000) {
				document.getElementById("shotClockVis").style.background = "orange";
				document.getElementById("shotClock").style.background = "orange";
				}
			if (distance < 16000) {
				document.getElementById("shotClock").style.background = "yellow";
				document.getElementById("shotClockVis").style.background = "yellow";
			}
			if (distance < 11000) {
				document.getElementById("shotClock").style.background = "tomato";
				document.getElementById("shotClockVis").style.background = "tomato";
				document.getElementById("shotClockVis").style.opacity = "1";
			}
			if (distance < 11000 && distance > 9700) { showClock(); };
			if (distance < 6000 && distance > 999) {
				document.getElementById("shotClock").classList.add("shotRed");
				document.getElementById("shotClock").style.background = "red";
				document.getElementById("shotClockVis").style.background = "red";
				document.getElementById("shotClock").style.color = "white";
			}
			if (distance < 1000) {
				clearInterval(window.shotClockxr);
				window.shotClockxr = null;
				document.getElementById("shotClock").style.background = "red";
				document.getElementById("shotClockVis").style.background = "red";
				document.getElementById("shotClock").style.color = "white";
			}
			if (seconds == tev) {
				var ntev = seconds --- 1;
				document.getElementById("shotClock").innerHTML = ntev + "s";
				var tev = ntev;
				console.log("dup Detected - corrected tev:"+tev);
				bcr.postMessage(tev);
				} else {
					document.getElementById("shotClock").innerHTML = seconds + "s";
					tev = seconds;
					console.log("tev:"+tev);
					bcr.postMessage(tev);
				}
		 }, 1000);
	}

	 function showClock(selectedTime){
		document.getElementById("shotClock").classList.replace("fadeOutElm","fadeInElm");

		// If clock isn't running, show the selected duration
		if (window.shotClockxr === null || window.shotClockxr === undefined) {
			// Use provided selectedTime or fall back to stored originalDuration
			if (selectedTime) {
				window.originalDuration = selectedTime;
			}
			var seconds = Math.floor(window.originalDuration / 1000) - 1;
			document.getElementById("shotClock").innerHTML = seconds + "s";
			document.getElementById("shotClock").style.background = "green";
			document.getElementById("shotClock").style.color = "white";

			// Also show the progress bar at full
			var progressBar = document.getElementById("shotClockVis");
			progressBar.classList.replace("fadeOutElm","fadeInElm");
			progressBar.style.transition = "none";
			progressBar.style.width = "90%";
			progressBar.style.background = "lime";
		}
	}

	function hideClock(){
		document.getElementById("shotClock").classList.replace("fadeInElm", "fadeOutElm");
	}
	
	function stopClock() {
		// Pause the timer - freeze display and progress bar
		if (window.shotClockxr !== null && window.shotClockxr !== undefined) {
			clearInterval(window.shotClockxr);
			window.shotClockxr = null;
		}

		// Calculate and store remaining time
		var now = new Date().getTime();
		window.pausedTimeRemaining = countDownTime - now;
		if (window.pausedTimeRemaining < 0) window.pausedTimeRemaining = 0;
		window.clockPaused = true;

		// Freeze the progress bar at current position
		var progressBar = document.getElementById("shotClockVis");
		var computedWidth = window.getComputedStyle(progressBar).width;
		progressBar.style.transition = "none";
		progressBar.style.width = computedWidth;
	}

	function resetClock(resetTime) {
		// Reset timer to selected duration without hiding
		if (window.shotClockxr !== null && window.shotClockxr !== undefined) {
			clearInterval(window.shotClockxr);
			window.shotClockxr = null;
		}

		window.clockPaused = false;
		window.pausedTimeRemaining = 0;

		// Use provided resetTime or fall back to stored originalDuration
		if (resetTime) {
			window.originalDuration = resetTime;
		}

		// Reset the display to show selected duration (subtract 1s buffer)
		var seconds = Math.floor(window.originalDuration / 1000) - 1;
		document.getElementById("shotClock").innerHTML = seconds + "s";
		document.getElementById("shotClock").classList.remove("shotRed");
		document.getElementById("shotClock").style.background = "green";
		document.getElementById("shotClock").style.color = "white";

		// Reset progress bar to full width
		var progressBar = document.getElementById("shotClockVis");
		progressBar.style.transition = "none";
		progressBar.style.width = "90%";
		progressBar.style.background = "lime";
		progressBar.classList.remove("startTimer", "start60");
	}

	function add30(player) { 
			countDownTime = countDownTime + 30000;
			document.getElementById("p"+player+"ExtIcon").style.background = "darkred";
			document.getElementById("shotClock").classList.remove("shotRed");
			document.getElementById("shotClock").style.background = "";    
			document.getElementById("shotClockVis").classList.remove("startTimer");
			document.getElementById("shotClockVis").classList.remove("start60");
			document.getElementById("shotClockVis").style.background = "";
			document.getElementById("shotClock").classList.replace("fadeInElm", "fadeOutElm");
			document.getElementById("shotClockVis").classList.replace("fadeInElm", "fadeOutElm");
			document.getElementById("p"+player+"ExtIcon").classList.add("extBlink");
			playerNumber =  player;
			setTimeout("clearExtBlink(playerNumber)",500);	
	}
	
	function clearExtBlink(playerN) {
		document.getElementById("p"+playerN+"ExtIcon").classList.remove("extBlink");
		document.getElementById("p"+playerN+"ExtIcon").style.background = "darkred";

	}
	
	function extReset(player) {
		document.getElementById(player+"ExtIcon").style.background = "green";
					 
		}
		
	function salottoShow() {
		document.getElementById("salottoLogo").classList.replace("fadeOutElm","fadeInElm");	
	
	}
	function salottoHide() {
		document.getElementById("salottoLogo").classList.replace("fadeInElm","fadeOutElm");
	
	}
	
	function customShow() {
		document.getElementById("g4Logo").style.removeProperty('display');
		setTimeout(function(){
		if (document.getElementById("g4Logo").classList.contains("logoSlide")) {
			document.getElementById("g4Logo").classList.replace("logoSlide", "fadeOutElm"); }
		if (document.getElementById("g4Logo").classList.contains("fade")) {
			document.getElementById("g4Logo").classList.replace("fade", "fadeOutElm"); }
		document.getElementById("g4Logo").classList.replace("fadeOutElm","fadeInElm");
		},100);
	
	}
	function customHide() {
		document.getElementById("g4Logo").classList.replace("fadeInElm","fadeOutElm");
		setTimeout( function(){document.getElementById("g4Logo").style.display = "none";},1000);
	
	}
	
	function showSlides() {
		let i;
		let slides = document.getElementsByClassName("logoSlide");
		for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";  
		}
		slideIndex++;
		if (slideIndex > slides.length) {slideIndex = 1}    
		slides[slideIndex-1].style.display = "block";  
		setTimeout(showSlides, 20000); // Change image every 20 seconds
		}
	
	function styleChange(n) {
		const html = document.documentElement;
		// Remove all scale classes
		html.classList.remove('scale-100', 'scale-125', 'scale-150', 'scale-200');

		// Add the appropriate scale class
		if (n == 1) {
			// No class needed for 100% - it's the default
		}
		if (n == 2) {
			html.classList.add('scale-125');
		}
		if (n == 3) {
			html.classList.add('scale-150');
		}
		if (n == 4) {
			html.classList.add('scale-200');
		}
	}
