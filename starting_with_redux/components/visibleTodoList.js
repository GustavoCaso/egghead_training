import { connect } from 'react-redux'

const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration:
        completed ?
          'line-through' :
          'none'
    }}
  >
    {text}
  </li>
);

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(
        state.todos,
        state.visibilityFilter)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) =>
      dispatch({
        type: 'TOGGLE_TODO',
        id
      })
  };
}

class TodoList extends React.Component {
  render(){
    return(
      <ul>
        {todos.map(todo =>
          <Todo
            key={todo.id}
            {...todo}
            onClick={() => onTodoClick(todo.id)}
          />
        )}
      </ul>
    )
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
