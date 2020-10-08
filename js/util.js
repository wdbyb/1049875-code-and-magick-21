(function () {
  function getRandom(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function nextFillColor(element, input, colors) {
    const currentAttribute = input.getAttribute(`value`);
    const nextAttribute = nextElementFromArray(colors, currentAttribute);
    element.style.fill = nextAttribute;
    input.setAttribute(`value`, nextAttribute);
  }

  function nextBackgroundColor(element, input, colors) {
    const currentAttribute = input.getAttribute(`value`);
    const nextAttribute = nextElementFromArray(colors, currentAttribute);
    element.style.backgroundColor = nextAttribute;
    input.setAttribute(`value`, nextAttribute);
  }

  function nextElementFromArray(arr, currentElement) {
    const currentIndex = arr.findIndex(function (item) {
      return item === currentElement;
    });
    if (currentIndex + 1 >= arr.length) {
      return arr[0];
    }
    return arr[currentIndex + 1];
  }

  window.util = {
    getRandom: getRandom,
    nextFillColor: nextFillColor,
    nextBackgroundColor: nextBackgroundColor,
    nextElementFromArray: nextElementFromArray
  };
})();
