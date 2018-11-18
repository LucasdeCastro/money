import React from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import Login from "./components/Login";
import { Container, Main } from "./components";
import Expenses from "./components/ExpenseForm";
import { add } from "./reducers/expenses";
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
  connect(
    state => state,
    { addConnect: add }
  ),
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

const App = ({ showFeature, addConnect, dispatch, ...props }) => (
  <Provider store={store}>
    <div>
      <h1>Ola mundo</h1>
      <Expenses.build onSubmit={addConnect} />
    </div>
  </Provider>
);

export default enhancer(App);
