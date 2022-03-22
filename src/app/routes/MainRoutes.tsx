import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../layouts/Home/Home";
import AddTodo from "../layouts/AddTodo/AddTodo";


const MainRoutes = () => (
    <Routes>
        <Route path="/*" element={<Navigate replace to="/" />} />
        <Route path="/" element={<Home />} />
        <Route path="/add-todo" element={<AddTodo />} />
    </Routes>
);

export default MainRoutes;