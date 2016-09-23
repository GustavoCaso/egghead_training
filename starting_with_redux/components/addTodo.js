import React from 'react'
import { connect } from 'react-redux'

let nextTodoId = 0;
class AddTodo extends React.Component {
  render() {
    return(
      <div>
        <input ref={node => {
          input = node;
        }} />
        <button onClick={() => {
          dispatch({
            type: 'ADD_TODO',
            id: nextTodoId++,
            text: input.value
          })
          input.value = '';
        }}>
          Add Todo
        </button>
      </div>
    )
  }
}

AddTodo = connect()(AddTodo)
export default AddTodo
