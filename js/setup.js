'use strict';

(function () {
  const FIRST_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
  const LAST_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
  const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
  const MAX_WIZARDS = 4;
  const setupElement = document.querySelector(`.setup`);
  const wizardTemplateElement = document.querySelector(`#similar-wizard-template`).content.querySelector(`div`);
  const wizardsListElement = setupElement.querySelector(`.setup-similar-list`);
  const wizards = [];

  function renderWizard(wizard) {
    const wizardElement = wizardTemplateElement.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

    return wizardElement;
  }

  for (let i = 0; i < MAX_WIZARDS; i++) {
    wizards.push({
      name: FIRST_NAMES[window.util.getRandom(FIRST_NAMES.length)] + ` ` + LAST_NAMES[window.util.getRandom(LAST_NAMES.length)],
      coatColor: COAT_COLORS[window.util.getRandom(COAT_COLORS.length)],
      eyesColor: EYES_COLORS[window.util.getRandom(EYES_COLORS.length)],
    });
  }

  const fragment = document.createDocumentFragment();

  wizards.forEach((element) => fragment.appendChild(renderWizard(element)));

  wizardsListElement.appendChild(fragment);

  setupElement.querySelector(`.setup-similar`).classList.remove(`hidden`);
})();
