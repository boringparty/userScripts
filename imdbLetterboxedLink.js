// ==UserScript==
// @name         IMDb to Letterboxd Link
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Injects a Letterboxd link into IMDb /reference/ pages
// @match        https://www.imdb.com/title/tt*/reference/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const imdbIdMatch = window.location.href.match(/(tt\d{7,8})/);
  if (!imdbIdMatch) return;

  const imdbId = imdbIdMatch[1];
  const letterboxdUrl = `https://letterboxd.com/imdb/${imdbId}`;

  const genreDiv = document.querySelector('.ipc-chip-list__scroller');
  if (!genreDiv) return;

  const link = document.createElement('a');
  link.href = letterboxdUrl;
  link.className = 'ipc-chip ipc-chip--on-base';
  link.tabIndex = 0;
  link.setAttribute('aria-disabled', 'false');

  const span = document.createElement('span');
  span.className = 'ipc-chip__text';
  span.textContent = 'Letterboxd';

  link.appendChild(span);
  genreDiv.appendChild(link);

})();
