import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'

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

const store = createStore(counter);

const Counter = ({value, increment, decrement}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
  </div>
)

const increment = () => {
  store.dispatch({type: 'INCREMENT'})
}

const decrement = () => {
  store.dispatch({type: 'DECREMENT'})
}

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      increment={increment}
      decrement={decrement}
      />,
    document.getElementById('root')
  )
}

store.subscribe(render);
render()
