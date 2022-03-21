import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITodo } from "../interface";
import { TodoHelper } from "../../helper/TodoHelper";

export const getTodos = createAsyncThunk<ITodo[]>("todos/getTodos", async () => {
  const response = await fetch("/api/todos");

  const todos = await response.json();

  let modifiedTodos;

  const helper = new TodoHelper();
  helper.checkIsFakeStore();
  const isFakeStore = helper.isTodosFakeStore;

  const todosFromStore = helper.getTheModifiedStore()
  const storeObject = todosFromStore && JSON.parse(todosFromStore)

  /*
  For persisting the data, and because i don't have a DB i create this key on the local store to simulate a DB.
  */
  if(!isFakeStore || storeObject.length <= 0){
    helper.createFakeLocalStore(todos);
    modifiedTodos = todos;
  }
  else{
      modifiedTodos =  storeObject
  }

  return modifiedTodos;
});
