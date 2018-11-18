import React from "react";
import DyForm from "dy-form";
import { Button, Input, Error, Select, FieldGroup } from "./components";
import { input, select } from "./components/FormComponents";

const FormTemplate = new DyForm(
  { input, select },
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
