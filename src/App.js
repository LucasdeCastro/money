import React from "react";
import { store } from "./store";
import { Provider, connect } from "react-redux";
import Login from "./components/Login";
import { Container, Main } from "./components";
import Expenses from "./components/ExpenseForm";
import { add } from "./reducers/expenses";
import Entries from "./components/EntriesForm";
import Modal from "./components/Modal";
import { setEntry } from "./reducers/entries";

import {
  withReducer,
  withProps,
  compose,
  branch,
  renderComponent
} from "recompose";

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
    { addConnect: add, setEntryConnect: setEntry }
  ),
  withReducer("showFeature", "dispatch", toggleFeature),
  withProps(({ addConnect }) => ({
    onSubmitExpenses: (form, { reset }) => {
      reset();
      addConnect(form);
    }
  })),
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

const App = ({ onSubmitExpenses, setEntryConnect }) => (
  <Provider store={store}>
    <div>
      <h1>Ola mundo</h1>
      <Modal
        title={"Nova Entrada"}
        label={"Adiciona entrada"}
        onSubmit={setEntryConnect}
      >
        <Entries.build />
      </Modal>
      <Modal
        title={"Novo Gasto"}
        label={"Adicionar gasto"}
        onSubmit={onSubmitExpenses}
      >
        <Expenses.build />
      </Modal>
    </div>
  </Provider>
);

export default enhancer(App);
