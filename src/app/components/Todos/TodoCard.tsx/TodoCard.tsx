import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { deleteTodo, editTodo } from '../../../store/todos/index';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SelectInput } from '../../Inputs/index';
import { ITodo } from '../../../store/interface';

import Style from './todoCard.module.scss'

interface CommonTitleProps {
    content: string
}

const CommonTitle: React.FC<CommonTitleProps> = ({ content }) => (
    <Typography
        variant="subtitle1"
        noWrap
        component="h4"
        gutterBottom>
        {content}
    </Typography>
)

export interface TodoCardProps {
    todo: ITodo,
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

interface EditValues {
    priority: string,
    status: string
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, setIsEditing }) => {
    const { priority, status, title, description, id } = todo;

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [filterValues, setFilterValues] = useState<EditValues>({ priority: '', status: '' });

    useEffect(() =>{
        setIsEditing(isEdit)
    },[isEdit, setIsEditing])


    const dispatch = useAppDispatch();

    const handleDelete = (id: string) => {
        dispatch(deleteTodo(id));
    }

    const onHandleChange = useCallback((fieldName: string, value:string) => {
        setFilterValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
    }, []);


    const editButton = useMemo(() => {
        const { priority:priorityChoice, status:statusChoice } = filterValues;
        const handleEdit = () => {
            if(isEdit){
                const newPriority:string | null = priorityChoice || priority;
                const newStatus:string | null = statusChoice || status;

                dispatch(editTodo({id, priority: newPriority, status:newStatus}))
            }
            setIsEdit(!isEdit)

        }
        return (
            <Button
                size="small"
                variant="outlined"
                color={isEdit ? 'secondary' : 'primary'}
                onClick={handleEdit} >
                {isEdit ? 'Done' : 'Edit (Priority or State)'}
            </Button>
        )
    }, [dispatch, filterValues, id, isEdit, priority, status])

    const editableItems = useMemo(() => {
        if (!isEdit) return (
            <div className={Style.container__editable}>
                < CommonTitle content={`Priority:  ${priority}`} />
                < CommonTitle content={`Status:  ${status}`} />
            </div>
        )
        return (
            <div className={Style["container__editable--on"]}>
                <div className={Style["container__editable--on__select"]}>
                    < CommonTitle content={`Priority: `} />
                    <SelectInput
                        name='Priority'
                        options={['low', 'medium', 'high']}
                        initialValue={priority}
                        onHandleChange={onHandleChange}
                        inputKey='priority'
                        inputValue={filterValues.priority}
                    />
                </div>
                <div className={Style["container__editable--on__select"]}>
                    < CommonTitle content={`Status: `} />
                    <SelectInput
                        name='Status'
                        options={['new', 'in process', 'done']}
                        initialValue={status}
                        onHandleChange={onHandleChange}
                        inputKey='status'
                        inputValue={filterValues.status}
                    />
                </div>
            </div>
        )

    }, [filterValues.priority, filterValues.status, isEdit, onHandleChange, priority, status])


    return (
        <div className={Style.container}>
            <Card>
                <CardContent>
                    {editableItems}
                    <div className={Style.container__title}>
                        < CommonTitle content={"Title: "} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="h3">
                            {title}
                        </Typography>
                    </div>
                    < CommonTitle content="Description:" />
                    <Typography
                        variant="body1"
                        component="p">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions>
                    {editButton}
                    <Button size="small" variant="contained" color='error' onClick={() => handleDelete(id)}>Delete</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default TodoCard;