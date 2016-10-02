import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../actions';
import { getVisibleTodos } from '../reducers';
import TodoList from './TodoList';
import { fetchTodos } from '../api';

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
    const { filter, receiveTodos } = this.props;
    fetchTodos(filter).then(todos =>
      receiveTodos(todos, filter)
    );
  }

  render(){
    const {toggleTodo, ...rest} = this.props
    return(
      <TodoList
        {...rest}
        onTodoClick={toggleTodo}
      />
    )
  }
}

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all'
  return {
    todos: getVisibleTodos(state, filter),
    filter,
  }
};


VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList));


export default VisibleTodoList;
