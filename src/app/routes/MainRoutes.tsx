import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../layouts/Home/Home";


const MainRoutes = () => (
    <Routes>
        <Route path="/*" element={<Navigate replace to="/" />} />
        <Route path="/" element={<Home />} />
    </Routes>
);

export default MainRoutes;