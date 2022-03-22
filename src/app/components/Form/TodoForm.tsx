import { memo, useCallback, useState } from "react";
import SelectInput from "../Inputs/SelectInput";
import Button from "@mui/material/Button";
import GenericInput from "../Inputs/GenericInput";
import TextArea from "../Inputs/TextArea";
import Typography from '@mui/material/Typography';
import { addTodoValidationSchema } from './validationScheme';

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
                console.log(values);
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
        [values]
    );

    return (
        <>
            <Typography
                variant="h4"
                component="h4"
                textAlign='center'
                marginTop={4}
                gutterBottom>
                You can add a Todo to the list!
            </Typography>
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
        </>
    )
};

export default memo(TodoForm);