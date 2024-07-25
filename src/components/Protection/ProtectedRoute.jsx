/* eslint-disable react/prop-types */

// import { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { DataContext } from "../Context/Context";

// const ProtectedRoute = ({ children, message, redirect }) => {
//     const navigate = useNavigate();
//     const [{ user }, dispatch] = useContext(DataContext);

//     useEffect(() => {
//         if (!user) {
//             navigate("/auth", { state: { message, redirect } });
//         }
//     }, [user]);

//     return children;
// };

// export default ProtectedRoute;

import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Context/Context";

const ProtectedRoute = ({ children, message, redirect }) => {
    const [{ user }] = useContext(DataContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/auth", {
                state: {
                    message,
                    redirect,
                },
            });
        }
    }, [user, navigate, message, redirect]);

    return user ? children : null;
};

export default ProtectedRoute;
