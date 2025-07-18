// ==UserScript==
// @name         IMDb Links with Full Form Submit
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Adds Letterboxd, Reddit, and full metadata submission to Google Form from IMDb /reference/ pages
// @match        https://www.imdb.com/title/tt*/reference/*
// @grant        none
// ==/UserScript==

(() => {
  const imdbId = location.href.match(/(tt\d{7,8})/)?.[1];
  const genreDiv = document.querySelector('.ipc-chip-list__scroller');
  const titleMatch = document.title.match(/^(.*?)\s\((\d{4})\)/);

  if (!imdbId || !genreDiv || !titleMatch) return;

  const [_, title, year] = titleMatch;

  const formAction = 'https://docs.google.com/forms/d/e/FORM-ID/formResponse';
  const fieldImdb = 'entry.FIELD-ID';
  const fieldTitle = 'entry.FIELD-ID';
  const fieldYear = 'entry.FIELD-ID';

  const buttons = [
    {
      text: 'Letterboxd',
      url: `https://letterboxd.com/imdb/${imdbId}`
    },
    {
      text: 'Reddit',
      url: `https://www.google.com/search?q=${encodeURIComponent(
        `${title} ${year} site:reddit.com/r/truefilm OR site:reddit.com/r/criterion`
      )}`
    },
    {
      text: 'To Sheet',
      url: '#',
      onClick: () => {
        const formData = new FormData();
        formData.append(fieldImdb, imdbId);
        formData.append(fieldTitle, title);
        formData.append(fieldYear, year);

        fetch(formAction, {
          method: 'POST',
          mode: 'no-cors',
          body: formData
        });
      }
    }
  ];

  buttons.forEach(({ text, url, onClick }) => {
    const a = document.createElement('a');
    a.href = url;
    a.className = 'ipc-chip ipc-chip--on-base';
    a.tabIndex = 0;
    a.setAttribute('aria-disabled', 'false');
    if (!onClick) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }

    const span = document.createElement('span');
    span.className = 'ipc-chip__text';
    span.textContent = text;

    a.appendChild(span);
    genreDiv.appendChild(a);

    if (onClick) {
      a.href = 'javascript:void(0)';
      a.addEventListener('click', onClick);
    }
  });
})();
