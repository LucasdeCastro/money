import React from "react";
import { githubLogin } from "../firebase";
import { Center, ButtonGreen } from "./index";

const Login = () => (
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
);

export default Login;
