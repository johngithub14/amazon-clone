// Router
import Router from "./pages/Router";
import { useContext, useEffect } from "react";
import { DataContext } from "./components/Context/Context";
import { auth } from "./Utilities/firebase";
import { Type } from "./Utilities/action.type";
// Style
import "./App.css";

const App = () => {
    const [{ user }, dispatch] = useContext(DataContext);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                dispatch({
                    type: Type.SET_USER,
                    payload: {
                        user: authUser,
                    },
                });
            } else {
                dispatch({
                    type: Type.SET_USER,
                    payload: {
                        user: null,
                    },
                });
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    return <Router />;
};

export default App;
