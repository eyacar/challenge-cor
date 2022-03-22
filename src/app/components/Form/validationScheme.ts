import * as yup from "yup";

const selectValidation = yup.string().required("Choose a valid option")

export const addTodoValidationSchema = yup.object({
  status: selectValidation,
  priority: selectValidation,
  title: yup.string().required("Add a Title"),
  description: yup.string().required("Add a Description")
});