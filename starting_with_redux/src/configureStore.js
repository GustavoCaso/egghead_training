import { createStore, applyMiddleware } from 'redux';
import todoApp from './reducers';

const logging = (store) => (next) => {
  if (!console.group) {
    return next
  }
  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = next(action);
    console.log('%c next state','color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue
  };
};

const promises = (store) => (next) => (action) => {
  if(typeof action.then === 'function'){
    return action.then(next)
  }
    return next(action);
};

const thunk = (store) => (next) => (action) => {
  if(typeof action === 'function'){
    return action(store.dispatch)
  }
    return next(action);
}

const configureStore = () => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV != 'production'){
    middlewares.push(logging)
  }

  return createStore(
    todoApp,
    applyMiddleware(...middlewares)
  );
}

export default configureStore;
