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
  ListContainer,
  Loading
} from "./index";
import { compose, branch, renderComponent } from "recompose";
import { connect } from "react-redux";
import { paid, remove, unPaid } from "../reducers/expenses";

const numberToReal = number => {
  if (!number) return "R$ 0 ";
  const value = parseFloat(number)
    .toFixed(2)
    .toString()
    .replace(/\./, ",");

  return ` R$ ${value}`;
};

const formatDate = time => {
  const date = new Date(time);
  const day = date
    .getDate()
    .toString()
    .padStart(2, "0");

  const month = (date.getMonth() + 1).toString().padStart(2, "0");

  return `${day}/${month}/${date.getFullYear()}`;
};

const SpentCard = ({
  spent,
  paid = false,
  paidClick,
  unPaidClick,
  removeClick
}) => {
  const { name, value, type, lastUpdate } = spent;
  return (
    <Spent negative={value < 0}>
      <SpentName>{name}</SpentName>
      <SpentName>{type}</SpentName>
      {paid && <SpentValue>{formatDate(lastUpdate)}</SpentValue>}
      <SpentValue>{numberToReal(value)}</SpentValue>
      <SpentButtons>
        {!paid && <Button onClick={() => paidClick(spent)}>Paid</Button>}
        {paid && <Button onClick={() => unPaidClick(spent)}>Owe</Button>}
        <Button onClick={() => removeClick(spent)}>Remove</Button>
      </SpentButtons>
    </Spent>
  );
};

const List = ({
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
        Total {numberToReal(topay.reduce((acc, { value: vl }) => acc + vl, 0))}
      </Values>
      <Values>
        Saldo{" "}
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
        Total {numberToReal(paid.reduce((acc, { value: vl }) => acc + vl, 0))}
      </Values>
      <Values>
        Saldo{" "}
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

const enhancer = compose(
  connect(
    ({ expenses, salary, firebase }) => ({
      ...expenses,
      firebase,
      salary: salary.value
    }),
    { paidConnect: paid, removeConnect: remove, unPaidConnect: unPaid }
  ),
  branch(props => props.firebase.loading, renderComponent(Loading))
);

export default enhancer(List);
