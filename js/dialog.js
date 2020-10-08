(function () {
  const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
  const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
  const SetupStartCoords = {
    TOP: `80px`,
    LEFT: `50%`,
  };
  const setupElement = document.querySelector(`.setup`);
  const setupOpenElement = document.querySelector(`.setup-open`);
  const setupWizardElement = setupElement.querySelector(`.setup-wizard`);
  const setupCloseElement = setupElement.querySelector(`.setup-close`);
  const wizardCoatElement = setupWizardElement.querySelector(`.wizard-coat`);
  const wizardEyesElement = setupWizardElement.querySelector(`.wizard-eyes`);
  const setupFireballElement = setupElement.querySelector(`.setup-fireball`);
  const setupUserNameElement = setupElement.querySelector(`.setup-user-name`);
  const fireballColorElement = setupElement.querySelector(`input[name="fireball-color"]`);
  const coatColorElement = setupElement.querySelector(`input[name="coat-color"]`);
  const eyesColorElement = setupElement.querySelector(`input[name="eyes-color"]`);

  function onWizardCoatClick() {
    window.util.nextFillColor(wizardCoatElement, coatColorElement, COAT_COLORS);
  }

  function onWizardEyesClick() {
    window.util.nextFillColor(wizardEyesElement, eyesColorElement, EYES_COLORS);
  }

  function onFireballClick() {
    window.util.nextBackgroundColor(setupFireballElement, fireballColorElement, FIREBALL_COLORS);
  }

  function openPopup() {
    setupElement.classList.remove(`hidden`);

    setupElement.style.top = SetupStartCoords.TOP;
    setupElement.style.left = SetupStartCoords.LEFT;

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

  const dialogHandlerElement = setupElement.querySelector(`.upload`);

  dialogHandlerElement.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupElement.style.top = (setupElement.offsetTop - shift.y) + `px`;
      setupElement.style.left = (setupElement.offsetLeft - shift.x) + `px`;
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandlerElement.removeEventListener(`click`, onClickPreventDefault);
        };
        dialogHandlerElement.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
