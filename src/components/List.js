import React from "react";
import {
  Spent,
  Title,
  Values,
  Button,
  TitleText,
  SpentName,
  SpentValue,
  TitleValues,
  SpentButtons,
  ListContainer,
  SpentContainer,
  Loading
} from "./index";
import { connect } from "react-redux";
import { compose, branch, renderComponent, withProps } from "recompose";
import { paid, remove, unPaid, sort } from "../reducers/expenses";

const MONTH_LIST = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

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

const getGroup = topay => {
  const map = topay.reduce(reduceGroup, {});
  const list = Object.entries(map);
  return list.map(([name, values]) => {
    return [name, values.sort(sort)];
  });
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

const getMonthName = (times = 0, parcel = 0) => {
  if (!times) return "";
  const month = new Date().getMonth() + (times - parcel);
  return MONTH_LIST[month];
};

const SpentCard = ({
  spent,
  isGroup = false,
  paid = false,
  paidClick,
  unPaidClick,
  removeClick
}) => {
  const { name, value, parcel, times, lastUpdate } = spent;
  const parcelString = parcel ? parcel.toString().padStart(2, "0") : "00";
  const monthString = getMonthName(times, parcel);
  return (
    <Spent
      disable={times && parcel && times === parcel.toString()}
      negative={value < 0}
    >
      <SpentContainer>
        <SpentName size={2} title={name}>
          {name}
        </SpentName>
        <SpentName mobile={false}>
          <b>
            {monthString ? ` ${monthString} - ` : ""}
            {times ? `${parcelString}/${times.padStart(2, "00")}` : ""}
          </b>
        </SpentName>
        <SpentValue mobile={false}>{formatDate(lastUpdate)}</SpentValue>
        <SpentValue right>{numberToReal(value)}</SpentValue>
      </SpentContainer>
      <SpentButtons isGroup={isGroup}>
        <SpentValue mobile>{formatDate(lastUpdate)}</SpentValue>
        <SpentName mobile>
          <b>
            {times ? `${parcelString}/${times.padStart(2, "00")}` : ""}
            {monthString || ""}
          </b>
        </SpentName>
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
  unPaidClick,
  negativeTotal,
  unPaid = false,
  isGroup = false
}) => (
  <Title isGroup={isGroup}>
    <TitleText>{name}</TitleText>
    <TitleValues full>
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
    </TitleValues>

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

    {unPaid && (
      <Button
        withoutMargin
        onClick={() =>
          values.map((spent, key) =>
            setTimeout(() => unPaidClick(spent), 100 * key)
          )
        }
      >
        Todos Pendente
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
            isGroup
            spent={{ ...spent, name: spent.name.split("-")[1] }}
            key={`${key}--group`}
            paidClick={paidConnect}
            removeClick={removeConnect}
          />
        ))}
      </ListContainer>
    ))}

    <SpentTitle
      unPaid
      key={"paid"}
      values={paid}
      name={"Pagos"}
      total={paidTotal}
      balance={paidBalance}
      unPaidClick={unPaidConnect}
    />

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
      groupToPay: getGroup(topay),
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
