import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../layouts/Home/Home";
import AddTodoContainer from "../layouts/AddTodo/AddTodoContainer";


const MainRoutes = () => (
    <Routes>
        <Route path="/*" element={<Navigate replace to="/" />} />
        <Route path="/" element={<Home />} />
        <Route path="/add-todo" element={<AddTodoContainer />} />
    </Routes>
);

export default MainRoutes;