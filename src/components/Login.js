import React from "react";
import { githubLogin } from "../firebase";
import { Main, Center, Container, ButtonGreen } from "./index";

const Login = () => (
  <Main>
    <Container>
      <Center>
        <h3>Github - money</h3>
        <p>
          Apenas um app para armazenar os gastos, para que as informações fiquem
          acessíveis de outros dispositivos realize o login.
        </p>

        <ButtonGreen
          style={{ width: "100%", margin: "20px 0px" }}
          onClick={githubLogin}
        >
          Login
        </ButtonGreen>
      </Center>
    </Container>
  </Main>
);

export default Login;
