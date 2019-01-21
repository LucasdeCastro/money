import React from "react";
import {
  Spent,
  Button,
  SpentName,
  SpentValue,
  SpentButtons,
  SpentContainer
} from "./index";
import { numberToReal, getMonthName } from "../utils";

const SpentCard = ({
  spent,
  isGroup = false,
  paid = false,
  paidClick,
  unPaidClick,
  removeClick
}) => {
  const { name, value, parcel, times } = spent;
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
        <SpentValue right>{numberToReal(value)}</SpentValue>
      </SpentContainer>
      <SpentButtons isGroup={isGroup}>
        <SpentName start mobile>
          <b>
            {monthString ? ` ${monthString} - ` : ""}
            {times ? `${parcelString}/${times.padStart(2, "00")}` : ""}
          </b>
        </SpentName>

        {paid ? (
          <Button
            secondary
            onClick={() => unPaidClick(spent)}
            disabled={times && parcel && times === parcel.toString()}
          >
            <box-icon color='#14e214' name='arrow-back' />
          </Button>
        ) : (
          <Button icon alt='Conta paga' onClick={() => paidClick(spent)}>
            <box-icon color='#14e214' name='check' />
          </Button>
        )}

        <Button icon onClick={() => removeClick(spent)}>
          <box-icon color='#CCC' type='regular' name='x' />
        </Button>
      </SpentButtons>
    </Spent>
  );
};

export default SpentCard;
