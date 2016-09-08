//import { createStore } from 'redux'

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// createStore receive a reducer created by the application
// and return thre fuctions getState, dispatch, subscribe
const createStore = (reducer) => {
  let state;
  // to keep track of all the time the subscribe function is call
  let listeners = [];

  // return the current vale of state
  const getState = () => state;


  const dispatch = (action) => {
    // only way to change internal state
    state = reducer(state, action);
    // everytime the state is change we need to notify every listener and call them
    listeners.forEach(listener => listener());
  }

  const subscribe = (listener) => {
    // every time its call we store the listener in our listeners array
    listeners.push(listener);
    // we have provide an unsubcribe a listener, for that we will return a function that remove this listener from the listeners array
    return () => {
      listeners = listeners.filter(l => l !== listener)
    };
  };
  // return the initial state
  dispatch({});

  return {getState, dispatch, subscribe}
}
const store = createStore(counter);

const render = () => {
  document.body.innerText = store.getState()
}

store.subscribe(render);
render()

document.addEventListener('click', () => {
  store.dispatch({type: 'INCREMENT'})
})
