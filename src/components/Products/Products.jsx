import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./Products.module.css";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    "https://fakestoreapi.com/products"
                );

                setProducts(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className={styles.productsContainer}>
            {products.map((singleProduct) => (
                <ProductCard
                    product={[
                        singleProduct.image,
                        singleProduct.title,
                        singleProduct.id,
                        singleProduct.price,
                        singleProduct.rating,
                    ]}
                    key={singleProduct.id}
                    renderAdd={true}
                    isDfStyle={false}
                />
            ))}
        </section>
    );
};

export default Products;
