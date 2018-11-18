import React from "react";
import DyForm from "dy-form";
import { Button, FieldGroup } from "./components";
import { input, select } from "./components/FormComponents";

const FormTemplate = new DyForm(
  { input, select },
  {
    submit: ({ label = "Save" }) => (
      <FieldGroup>
        <Button type={"submit"}>{label}</Button>
      </FieldGroup>
    )
  },
  {
    onlyNumber: message => value =>
      value ? !/^[0-9]*$/.test(value) && message : false
  }
);

export default FormTemplate;
