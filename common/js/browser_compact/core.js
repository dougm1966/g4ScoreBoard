'use strict';

/**
 * g4ScoreBoard Browser Compact - Main Entry Point
 * Copyright 2022-2025 Norman Gholson IV
 * https://g4billiards.com http://www.g4creations.com
 *
 * This is a purely javascript/html/css driven scoreboard system for OBS Studio
 * Free to use and modify as long as this copyright statement remains intact.
 * Salotto logo is the copyright of Salotto and is used with their permission.
 * For more information about Salotto please visit https://salotto.app
 */

import { ShotClock } from './shotclock.js';
import { UI } from './ui.js';
import { Messaging } from './messaging.js';
import { Storage } from './storage.js';
import { DOM_IDS } from './constants.js';

/**
 * Main application class for browser_compact
 */
class BrowserCompact {
  constructor() {
    this.shotClock = new ShotClock();
    this.ui = new UI();
    this.messaging = new Messaging(this.shotClock, this.ui);
    this._initialize();
  }

  /**
   * Initialize application from localStorage
   */
  _initialize() {
    const state = Storage.loadInitialState();

    // Load slideshow logos
    [1, 2, 3].forEach(i => {
      const logoData = state[`customLogo${i}`];
      const logoElement = document.getElementById(DOM_IDS[`customLogo${i}`]);
      if (logoData) {
        logoElement.src = logoData;
      } else {
        logoElement.src = './common/images/placeholder.png';
      }
    });

    // Load custom logo (browser_compact uses customImage)
    if (state.customImage && state.customImage !== '') {
      document.getElementById(DOM_IDS.g4Logo).src = state.customImage;
    }

    // Load scores
    document.getElementById(DOM_IDS.p1Score).innerHTML = state.p1Score;
    document.getElementById(DOM_IDS.p2Score).innerHTML = state.p2Score;

    // Load wager/race info
    if (state.wagerInfo && state.wagerInfo !== '') {
      document.getElementById(DOM_IDS.wagerInfo).classList.remove('noShow');
      document.getElementById(DOM_IDS.wagerInfo).innerHTML = state.wagerInfo;
    }

    if (state.raceInfo && state.raceInfo !== '') {
      document.getElementById(DOM_IDS.raceInfo).classList.remove('noShow');
      document.getElementById(DOM_IDS.raceInfo).innerHTML = state.raceInfo;
    }

    // Load player names
    document.getElementById(DOM_IDS.p1Name).innerHTML = state.p1Name;
    document.getElementById(DOM_IDS.p2Name).innerHTML = state.p2Name;

    // Show/hide features
    if (state.useCustomLogo === 'yes') {
      document.getElementById(DOM_IDS.g4Logo).classList.replace('fadeOutElm', 'fadeInElm');
    }

    if (state.useSalotto === 'yes') {
      document.getElementById(DOM_IDS.salottoLogo).classList.replace('fadeOutElm', 'fadeInElm');
    }

    // Clock settings
    this.ui.toggleExtensionIcons(state.useClock === 'yes');

    // Player colors
    if (state.p1Color && state.p1Color !== '') {
      this.ui.updatePlayerColor(1, state.p1Color);
      console.log(`p1color: ${state.p1Color}`);
    }
    if (state.p2Color && state.p2Color !== '') {
      this.ui.updatePlayerColor(2, state.p2Color);
      console.log(`p2color: ${state.p2Color}`);
    }

    // Slideshow
    if (state.slideShow === 'yes') {
      const slideshowDiv = document.getElementById(DOM_IDS.logoSlideshow);
      const g4Logo = document.getElementById(DOM_IDS.g4Logo);
      slideshowDiv.classList.replace('fadeOutElm', 'fadeInElm');
      g4Logo.classList.replace('fadeOutElm', 'logoSlide');
      g4Logo.classList.add('fade');
    }

    // Start slideshow
    this.ui._showSlides();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new BrowserCompact());
} else {
  new BrowserCompact();
}
