import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../actions';
import { getVisibleTodos, getIsFetching } from '../reducers';
import TodoList from './TodoList';

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
    const { filter, requestTodos, fetchTodos } = this.props;
    requestTodos(filter)
    fetchTodos(filter)
  }

  render(){
    const {toggleTodo, isFetching, todos} = this.props
    if(isFetching && !todos.length){
      return <p>Loading...</p>
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
    filter,
  }
};


VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList));


export default VisibleTodoList;
