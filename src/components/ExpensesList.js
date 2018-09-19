import React from "react";
import {
  Spent,
  Title,
  Values,
  Button,
  TitleText,
  SpentName,
  SpentValue,
  SpentButtons,
  ListContainer
} from "./index";
import { connect } from "react-redux";
import { paid, remove, unPaid } from "../reducers/expenses";

const numberToReal = number => {
  if (!number) return " R$ 0 ";
  let num = parseFloat(number)
    .toFixed(2)
    .split(".");

  num[0] = " R$ " + num[0].split(/(?=(?:...)*$)/).join(".");
  return num.join(",");
};

const SpentCard = ({
  spent,
  paid = false,
  paidClick,
  unPaidClick,
  removeClick
}) => {
  const { name, value, type } = spent;
  return (
    <Spent>
      <SpentName>{name}</SpentName>
      <SpentName>{type}</SpentName>
      <SpentValue>{numberToReal(value)}</SpentValue>
      <SpentButtons>
        {!paid && <Button onClick={() => paidClick(spent)}>Paid</Button>}
        {paid && <Button onClick={() => unPaidClick(spent)}>Owe</Button>}
        <Button onClick={() => removeClick(spent)}>Remove</Button>
      </SpentButtons>
    </Spent>
  );
};

const ExpensesList = ({
  topay,
  paid,
  salary,
  removeConnect,
  paidConnect,
  unPaidConnect
}) => (
  <ListContainer>
    <Title key="topay">
      <TitleText>Pendentes</TitleText>
      <Values>
        Total
        {numberToReal(topay.reduce((acc, { value: vl }) => acc + vl, 0))}
      </Values>
      <Values>
        Saldo
        {numberToReal(topay.reduce((acc, { value: vl }) => acc - vl, salary))}
      </Values>
    </Title>
    {topay.map((spent, key) => (
      <SpentCard
        spent={spent}
        key={`${key}-topay`}
        paidClick={paidConnect}
        removeClick={removeConnect}
      />
    ))}
    <Title key="paid">
      <TitleText>Pagos</TitleText>
      <Values>
        Total
        {numberToReal(paid.reduce((acc, { value: vl }) => acc + vl, 0))}
      </Values>
      <Values>
        Saldo
        {numberToReal(paid.reduce((acc, { value: vl }) => acc - vl, salary))}
      </Values>
    </Title>
    {paid.map((spent, key) => (
      <SpentCard
        paid={true}
        spent={spent}
        key={`${key}-paid`}
        unPaidClick={unPaidConnect}
        removeClick={removeConnect}
      />
    ))}
  </ListContainer>
);

export default connect(
  ({ expenses }) => expenses,
  { paidConnect: paid, removeConnect: remove, unPaidConnect: unPaid }
)(ExpensesList);
