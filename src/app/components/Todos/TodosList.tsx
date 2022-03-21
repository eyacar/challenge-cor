import React, { useEffect, useMemo, useState } from "react";
import TodoCard from "./TodoCard.tsx/TodoCard"
import { useAppSelector } from "../../store/hooks";
import SelectInput from "../SelectInput/SelectInput";
import Typography from "@mui/material/Typography";
import { ITodo } from "../../store/interface";

import Style from './todoList.module.scss'

const TodoList = () => {
    const todosList: ITodo[] | undefined | null = useAppSelector(state => state.todos.todos);

    const [todos, setTodos] = useState(todosList);

    const [priorityChoice, setPriorityChoice] = useState<string | null>(null);
    const [statusChoice, setStatusChoice] = useState<string | null>(null);

    const todosView = useMemo(() => {
        if (!todosList) return "Not todos at this moment"
        if (todos) return todos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
        ));
    }, [todos, todosList])

    useEffect(() => {
        if (priorityChoice && !statusChoice) {
            const filter = todosList?.filter(({ priority }) => priority === priorityChoice)
            setTodos(filter)
        }

        if (!priorityChoice && statusChoice) {
            const filter = todosList?.filter(({ status }) => status === statusChoice)
            setTodos(filter)
        }

        if (priorityChoice && statusChoice) {
            // const filter = todosList?.filter(({ status, priority }) => status === statusChoice || priority === priorityChoice)
            setTodos(prevValues => prevValues?.filter(({ status, priority }) => status === statusChoice && priority === priorityChoice))
        }

        if (!priorityChoice && !statusChoice) {
            setTodos(todosList)
        }

    }, [priorityChoice, statusChoice, todosList])

    return (
        <div className={Style.container}>
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
                        setChoice={setPriorityChoice}
                    />

                    <SelectInput
                        name='Status'
                        options={['new', 'in process', 'done']}
                        initialValue={null}
                        setChoice={setStatusChoice}
                    />

            </div>
            <div className={Style.container__todosGrid}>
                {todosView}
            </div>
        </div>
    )
}

export default TodoList;