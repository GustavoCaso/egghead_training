import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'
import deepFreeze from 'deep-freeze'
import expect from 'expect'

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          complete: false
        }
      ]
    default:
      return state;
  }
}



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

testAddTodo();
console.log('All tests passed');
