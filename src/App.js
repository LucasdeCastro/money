import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { githubLogout } from "./firebase";
import {
  Main,
  Container,
  Button,
  RowContainer,
  ButtonGreen
} from "./components";
import List from "./components/List";
import AddSpent from "./components/AddSpent";
import Login from "./components/Login";
import Extra from "./components/Extra";
import Salary from "./components/Salary";
import { withReducer } from "recompose";

const TOGGLE = "TOGGLE";
const toggleFeature = (flag = false, action) => {
  switch (action.type) {
    case TOGGLE:
      return !flag;
    default:
      return flag;
  }
};

const App = ({ showFeature, dispatch }) => (
  <Provider store={store}>
    <Main>
      {localStorage.getItem("access_token") ? (
        <Container>
          <h3>Github - Money</h3>

          <RowContainer>
            <ButtonGreen onClick={githubLogout}>Logout</ButtonGreen>
            <Button onClick={() => dispatch({ type: TOGGLE })}>
              {showFeature ? "Hide" : "Show"}
            </Button>
          </RowContainer>

          {showFeature && [<Salary />, <AddSpent />, <Extra />]}

          <List />
        </Container>
      ) : (
        <Container>
          <Login />
        </Container>
      )}
    </Main>
  </Provider>
);

export default withReducer("showFeature", "dispatch", toggleFeature)(App);
