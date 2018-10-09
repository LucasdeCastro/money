import React from "react";
import { connect } from "react-redux";
import { addExtra } from "../reducers/expenses";
import { Title, Input, Button, AddForm, RowContainer } from "./index";

const handleClick = (inputs, submit) => () => {
  const { origin, value } = inputs;
  if (origin.value && value.value)
    submit({ origin: origin.value, value: value.value });

  value.value = "";
  origin.value = "";
};

const Extra = ({ addConnect }) => {
  const refs = {};
  return (
    <AddForm>
      <Title>Renda Extra</Title>
      <RowContainer>
        <Input innerRef={ref => (refs.origin = ref)} placeholder={"Origem"} />
        <Input
          type={"number"}
          placeholder={"Valor"}
          innerRef={ref => (refs.value = ref)}
        />
      </RowContainer>
      <Button onClick={handleClick(refs, addConnect)}>ADD</Button>
    </AddForm>
  );
};

export default connect(
  null,
  { addConnect: addExtra }
)(Extra);
