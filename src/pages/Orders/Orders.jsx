import styles from "./Orders.module.css";
import Layout from "../../components/Layout/Layout";
import { firestore } from "../../Utilities/firebase";
import { DataContext } from "../../components/Context/Context";
import { useContext, useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ProductCard from "../../components/Products/ProductCard";

const Orders = () => {
    const [{ user }, dispatch] = useContext(DataContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!user?.uid) {
            console.error("User ID is not available.");
            return;
        }

        const ordersCollectionRef = collection(
            firestore,
            "users",
            user.uid,
            "orders"
        );
        const ordersQuery = query(
            ordersCollectionRef,
            orderBy("created", "desc")
        );

        const unsubscribe = onSnapshot(
            ordersQuery,
            (snapshot) => {
                const orderData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setOrders(orderData);
            },
            (error) => {
                console.error("Error fetching orders:", error);
            }
        );

        return () => unsubscribe();
    }, [user?.uid]);

    useEffect(() => {
        console.log("Fetched orders:", orders);
    }, [orders]);

    return (
        <Layout>
            <section className={styles.orUpperContainer}>
                <div className={styles.orContainer}>
                    <div className={styles.orTitle}>
                        <h2>Your Orders</h2>
                    </div>

                    {
                        orders?.length === 0 && (
                            <div className={styles.none}>
                                <p>You haven't ordered any item yet.</p>
                            </div>
                        )
                    }

                    <div className={styles.orUpContainer}>
                        {orders?.map((order) => {
                            return (
                                <>
                                    <hr />
                                    <div
                                        key={order.id}
                                        className={styles.orUContainer}
                                    >
                                        <p className={styles.fl}>
                                            <span>Order ID:</span> {order.id}
                                        </p>

                                        <div
                                            className={styles.orItemsContainer}
                                        >
                                            {order?.cart?.map((eachOrder) => (
                                                <div
                                                    key={eachOrder.id}
                                                    className={styles.orItem}
                                                >
                                                    <ProductCard
                                                        product={[
                                                            eachOrder.image,
                                                            eachOrder.title,
                                                            eachOrder.id,
                                                            eachOrder.price,
                                                            eachOrder.rating,
                                                        ]}
                                                        flex={true}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Orders;
