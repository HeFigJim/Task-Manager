import { Formik, Form, FormikHelpers } from "formik";
import * as yup from "yup";
import { ITask } from "../models/ITask";
import "react-datepicker/dist/react-datepicker.css";
import MyDatePicker from "./MyDatePicker";
import categories from "../categories";
import { v4 as uuidv4 } from "uuid";

type FormProps = {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
};
const TaskForm = ({ setTasks, tasks }: FormProps) => {
  const initialValues: ITask = {
    id: uuidv4(),
    title: "",
    dueDate: new Date(),
    category: "",
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required().min(3, "must be more than 3 characters"),
    dueDate: new yup.DateSchema().required(),
    category: yup
      .string()
      .required()
      .oneOf(categories)
      .label("Selected Category"),
  });
  const handleSubmit = (values: ITask, helpers: FormikHelpers<ITask>) => {
    let id = uuidv4();
    const newTask = [...tasks, { ...values, id: id }];
    setTasks(newTask);
    localStorage.setItem("tasks", JSON.stringify(newTask));
    console.log(tasks);
    helpers.resetForm();
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(props) => {
          return (
            <Form className="form-inline w-100 ">
              <label className="sr-only" htmlFor="inlineFormInputName2">
                Title
              </label>
              <input
                type="text"
                className="form-control mb-2 mr-sm-2 "
                id="inlineFormInputName2"
                placeholder="Jane Doe"
                name="title"
                value={props.values.title}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
              />
              {props.errors.title && props.touched.title && (
                <p className="text-decoration-underline text-uppercase text-danger ">
                  {props.errors.title}
                </p>
              )}
              <label className="control-label" htmlFor="date">
                Date
              </label>
              <div
                className="mb-4 -2 "
                onClick={() => props.setFieldTouched("dueDate", true)}
              >
                <MyDatePicker
                  name="dueDate"
                  value={props.values.dueDate}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
              </div>
              {props.errors.dueDate && props.touched.dueDate && (
                <p className="text-decoration-underline text-uppercase text-danger">
                  Date is required
                </p>
              )}

              <label className="form-check-label" htmlFor="inlineFormCheck">
                Category
              </label>
              <select
                className="form-select m-x-2 mb-2"
                aria-label="Disabled select example"
                name="category"
                value={props.values.category}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
              >
                <option defaultValue={"Open this select menu"}>
                  Open this select menu
                </option>

                {categories.map((item, i) => (
                  <option key={i}>{item}</option>
                ))}
              </select>
              {props.errors.category && props.touched.category && (
                <p className="text-decoration-underline text-uppercase text-danger">
                  {props.errors.category}
                </p>
              )}
              <button type="submit" className="mt-2 bg-success">
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default TaskForm;
