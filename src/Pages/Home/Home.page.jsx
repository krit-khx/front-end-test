import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import TodoList from "./TodoList.page";

class Home extends React.Component {
  render() {
    return (
      <>
        <div>
          <TodoList />
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(
  reduxForm({
    form: "Home",
  })(Home)
);
