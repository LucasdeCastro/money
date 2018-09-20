import React from "react";
import { Title, Input, AddForm } from "./index";
import { connect } from "react-redux";
import { setSalary } from "../reducers/expenses";

const Salary = ({ salary, setSalaryConnect }) => (
  <AddForm>
    <Title>Salário</Title>
    <Input
      type="number"
      value={salary === "0" ? "" : salary}
      placeholder="Salário"
      onChange={({ target: { value } }) => value && setSalaryConnect(value)}
    />
  </AddForm>
);

export default connect(
  ({ expenses }) => expenses,
  { setSalaryConnect: setSalary }
)(Salary);
