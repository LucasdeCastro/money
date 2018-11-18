import React from "react";
import DyForm from "dy-form";
import { Button, Input, Error, FieldGroup } from "./components";

const input = ({ input, meta: { error }, placeholder, ...props }) => (
  <FieldGroup>
    <label>{placeholder}</label>
    <Input {...input} />
    {error && <Error>{error}</Error>}
  </FieldGroup>
);

const FormTemplate = new DyForm(
  { input },
  {
    submit: () => (
      <FieldGroup>
        <Button type={"submit"}>Save</Button>
      </FieldGroup>
    )
  },
  {
    onlyNumber: message => value =>
      value ? !/^[0-9]*$/.test(value) && message : false
  }
);

export default FormTemplate;
