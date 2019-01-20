import React from "react";
import { Title, Input, AddForm } from "./index";
import { connect } from "react-redux";
import { setSalary } from "../reducers/salary";

const Salary = ({ salary, setSalaryConnect }) => (
  <AddForm>
    <Title>Salário</Title>
    <Input
      type='number'
      value={salary === 0 ? "" : salary}
      placeholder='Salário'
      onChange={({ target: { value } }) => setSalaryConnect(value)}
    />
  </AddForm>
);

export default connect(
  ({ salary }) => ({ salary: salary.value }),
  { setSalaryConnect: setSalary }
)(Salary);
