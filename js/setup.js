'use strict';

const FIRST_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const LAST_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const MAX_WIZARDS = 4;
const setup = document.querySelector(`.setup`);
const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`div`);
const wizardsList = setup.querySelector(`.setup-similar-list`);
const wizards = [];

const getRandom = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

const renderWizard = function (wizard) {
  const wizardElement = wizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

setup.classList.remove(`hidden`);

for (let i = 0; i < MAX_WIZARDS; i++) {
  wizards.push({
    name: FIRST_NAMES[getRandom(FIRST_NAMES.length)] + ` ` + LAST_NAMES[getRandom(LAST_NAMES.length)],
    coatColor: COAT_COLORS[getRandom(COAT_COLORS.length)],
    eyesColor: EYES_COLORS[getRandom(EYES_COLORS.length)],
  });
}

const fragment = document.createDocumentFragment();

for (let i = 0; i < MAX_WIZARDS; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

wizardsList.appendChild(fragment);

document.querySelector(`.setup-similar`).classList.remove(`hidden`);
