import React from "react";
import { AddForm, Select, Button, Input, InputLabel } from "./index";
import { connect } from "react-redux";
import { add } from "../reducers/expenses";

const handleClick = (inputs, addConnect) => () => {
  const { name, value, type, times } = inputs;
  if (name.value && value.value) {
    addConnect({
      name: name.value,
      times: times.value,
      value: parseFloat(value.value),
      type: type.value,
      lastUpdate: Date.now(),
      created: Date.now()
    });
  }

  name.value = "";
  times.value = "";
  value.value = "";
};

const AddSpent = props => {
  const refs = {};
  return (
    <AddForm>
      <h3>Adicionar novo gasto</h3>
      <InputLabel>Nome</InputLabel>
      <Input
        type='text'
        placeholder='Utilize o - para criar uma categoria Ex: Cartão - Bike'
        innerRef={ref => (refs.name = ref)}
      />
      <InputLabel>Valor</InputLabel>
      <Input
        placeholder='Digitar o valor utilizando o formato Americano'
        innerRef={ref => (refs.value = ref)}
        type='number'
      />
      <InputLabel>Parcelas</InputLabel>
      <Input
        min='0'
        step='1'
        type='number'
        pattern='\d*'
        placeholder='Parcelas somente numeros inteiros'
        innerRef={ref => (refs.times = ref)}
      />
      <InputLabel>Tipo</InputLabel>
      <Select innerRef={ref => (refs.type = ref)} selected={"month"}>
        <option value={"month"}>Mensal</option>
        <option value={"day"}>Diário</option>
      </Select>
      <Button onClick={handleClick(refs, props.addConnect)}>Salvar</Button>
    </AddForm>
  );
};

export default connect(
  null,
  { addConnect: add }
)(AddSpent);
