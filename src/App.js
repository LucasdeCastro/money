import React from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import Login from "./components/Login";
import { Container, Main } from "./components";
import Expenses from "./components/ExpenseForm";
import { withReducer, compose, branch, renderComponent } from "recompose";

const TOGGLE = "TOGGLE";
const toggleFeature = (flag = false, action) => {
  switch (action.type) {
    case TOGGLE:
      return !flag;
    default:
      return flag;
  }
};

const enhancer = compose(
  connect(state => state),
  withReducer("showFeature", "dispatch", toggleFeature),
  branch(
    () => !localStorage.getItem("access_token"),
    renderComponent(() => (
      <Main>
        <Container>
          <Login />
        </Container>
      </Main>
    ))
  )
);

const App = ({ showFeature, dispatch, ...props }) => (
  <Provider store={store}>
    <div>
      <h1>Ola mundo</h1>
      <Expenses.build key={"expenses-form"} />
    </div>
  </Provider>
);

export default enhancer(App);
