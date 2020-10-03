'use strict';

const FIRST_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const LAST_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
const MAX_WIZARDS = 4;
const setupElement = document.querySelector(`.setup`);
const wizardTemplateElement = document.querySelector(`#similar-wizard-template`).content.querySelector(`div`);
const wizardsListElement = setupElement.querySelector(`.setup-similar-list`);
const setupUserNameElement = setupElement.querySelector(`.setup-user-name`);
const setupWizardElement = document.querySelector(`.setup-wizard`);
const wizardCoatElement = setupWizardElement.querySelector(`.wizard-coat`);
const wizardEyesElement = setupWizardElement.querySelector(`.wizard-eyes`);
const setupFireballElement = document.querySelector(`.setup-fireball-wrap`);
const fireballColorElement = document.querySelector(`input[name="fireball-color"]`);
const coatColorElement = document.querySelector(`input[name="coat-color"]`);
const eyesColorElement = document.querySelector(`input[name="eyes-color"]`);
const setupOpenElement = document.querySelector(`.setup-open`);
const setupCloseElement = document.querySelector(`.setup-close`);
const wizards = [];

function onWizardCoatClick() {
  getNextFillColor(wizardCoatElement, coatColorElement, COAT_COLORS);
}

function onWizardEyesClick() {
  getNextFillColor(wizardEyesElement, eyesColorElement, EYES_COLORS);
}

function onFireballClick() {
  getNextBackgroundColor(setupFireballElement, fireballColorElement, FIREBALL_COLORS);
}

function getRandom(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function renderWizard(wizard) {
  const wizardElement = wizardTemplateElement.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
}

function getNextFillColor(element, input, colors) {
  const currentAttribute = input.getAttribute(`value`);
  const nextAttribute = getNextElementFromArray(colors, currentAttribute);
  element.style.fill = nextAttribute;
  input.setAttribute(`value`, nextAttribute);
}

function getNextBackgroundColor(element, input, colors) {
  const currentAttribute = input.getAttribute(`value`);
  const nextAttribute = getNextElementFromArray(colors, currentAttribute);
  element.style.backgroundColor = nextAttribute;
  input.setAttribute(`value`, nextAttribute);
}

function getNextElementFromArray(arr, currentElement) {
  const currentIndex = arr.findIndex(function (item) {
    return item === currentElement;
  });
  if (currentIndex + 1 >= arr.length) {
    return arr[0];
  }
  return arr[currentIndex + 1];
}

function openPopup() {
  setupElement.classList.remove(`hidden`);

  wizardCoatElement.addEventListener(`click`, onWizardCoatClick);

  wizardEyesElement.addEventListener(`click`, onWizardEyesClick);

  setupFireballElement.addEventListener(`click`, onFireballClick);

  document.addEventListener(`keydown`, onPopupEscPress);
}

function closePopup() {
  setupElement.classList.add(`hidden`);

  wizardCoatElement.removeEventListener(`click`, onWizardCoatClick);

  wizardEyesElement.removeEventListener(`click`, onWizardEyesClick);

  setupFireballElement.removeEventListener(`click`, onFireballClick);

  document.removeEventListener(`keydown`, onPopupEscPress);
}

function onPopupEscPress(evt) {
  if (document.activeElement !== setupUserNameElement && evt.key === `Escape`) {
    evt.preventDefault();
    setupElement.classList.add(`hidden`);
  }
}

for (let i = 0; i < MAX_WIZARDS; i++) {
  wizards.push({
    name: FIRST_NAMES[getRandom(FIRST_NAMES.length)] + ` ` + LAST_NAMES[getRandom(LAST_NAMES.length)],
    coatColor: COAT_COLORS[getRandom(COAT_COLORS.length)],
    eyesColor: EYES_COLORS[getRandom(EYES_COLORS.length)],
  });
}

const fragment = document.createDocumentFragment();

wizards.forEach((element) => fragment.appendChild(renderWizard(element)));

wizardsListElement.appendChild(fragment);

document.querySelector(`.setup-similar`).classList.remove(`hidden`);

setupOpenElement.addEventListener(`click`, function () {
  openPopup();
});

setupOpenElement.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupCloseElement.addEventListener(`click`, function () {
  closePopup();
});

setupCloseElement.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
});
