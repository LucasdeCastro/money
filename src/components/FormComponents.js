import React from "react";
import { Input, Error, Select, FieldGroup } from "./index";

export const input = ({ input, meta: { error }, placeholder }) => (
  <FieldGroup>
    <label>{placeholder}</label>
    <Input {...input} />
    {error && <Error>{error}</Error>}
  </FieldGroup>
);

export const select = ({ input, meta: { error }, placeholder, options }) => (
  <FieldGroup>
    <label>{placeholder}</label>
    <Select {...input}>
      {options.map(({ key, value }) => (
        <option value={key}>{value}</option>
      ))}
    </Select>
    {error && <Error>{error}</Error>}
  </FieldGroup>
);
