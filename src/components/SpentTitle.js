import React from "react";
import { numberToReal, MONTH_LIST } from "../utils";
import {
  Title,
  Values,
  Button,
  TitleText,
  TitleValues,
  RowContainer,
  TimelineTitle,
  TimelineValue,
  ColumnContainer,
  TimelineContainer,
  TimelineHeaderContainer
} from "./index";

const calcValue = (values, index) => {
  return values.reduce((acc, { parcel, times, value }) => {
    if (times) {
      const rest = parseInt(times, 10) - parcel;
      if (rest >= index + 1) return acc + value;
      return acc;
    }

    return acc + value;
  }, 0);
};

const TimelineHeader = () => {
  const currentMonth = new Date().getMonth() + 1;
  return MONTH_LIST.slice(currentMonth, MONTH_LIST.length).map(
    (month, index) => (
      <TimelineTitle key={`${month}-${index}`}>{month}</TimelineTitle>
    )
  );
};

const TimelineValues = ({ values }) => {
  const currentMonth = new Date().getMonth() + 1;
  return MONTH_LIST.slice(currentMonth, MONTH_LIST.length).map(
    (month, index) => (
      <TimelineValue key={`${month}-${index}`} reverse={index % 2}>
        {numberToReal(calcValue(values, index))}
      </TimelineValue>
    )
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
  <ColumnContainer isGroup={isGroup}>
    <RowContainer>
      <Title isGroup={isGroup}>
        <TitleText>{name}</TitleText>
        <TitleValues full>
          <Values isGroup={isGroup} negative={total < 0}>
            Total {numberToReal(total)}
          </Values>

          {balance !== undefined && (
            <Values negative={balance < 0}>
              Saldo {numberToReal(balance)}
            </Values>
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
    </RowContainer>

    <TimelineContainer>
      <TimelineHeaderContainer>
        <TimelineHeader />
      </TimelineHeaderContainer>
      <RowContainer>
        <TimelineValues values={values} />
      </RowContainer>
    </TimelineContainer>
  </ColumnContainer>
);

export default SpentTitle;
