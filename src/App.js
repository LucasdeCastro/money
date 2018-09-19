import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { Main, Container } from "./components";
import ExpensesList from "./components/ExpensesList";
import AddSpent from "./components/AddSpent";
import Salary from "./components/Salary";

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Main>
        <Container>
          <Salary />
          <AddSpent />
          <ExpensesList />
        </Container>
      </Main>
    </PersistGate>
  </Provider>
);

export default App;
