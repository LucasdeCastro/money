import React from "react";
import { numberToReal, MONTH_LIST } from "../utils";
import {
  Title,
  Values,
  Button,
  TitleText,
  TitleValues,
  TimelineItem,
  RowContainer,
  TimelineTitle,
  TimelineValue,
  ColumnContainer,
  TimelineContainer
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

const TimelineCard = ({ values }) => {
  const currentMonth = new Date().getMonth() + 1;
  return MONTH_LIST.slice(currentMonth, MONTH_LIST.length)
    .reduce((acc, month, index) => {
      const value = calcValue(values, index);
      if (!acc.length) return [{ month, value }];

      const last = acc[acc.length - 1];
      if (last && last.value === value) {
        const [start] = last.month.split("-");
        last.month = `${start}-${month}`;
      } else {
        acc.push({ month, value });
      }

      return acc;
    }, [])
    .map(({ month, value }, index) => (
      <TimelineItem key={`${month}-${index}`}>
        <TimelineTitle>{month}</TimelineTitle>
        <TimelineValue reverse={index % 2}>{numberToReal(value)}</TimelineValue>
      </TimelineItem>
    ));
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
          <Values noColor negative={total < 0}>
            <box-icon type='solid' color='#444' name='calculator' />{" "}
            {numberToReal(total)}
          </Values>

          <Values negative={balance < 0}>
            {balance < 0 ? (
              <box-icon color='red' name='trending-up' />
            ) : (
              <box-icon color='#14e214' name='trending-up' />
            )}
            {numberToReal(balance)}
          </Values>

          <Values blue negative={negativeTotal < 0}>
            <box-icon color={"#1a73e8"} name='like' />
            {numberToReal(negativeTotal)}
          </Values>
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
            <box-icon color='#14e214' name='check' />
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
            <box-icon color='#14e214' name='arrow-back' />
          </Button>
        )}
      </Title>
    </RowContainer>

    <TimelineContainer>
      <TimelineCard values={values} />
    </TimelineContainer>
  </ColumnContainer>
);

export default SpentTitle;
