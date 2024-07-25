import { useContext, useState } from "react";
import styles from "./Payment.module.css";
import logo from "../../assets/amazon_logo_si.png";
import { Link } from "react-router-dom";
import { DataContext } from "../../components/Context/Context";
import ProductCard from "../../components/Products/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/Currency/Currency";
import axiosInstance from "../../API/axios";
import { Bars } from "react-loader-spinner";
import { firestore } from "../../Utilities/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utilities/action.type";

const Payment = () => {
    const [{ cart, user }, dispatch] = useContext(DataContext);
    const [error, setError] = useState(null);

    // Stripe
    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate();

    const handleChange = (e) => {
        e?.error?.message ? setError(e.error.message) : setError(null);
    };

    const totalItem = cart?.reduce((amount, item) => {
        return item.amount + amount;
    }, 0);

    const total = cart.reduce((amount, item) => {
        return item.price * item.amount + amount;
    }, 0);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const customTotal = (total * 10000) / 100;

        setIsLoading(true);

        try {
            const res = await axiosInstance.post(
                `/payment/create?total=${customTotal}`
            );

            const clientSecret = res.data?.client_secret;

            const { paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    },
                }
            );

            try {
                await setDoc(
                    doc(
                        firestore,
                        "users",
                        user.uid,
                        "orders",
                        paymentIntent.id
                    ),
                    {
                        cart: JSON.parse(JSON.stringify(cart)), // Ensure cart is serializable
                        amount: paymentIntent.amount,
                        created: paymentIntent.created,
                    }
                );
                console.log("Order successfully written to Firestore");

                dispatch({
                    type: Type.REMOVE_CART,
                });

                navigate("/orders");
            } catch (firestoreError) {
                console.error(
                    "Error writing order to Firestore:",
                    firestoreError
                );
                setError(
                    "Failed to save order details. Please contact support."
                );
                // Optionally, you might want to handle this error (e.g., retry logic or informing the user)
            }

            setIsLoading(false);
        } catch (error) {
            console.log(error.message);
            setIsLoading(false);
        }
    };

    return (
        <section>
            <div className={styles.pyHeaderContainer}>
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <h1>
                    Checkout (<span>{totalItem} items</span>)
                </h1>
            </div>

            <div className={styles.pyMainContentContainer}>
                <div className={styles.deliveryContainer}>
                    <h3>
                        1 <span>Your delivery address</span>
                    </h3>
                    <p>
                        <span>{user.email}</span> 901 BEVERLY RD, CORONA, CA,
                        01000, United States
                    </p>
                </div>

                <hr className={styles.firstHr} />

                <div>
                    <h3>
                        2 <span>Review items and shipping</span>
                    </h3>

                    <div className={styles.pyProducts}>
                        {cart?.map((item) => (
                            <div key={item.id} className={styles.productFlexed}>
                                <ProductCard
                                    product={[
                                        item.image,
                                        item.title,
                                        item.id,
                                        item.price,
                                        item.rating,
                                    ]}
                                    flex={true}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <hr className={styles.firstHr} />

                <div>
                    <h3>
                        3 <span>Payment methods</span>
                    </h3>

                    {error && <div className={styles.pyError}>{error}</div>}

                    <div className={styles.pyMethods}>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className={styles.orderTotal}>
                                <p>
                                    Order total:{" "}
                                    <span>
                                        <CurrencyFormat amount={total} />
                                    </span>
                                </p>
                            </div>
                            <button type="submit">
                                {isLoading ? (
                                    <Bars
                                        height="20"
                                        width="40"
                                        color="#000000"
                                        ariaLabel="bars-loading"
                                        wrapperClass={styles.loaderIcon}
                                        visible={true}
                                    />
                                ) : (
                                    <>Pay Now</>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Payment;
