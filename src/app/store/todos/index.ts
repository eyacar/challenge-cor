import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialstate";
import * as reducers from "./reducers";
import { getTodos } from "./asyncActions";

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state, _ ) => {
        state.loading = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export const { deleteTodo, editTodo, addTodo } = todosSlice.actions;

export default todosSlice.reducer;
