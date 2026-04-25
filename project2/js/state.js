
const STORAGE_KEY = "gameState";

// load game state
export function getState() {
  return (
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
      jokers: [],
      modifiers: {},
    }
  );
}

// save game state
export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// add joker 
export function addJoker(joker) {
  const state = getState();

  state.jokers = _.uniqBy([...state.jokers, joker], "id");

  saveState(state);
}

// apply joker effects
export function applyJokers(gameState) {
  const state = getState();

_.forEach(state.jokers, (joker) => {
  if (_.isFunction(joker.apply)) {
    joker.apply(gameState);
  }
});

  return gameState;
}
