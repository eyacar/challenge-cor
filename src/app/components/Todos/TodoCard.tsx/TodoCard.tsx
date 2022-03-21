import React, { useMemo, useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { deleteTodo, editTodo } from '../../../store/todos/index';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SelectInput from '../../SelectInput/SelectInput';
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
    todo: ITodo
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
    const { priority, status, title, description, id } = todo;

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [priorityChoice, setPriorityChoise] = useState<string | null>(null);
    const [statusChoice, setStatusChoise] = useState<string | null>(null);


    const dispatch = useAppDispatch();

    const handleDelete = (id: string) => {
        dispatch(deleteTodo(id));
    }


    const editButton = useMemo(() => {
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
    }, [dispatch, id, isEdit, priority, priorityChoice, status, statusChoice])

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
                        setChoice={setPriorityChoise}
                    />
                </div>
                <div className={Style["container__editable--on__select"]}>
                    < CommonTitle content={`Status: `} />
                    <SelectInput
                        name='Status'
                        options={['new', 'in process', 'done']}
                        initialValue={status}
                        setChoice={setStatusChoise}
                    />
                </div>
            </div>
        )

    }, [isEdit, priority, status])


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