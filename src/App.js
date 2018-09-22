import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { githubLogout } from "./firebase";
import { Main, Container, ButtonGreen } from "./components";
import ExpensesList from "./components/ExpensesList";
import AddSpent from "./components/AddSpent";
import Login from "./components/Login";
import Salary from "./components/Salary";

const App = () => (
  <Provider store={store}>
    <Main>
      <Container>
        {localStorage.getItem("access_token") ? (
          <div>
            <h3>Github - Money</h3>
            <ButtonGreen onClick={githubLogout}>Logout</ButtonGreen>
            <Salary />
            <AddSpent />
            <ExpensesList />
          </div>
        ) : (
          <Login />
        )}
      </Container>
    </Main>
  </Provider>
);

export default App;
