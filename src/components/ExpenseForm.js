import Form from "../Form";

const Expenses = Form.create("expenses")
  .fields(
    {
      name: "name",
      type: "input",
      props: { placeholder: "Nome" },
      validate: [{ name: "required", message: "O nome do gasto é obrigatório" }]
    },
    {
      name: "value",
      type: "input",
      props: { placeholder: "Valor" },
      validate: [
        { name: "required", message: "O valor é obrigatório" },
        { name: "onlyNumber", message: "Esse campo só pode ter números" }
      ]
    },
    {
      name: "type",
      type: "select",
      props: {
        placeholder: "Tipo",
        options: [{ value: "Fixa", key: "F" }, { value: "Prazo", key: "P" }]
      },
      validate: [{ name: "required", message: "O tipo é obrigatório" }]
    }
  )
  .workflows({
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
          {
            name: "required",
            message: "A quantidade de parcelas de é obrigatória"
          },
          { name: "onlyNumber", message: "Esse campo só pode ter números" }
        ]
      }
    ]
  })
  .setSubmitButtonProps({ label: "Add novo gasto" });

export default Expenses;
