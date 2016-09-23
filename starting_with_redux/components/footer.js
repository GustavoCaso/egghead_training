import { connect } from 'react-redux'

const Link = ({
  active,
  children,
  onClick
}) => {
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <a href='#'
       onClick={e => {
         e.preventDefault();
         onClick();
       }}
    >
      {children}
    </a>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter ===
    state.visibilityFilter
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
      })
    }
  };
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

class Footer extends React.Component {
  render(){
    return (
      <p>
        Show:
        {' '}
        <FilterLink
          filter='SHOW_ALL'
        >
          All
        </FilterLink>
        {', '}
        <FilterLink
          filter='SHOW_ACTIVE'
        >
          Active
        </FilterLink>
        {', '}
        <FilterLink
          filter='SHOW_COMPLETED'
        >
          Completed
        </FilterLink>
      </p>
    )
  }
}

export default Footer
