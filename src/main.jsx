import React from "react";
import ReactDOM from "react-dom/client";

// Root Component
import App from "./App.jsx";

// Context
import { DataProvider } from "./components/Context/Context.jsx";
import { initialState, reducer } from "./Utilities/reducer.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <DataProvider reducer={reducer} initialState={initialState}>
            <App />
        </DataProvider>
    </React.StrictMode>
);
