import { memo, useCallback, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { addTodo } from "../../store/todos";
import SelectInput from "../Inputs/SelectInput";
import Button from "@mui/material/Button";
import GenericInput from "../Inputs/GenericInput";
import TextArea from "../Inputs/TextArea";
import { addTodoValidationSchema } from './validationScheme';
import { ITodo } from "../../store/interface";

import Style from './style/todoForm.module.scss'

interface FormValues {
    priority: string,
    status: string,
    title: string,
    description: string
}

const initialState = {
    priority: "",
    status: "",
    title: "",
    description: ""
}

const TodoForm = () => {
    const [values, setValues] = useState<FormValues>(initialState);
    const [errors, setErrors] = useState<FormValues>(initialState);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onHandleChange = useCallback((fieldName: string, value: string) => {
        setValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
    }, []);

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();

            setErrors(initialState);

            // Check the schema if form is valid:
            const isFormValid = await addTodoValidationSchema.isValid(values);

            if (isFormValid) {
                // If form is valid, continue submission.
                const newTodo:ITodo = {...values, id: uuidv4()}
                dispatch(addTodo(newTodo));
                navigate('/')
            } else {
                // If form is not valid, check which fields are incorrect:
                addTodoValidationSchema
                    .validate(values, { abortEarly: false })
                    .catch((err) => {
                        // Set the error message with the errors we are getting from yup
                        err.inner.forEach((error: { path: string, message: string }) => {
                            setErrors((prevValues) => ({
                                ...prevValues,
                                [error.path]: error.message
                            }));
                        });
                    });
            }
        },
        [dispatch, values]
    );

    return (
            <form onSubmit={handleSubmit} noValidate className={Style.container}>
                <SelectInput
                    name='Priority'
                    options={['low', 'medium', 'high']}
                    initialValue={null}
                    onHandleChange={onHandleChange}
                    inputKey='priority'
                    inputValue={values.priority}
                    error={errors.priority}
                />
                <SelectInput
                    name='Status'
                    options={['new', 'in process', 'done']}
                    initialValue={null}
                    onHandleChange={onHandleChange}
                    inputKey='status'
                    inputValue={values.status}
                    error={errors.status}
                />
                <GenericInput
                    inputName='Title'
                    onHandleChange={onHandleChange}
                    inputKey='title'
                    inputValue={values.title}
                    error={errors.title}
                />
                <TextArea
                    name='Description'
                    onHandleChange={onHandleChange}
                    inputKey='description'
                    error={errors.description}
                />
                <div >
                    <Button variant="contained" type="submit" size='large' sx={{ marginRight: '10px' }}>
                        Submit
                    </Button>
                </div>
            </form>
    )
};

export default memo(TodoForm);