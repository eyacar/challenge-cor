import { PayloadAction } from "@reduxjs/toolkit"
import { ITodos, ITodo } from "../interface"
import { TodoHelper } from "../../helper/TodoHelper"

export const deleteTodo = (state: ITodos, action: PayloadAction<string>) => {
  TodoHelper.deleteItemFromFakeStore(action.payload);
  state.todos = state.todos?.filter(({id}) => action.payload !== id)
};

interface EditPayload{
  id: string,
  priority: string,
  status: string,
}

export const editTodo = (state: ITodos, action: PayloadAction<EditPayload>) => {
  const { id, priority, status } = action.payload
  TodoHelper.editFromFakeStore(id, priority, status);
  state.todos = state.todos?.map( element => element.id === id ? {...element, priority, status} : element )
}

export const addTodo = (state: ITodos, action: PayloadAction<ITodo>) => {
  TodoHelper.addTodoToFakeStore(action.payload);
  state.todos = state.todos? [...state.todos, action.payload]: [action.payload]
}