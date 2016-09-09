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
    case 'TOGGLE_TODO':
      return state.map(todo =>{
        if(todo.id == action.id){
          return Object.assign(
            {}, todo,
            {complete: !todo.complete}
          )
        }else{
          return todo
        }
      })
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
