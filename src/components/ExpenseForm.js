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
        { name: "onlyNumber", message: "Esse campo só pode ter números" }
      ]
    },
    {
      name: "type",
      type: "select",
      props: {
        placeholder: "Tipo",
        options: [{ value: "Fixa", key: "F" }, { value: "Prazo", key: "P" }]
      }
    }
  )
  .workflow({
    name: "type",
    values: ["P"],
    fields: [
      {
        name: "times",
        type: "input",
        props: {
          placeholder: "Em quantas vezes?"
        },
        validate: [
          { name: "onlyNumber", message: "Esse campo só pode ter números" }
        ]
      }
    ]
  })
  .setSubmitButtonProps({ label: "Add novo gasto" });

export default Expenses;
