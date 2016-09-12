import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'
import deepFreeze from 'deep-freeze'
import expect from 'expect'

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        complete: false
      }

    case 'TOGGLE_TODO':
      if(state.id == action.id){
        return Object.assign(
          {}, state,
          {complete: !state.complete}
        )
      }else{
        return state
      }
    default:
      return state;
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action))
    default:
      return state;
  }
}


const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type){
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

const todoApp = (state = {}, action) => {
  return {
    todos: todos(
      state.todos,
      action
    ),
    visibilityFilter: visibilityFilter(
      state.visibilityFilter,
      action
    )
  };
};

const store = createStore(todoApp);

console.log('Initial state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching ADD_TODO.');
store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn Redux'
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching ADD_TODO.');
store.dispatch({
  type: 'ADD_TODO',
  id: 1,
  text: 'Go shopping'
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching TOGGLE_TODO.');
store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching SET_VISIBILITY_FILTER');
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');



const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  }
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      complete: false
    }
  ]

  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
}

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learn Redux',
      complete: false
    },
    {
      id: 1,
      text: 'Shop for the cat',
      complete: false
    }

  ];

  const action = {
    type: 'TOGGLE_TODO',
    id: 0
  }

  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      complete: true
    },
    {
      id: 1,
      text: 'Shop for the cat',
      complete: false
    }

  ]

  deepFreeze(action)
  deepFreeze(stateBefore)

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter)
}

testAddTodo();
testToggleTodo();
console.log('All tests passed');
