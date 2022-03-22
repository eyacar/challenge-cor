import React, { useEffect, useMemo, useState, useCallback } from "react";
import TodoCard from "./TodoCard.tsx/TodoCard"
import { useAppSelector } from "../../store/hooks";
import { SelectInput } from "../Inputs/index";
import Typography from "@mui/material/Typography";
import { ITodo } from "../../store/interface";

import Style from './todoList.module.scss'

interface FilterValues {
    priority: string,
    status: string
}

const TodoList = () => {
    const todosList: ITodo[] | undefined | null = useAppSelector(state => state.todos.todos);

    const [todos, setTodos] = useState(todosList);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [filterValues, setFilterValues] = useState<FilterValues>({ priority: '', status: '' });

    const todosView = useMemo(() => {
        if (!todosList) return "Not todos at this moment"
        if (todos) return todos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} setIsEditing={setIsEditing} />
        ));
    }, [todos, todosList])

    useEffect(() => {
        const { priority: priorityChoice, status: statusChoice } = filterValues;
        if (priorityChoice && !statusChoice) {
            const filter = todosList?.filter(({ priority }) => priority === priorityChoice)
            setTodos(filter)
        }

        if (!priorityChoice && statusChoice) {
            const filter = todosList?.filter(({ status }) => status === statusChoice)
            setTodos(filter)
        }

        if (priorityChoice && statusChoice) {
            setTodos(prevValues => prevValues?.filter(({ status, priority }) => status === statusChoice && priority === priorityChoice))
        }

        if (!priorityChoice && !statusChoice) {
            setTodos(todosList)
        }

    }, [filterValues, todosList])


    const onHandleChange = useCallback((fieldName: string, value: string) => {
        setFilterValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
    }, []);

    const filterView = useMemo(() => {
        if (!isEditing) return (
            <>
                <Typography
                    variant="h3"
                    noWrap
                    textAlign="center"
                    component="h4"
                    gutterBottom>
                    Filter by:
                </Typography>
                <div className={Style.container__select}>
                    <SelectInput
                        name='Priority'
                        options={['low', 'medium', 'high']}
                        initialValue={null}
                        onHandleChange={onHandleChange}
                        inputKey='priority'
                        inputValue={filterValues.priority}
                    />

                    <SelectInput
                        name='Status'
                        options={['new', 'in process', 'done']}
                        initialValue={null}
                        onHandleChange={onHandleChange}
                        inputKey='status'
                        inputValue={filterValues.status}
                    />
                </div>
            </>
        )
    }, [filterValues.priority, filterValues.status, isEditing, onHandleChange])

    return (
        <div className={Style.container}>
            {filterView}
            <div className={Style.container__todosGrid}>
                {todosView}
            </div>
        </div>
    )
}

export default TodoList;