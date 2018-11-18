import Form from "../Form";
import { connect } from "react-redux";
import setEntry from "../reducers/entries";

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
      }
    },
    {
      name: "value",
      type: "input",
      props: { placeholder: "Valor" },
      validate: [
        { name: "onlyNumber", message: "Esse campo so pode ter numeros" }
      ]
    }
  )
  .setSubmitButtonProps({ label: "Add nova entrada" });

export default Entries;
