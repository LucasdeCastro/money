import Form from "../Form";

const Expenses = Form.create("expenses")
  .fields(
    {
      name: "name",
      type: "input",
      props: { placeholder: "Nome" }
    },
    {
      name: "value",
      type: "input",
      props: { placeholder: "Valor" },
      validate: [
        { name: "onlyNumber", message: "Esse campo so pode ter numeros" }
      ]
    },
    {
      name: "type",
      type: "select",
      props: { placeholder: "Tipo", options: [{ value: "Prazo", key: "P" }] }
    }
  )
  .onSubmit(form => console.log("FORM", form));

export default Expenses;
