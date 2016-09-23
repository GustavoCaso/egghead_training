import { createStore, combineReducers } from 'redux'
import React  from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux';
import { VisibleTodoList }  from './components/visibleTodoList'
import { AddTodo }  from './components/addTodo'
import { Footer }  from './components/footer'

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return (
        Object.assign(
          {},
          state,
          {completed: !state.completed}
        )
      );
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      );
    default:
      return state;
  }
};

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const todoReducers = combineReducers({
  todos,
  visibilityFilter
});

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

ReactDOM.render(
  <Provider store={createStore(todoReducers)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);
