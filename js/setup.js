const setup = document.querySelector('.setup');
setup.classList.remove('hidden');

let firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
let lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
let coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
let eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

const getRandom = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

let wizards = [];

for (var i = 0; i < 4; i++) {
  wizards.push({
    name: firstNames[getRandom(firstNames.length)] + ' ' + lastNames[getRandom(lastNames.length)],
    coatColor: coatColors[getRandom(coatColors.length)],
    eyesColor: eyesColors[getRandom(eyesColors.length)],
  });
}

const wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('div');
const wizardsList = document.querySelector('.setup-similar-list');

for (let i = 0; i < 4; i++) {
  let element = wizardTemplate.cloneNode(true);

  element.querySelector('.setup-similar-label').textContent = wizards[i].name;
  element.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
  element.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;

  wizardsList.appendChild(element);
}

document.querySelector('.setup-similar').classList.remove('hidden');
