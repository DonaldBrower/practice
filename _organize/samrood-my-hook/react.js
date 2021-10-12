/* hooks */
let states = [];
let index = 0;

function stateful(initialValue) {
  let state = states[this.index] || initialValue;
  const setState = (newValue) => {
    states[this.index] = newValue;
  };
  return [state, setState];
}

function useState(initialValue) {
  const indexedUseState = stateful.bind({ index: index++ });
  return indexedUseState(initialValue);
}

/*rendering */
function render(component) {
  restartIndex();
  const markup = component();
  console.log(markup.children);
  return markup;
}

function restartIndex() {
  index = 0;
}

module.exports = {
  useState,
  render,
};
