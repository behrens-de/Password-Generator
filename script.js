
/**
 * 
 * @param {String} string - any character string
 * @param {Number} repetitions - number of repetitions
 * @returns {String} - create a new random string of the characters from the input string
 */

function createRandomString(string, repetitions) {
  const characters = [];
  for (let i = 0; i < repetitions; i++) {
    const random = Math.floor(Math.random() * (string.length - 0) + 0);
    characters.push(string[random]);
  }
  return characters.join('');
}

/**
 * 
 * @param {String} string  - any character string
 * @returns {String} - a rearranged character string from input string
 */
function randomlyMixedString(string) {
  let length = string.length;
  let characters = '';
  while (length > 0) {
    let rand = Math.floor(Math.random() * (string.length - 0) + 0);
    characters += string[rand];
    length -= 1;
  }
  return characters;
}

/**
 * Creates a Password
 * @param {Number} bigLetters 
 * @param {Number} smallLetters 
 * @param {Number} specialLetters 
 * @param {Number} umlauts 
 * @param {Number} numbers 
 * @returns - a 
 */
function createPassword(bigLetters, smallLetters, specialLetters, umlauts, numbers) {
  let password = '';
  const quanty = [bigLetters, smallLetters, specialLetters, umlauts, numbers];
  const strings = ['ABCDEFGHIJKLMOPQRSTUVWXYZ', 'abcdefghijklmopqrstuvwxyz', '!@#$%^&*', 'ÄÖÜäöü', '0123456789'];
  strings.forEach((string, index) => {
    if (quanty[index] > 0) {
      password += createRandomString(string, quanty[index]);
    }
  });
  return randomlyMixedString(password)
}


//-----------------------
// EventListerner: if move the Slider
//-----------------------
const slider = document.querySelectorAll('[type="range"]');
slider.forEach((slide) => {
  slide.addEventListener("mousemove", function () {
    const headline = this.previousElementSibling;
    const quanty = headline.querySelector(".quanty");
    quanty.innerText = Number(slide.value) > 0 ? slide.value : "keine";
  });

  slide.addEventListener("change", function () {
    const headline = this.previousElementSibling;
    const quanty = headline.querySelector(".quanty");
    quanty.innerText = Number(slide.value) > 0 ? slide.value : "keine";
  });

  slide.addEventListener('mouseup', renderPaswords);
  slide.addEventListener('change', renderPaswords);

});


//-----------------------
// EventListerner: if move the Slider
//-----------------------
window.addEventListener('DOMContentLoaded', renderPaswords);


function renderPaswords() {
  const smallLetters = Number(document.querySelector('[name="small-letters"]').value);
  const bigLetters = Number(document.querySelector('[name="big-letters"]').value);
  const umlauts = Number(document.querySelector('[name="umlauts"]').value);
  const specialLetters = Number(document.querySelector('[name="special-letters"]').value);
  const numbers = Number(document.querySelector('[name="numbers"]').value);
  const passwords = Number(document.querySelector('[name="passwords"]').value);

  const html = document.querySelector(".passwords");
  let texteara = '';
  for (let i = 0; i < passwords; i++) {
    texteara += createPassword(bigLetters, smallLetters, specialLetters, umlauts, numbers) + "\n";
  }

  html.innerHTML = `
  <h2>${passwords > 1 ? 'Deine ' + passwords + ' Passwörter' : 'Deine Passwort'}<h2>
  <textarea readonly rows="${passwords}">${texteara}</textarea>`;
  if (passwords < 1) {
    html.innerHTML = `
    <h2>Kein Passwort?</h2>
    <p>Du kannst nicht erwarten, dass, wenn du kein Passwort höhlst, ein Passwort angezeigt wird.</p>
    <p>Versuche es gerne noch mal mit mindestens einem Passwort ;)</p>
    `;

  }
}


const button = document.querySelector('.to-clipboard');
button.addEventListener('click', textToClipboard);
// Safe in clipboard
function textToClipboard() {
  const text = document.querySelector('textarea').value;
  navigator.clipboard.writeText(text).then(function () {
    console.log('Async: Copying to clipboard was successful!');
  }, function (err) {
    console.error('Async: Could not copy text: ', err);
  });
}