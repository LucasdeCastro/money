import Form from "../Form";

const Entries = Form.create("entries")
  .fields(
    {
      name: "type",
      type: "select",
      props: {
        placeholder: "Tipo",
        options: [
          { value: "Salário", key: "salary" },
          { value: "Extras", key: "extra" }
        ]
      },
      validate: [{ name: "required", message: "O valor é obrigatório" }]
    },
    {
      name: "value",
      type: "input",
      props: { placeholder: "Valor" },
      validate: [
        { name: "required", message: "O valor é obrigatório" },
        { name: "onlyNumber", message: "Esse campo so pode ter numeros" }
      ]
    }
  )
  .setSubmitButtonProps({ label: "Add nova entrada" });

export default Entries;
