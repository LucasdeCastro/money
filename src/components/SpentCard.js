import React from "react";
import {
  Spent,
  Button,
  SpentName,
  SpentValue,
  SpentButtons,
  SpentContainer
} from "./index";
import { formatDate, numberToReal, getMonthName } from "../utils";

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

export default SpentCard;
