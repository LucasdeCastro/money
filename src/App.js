import React from "react";
import { connect, Provider } from "react-redux";
import { store } from "./store";
import { githubLogout } from "./firebase";
import {
  Main,
  Button,
  ButtonGreen,
  ListContainer,
  GroupContainer,
  TitleContainer
} from "./components";
import List from "./components/List";
import AddSpent from "./components/AddSpent";
import Login from "./components/Login";
import Salary from "./components/Salary";
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
    renderComponent(() => <Login />)
  )
);

const App = ({ showFeature, dispatch }) => (
  <Provider store={store}>
    <Main>
      <TitleContainer>
        <h3>Github - Money</h3>
        <Button
          secondary={!showFeature}
          onClick={() => dispatch({ type: TOGGLE })}
        >
          {showFeature ? "Esconder" : "Adicionar"}
        </Button>
        <ButtonGreen onClick={githubLogout}>Logout</ButtonGreen>
      </TitleContainer>

      <ListContainer>
        {showFeature && (
          <GroupContainer>
            <Salary />
            <AddSpent />
          </GroupContainer>
        )}
        <List />
      </ListContainer>
    </Main>
  </Provider>
);

export default enhancer(App);
