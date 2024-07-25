import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "../components/Protection/ProtectedRoute";
import Home from "./Home/Home";
import Auth from "./Auth/Auth";
import Payment from "./Payment/Payment";
import Orders from "./Orders/Orders";
import Cart from "./Cart/Cart";
import Results from "./Results/Results";
import ProductDetails from "./ProductDetails/ProductDetails";
import NotFound from "./404/NotFound";

const stripePromise = loadStripe(
    "pk_test_51PfVEp2NWvOE645HTyk1nAmxhqY1joU6ilWDlpcPF0qBuqLdR7cZGHGHve09xYXAWgpmjk74mmHNxe3yancPh2OL00OWDClBOH"
);

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route
                    path="/payments"
                    element={
                        <ProtectedRoute
                            message="You must be logged in to access payments."
                            redirect="/payments"
                        >
                            <Elements stripe={stripePromise}>
                                <Payment />
                            </Elements>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute
                            message="You must be logged in to access orders."
                            redirect="/orders"
                        >
                            <Orders />
                        </ProtectedRoute>
                    }
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="/category/:categoryName" element={<Results />} />
                <Route
                    path="/products/:productId"
                    element={<ProductDetails />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
