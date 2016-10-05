import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../actions';
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../reducers';
import TodoList from './TodoList';
import FetchError from './FetchError';

class VisibleTodoList extends Component {
  componentDidMount(){
    this.fetchTodos()
  }

  componentDidUpdate(prevProps){
    if(prevProps.filter !== this.props.filter){
      this.fetchTodos()
    }
  }

  fetchTodos(){
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter)
  }

  render(){
    const {toggleTodo, isFetching, errorMessage, todos} = this.props
    if(isFetching && !todos.length){
      return <p>Loading...</p>
    }
    if(errorMessage && !todos.length){
      return(
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchTodos()}/>
      )
    }

    return(
      <TodoList
        todos={todos}
        onTodoClick={toggleTodo}
      />
    )
  }
}

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all'
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    errorMessage: getErrorMessage(state, filter),
    filter,
  }
};


VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList));


export default VisibleTodoList;
