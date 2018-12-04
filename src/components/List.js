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
  SpentContainer,
  Loading
} from "./index";
import { connect } from "react-redux";
import { compose, branch, renderComponent, withProps } from "recompose";
import { paid, remove, unPaid } from "../reducers/expenses";

const sumlist = (list, start = 0) =>
  list.reduce((acc, { value: vl }) => acc + vl, start);

const sumNegative = (list, start = 0) =>
  list.reduce(
    (acc, { value: vl }) => (vl < 0 ? acc + Math.abs(vl) : acc),
    start
  );

const rifle = (list, value) =>
  list.reduce((acc, { value: vl }) => acc - vl, value);

const filterGroup = list =>
  list.filter(({ name }) => name.split("-").length <= 1);

const reduceGroup = (acc, item) => {
  const name = item.name.split("-");

  if (name.length > 1) {
    const key = name[0].toUpperCase().trim();
    if (acc[key]) acc[key].push(item);
    else acc[key] = [item];
  }
  return acc;
};

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

  const hour = date
    .getHours()
    .toString()
    .padStart(2, "0");

  const minute = date
    .getMinutes()
    .toString()
    .padStart(2, "0");

  const month = (date.getMonth() + 1).toString().padStart(2, "0");

  return `${day}/${month} ${hour}:${minute}`;
};

const SpentCard = ({
  spent,
  paid = false,
  paidClick,
  unPaidClick,
  removeClick
}) => {
  const { name, value, parcel, times, lastUpdate } = spent;
  const parcelString = parcel ? parcel.toString().padStart(2, "0") : "0";
  return (
    <Spent
      disable={times && parcel && times === parcel.toString()}
      negative={value < 0}
    >
      <SpentContainer>
        <SpentName>{name}</SpentName>
        <SpentName>
          <b>
            {times ? `parcela ${parcelString}/${times.padStart(2, "0")}` : ""}
          </b>
        </SpentName>
        <SpentValue>{formatDate(lastUpdate)}</SpentValue>
        <SpentValue>{numberToReal(value)}</SpentValue>
      </SpentContainer>
      <SpentButtons>
        {paid ? (
          <Button
            secondary
            onClick={() => unPaidClick(spent)}
            disabled={times && parcel && times === parcel.toString()}
          >
            Pendente
          </Button>
        ) : (
          <Button secondary onClick={() => paidClick(spent)}>
            Tá pago
          </Button>
        )}

        <Button secondary onClick={() => removeClick(spent)}>
          Remover
        </Button>
      </SpentButtons>
    </Spent>
  );
};

const SpentTitle = ({
  name,
  total,
  values,
  balance,
  paidClick,
  negativeTotal,
  isGroup = false
}) => (
  <Title isGroup={isGroup}>
    <TitleText>{name}</TitleText>
    <Values isGroup={isGroup} negative={total < 0}>
      Total {numberToReal(total)}
    </Values>

    {balance !== undefined && (
      <Values negative={balance < 0}>Saldo {numberToReal(balance)}</Values>
    )}

    {!!negativeTotal && (
      <Values blue negative={negativeTotal < 0}>
        Receber {numberToReal(negativeTotal)}
      </Values>
    )}

    {isGroup && (
      <Button
        withoutMargin
        onClick={() =>
          values.map((spent, key) =>
            setTimeout(() => paidClick(spent), 100 * key)
          )
        }
      >
        Pagar todos
      </Button>
    )}
  </Title>
);

const List = ({
  topay,
  paid,
  groupToPay,
  paidBalance,
  pendentTotal,
  pendentBalance,
  paidTotal,
  removeConnect,
  paidConnect,
  unPaidConnect,
  negativeTotal
}) => (
  <ListContainer>
    <SpentTitle
      key={"topay"}
      name={"Pendentes"}
      total={pendentTotal}
      balance={pendentBalance}
      negativeTotal={negativeTotal}
    />

    {topay.map((spent, key) => (
      <SpentCard
        spent={spent}
        key={`${key}-topay`}
        paidClick={paidConnect}
        removeClick={removeConnect}
      />
    ))}

    {groupToPay.map(([name, values]) => (
      <ListContainer key={`group-${name}`}>
        <SpentTitle
          isGroup
          key={name}
          name={name}
          values={values}
          background={"#F6F8FA"}
          paidClick={paidConnect}
          total={sumlist(values)}
        />

        {values.map((spent, key) => (
          <SpentCard
            spent={{ ...spent, name: spent.name.split("-")[1] }}
            key={`${key}--group`}
            paidClick={paidConnect}
            removeClick={removeConnect}
          />
        ))}
      </ListContainer>
    ))}

    <Title key="paid">
      <TitleText>Pagos</TitleText>
      <Values negative={paidTotal < 0}>Total {numberToReal(paidTotal)}</Values>
      <Values negative={paidBalance < 0}>
        Saldo {numberToReal(paidBalance)}
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
    ({ expenses: { topay, ...expenses }, salary, firebase }) => ({
      ...expenses,
      _topay: topay,
      topay: filterGroup(topay),
      groupToPay: Object.entries(topay.reduce(reduceGroup, {})),
      firebase,
      salary: salary.value
    }),
    { paidConnect: paid, removeConnect: remove, unPaidConnect: unPaid }
  ),
  withProps(({ _topay, paid, salary }) => ({
    negativeTotal: sumNegative(_topay),
    pendentTotal: sumlist(_topay),
    pendentBalance: rifle(_topay, salary),
    paidTotal: sumlist(paid),
    paidBalance: rifle(paid, salary)
  })),
  branch(props => props.firebase.loading, renderComponent(Loading))
);

export default enhancer(List);
