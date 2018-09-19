import React from "react";
import { AddForm, Select, Button, Input, Title } from "./index";
import { connect } from "react-redux";
import { add } from "../reducers/expenses";

const handleClick = (inputs, addConnect) => () => {
  const { name, value, type } = inputs;
  if (name.value && value.value) {
    addConnect({
      name: name.value,
      value: parseFloat(value.value),
      type: type.value,
      lastUpdate: Date.now(),
      created: Date.now()
    });
  }

  name.value = "";
  value.value = "";
};

const AddSpent = props => {
  const refs = {};
  return (
    <AddForm>
      <Title>Adicionar novo gasto</Title>
      <Input
        placeholder="Nome"
        innerRef={ref => (refs.name = ref)}
        type="text"
        maxLength={20}
      />
      <Input
        placeholder="Valor"
        innerRef={ref => (refs.value = ref)}
        type="number"
      />
      <Select innerRef={ref => (refs.type = ref)} selected={"month"}>
        <option value={"month"}>Mensal</option>
        <option value={"day"}>Diário</option>
      </Select>
      <Button onClick={handleClick(refs, props.addConnect)}>ADD</Button>
    </AddForm>
  );
};

export default connect(
  null,
  { addConnect: add }
)(AddSpent);
