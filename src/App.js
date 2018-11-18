import React from "react";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import { store } from "./store";
import Form from "./Form";
import { Container, Main } from "./components";
import Login from "./components/Login";
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

const Expenses = Form.create("expenses")
  .fields(
    {
      name: "name",
      type: "input",
      props: { placeholder: "Nome do gasto" }
    },
    {
      name: "value",
      type: "input",
      props: { placeholder: "Valor do gasto" },
      validate: [
        { name: "onlyNumber", message: "Esse campo so pode ter numeros" }
      ]
    }
  )
  .onSubmit(e => console.log("FORM", e));

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
