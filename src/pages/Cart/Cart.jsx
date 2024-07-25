import styles from "./Cart.module.css";
import Layout from "../../components/Layout/Layout";
import { useContext } from "react";
import { DataContext } from "../../components/Context/Context";
import ProductCard from "../../components/Products/ProductCard";
import CurrencyFormat from "../../components/Currency/Currency";
import { Link } from "react-router-dom";
import { Type } from "../../Utilities/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const Cart = () => {
    const [{ cart, user }, dispatch] = useContext(DataContext);

    const total = cart.reduce((amount, item) => {
        return item.price * item.amount + amount;
    }, 0);

    const increment = (item) => {
        dispatch({
            type: Type.ADD_TO_CART,
            item,
        });
    };

    const decrement = (id) => {
        dispatch({
            type: Type.REMOVE_FROM_CART,
            id,
        });
    };

    return (
        <Layout>
            <section className={styles.container}>
                <div className={styles.cartContainer}>
                    <h2>Hello!</h2>
                    <h3 className={styles.h3}>Your Shopping Cart</h3>
                    <hr />

                    {cart?.length === 0 ? (
                        <p className={styles.p}>Oops! No item in your cart.</p>
                    ) : (
                        cart?.map((item, i) => {
                            console.log("Cart Item:", item);
                            return (
                                <section key={i} className={styles.cartProduct}>
                                    <ProductCard
                                        product={[
                                            item.image,
                                            item.title,
                                            item.id,
                                            item.price,
                                            item.rating,
                                            item.description,
                                        ]}
                                        // renderDec={true}
                                        flex={true}
                                        renderAdd={false}
                                    />

                                    <div className={styles.btnContainer}>
                                        <button onClick={() => increment(item)}>
                                            <IoIosArrowUp size={20} />
                                        </button>
                                        <span>{item.amount}</span>
                                        <button
                                            onClick={() => decrement(item.id)}
                                        >
                                            <IoIosArrowDown size={20} />
                                        </button>
                                    </div>
                                </section>
                            );
                        })
                    )}
                </div>

                {cart?.length !== 0 && (
                    <div className={styles.subTotal}>
                        <div>
                            <div className={styles.cartInfoContainer}>
                                <p>Sub Total ({cart?.length} items)</p>
                                <CurrencyFormat amount={total} />
                            </div>

                            <span className={styles.giftContainer}>
                                <input type="checkbox" />
                                <small>This order contains a gift.</small>
                            </span>
                            <br />
                            <Link to="/payments">Continue to Checkout.</Link>
                        </div>
                    </div>
                )}
            </section>
        </Layout>
    );
};

export default Cart;
