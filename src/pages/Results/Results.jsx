import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../Utilities/axios";
import Layout from "../../components/Layout/Layout";
import styles from "./Results.module.css";
import ProductCard from "../../components/Products/ProductCard";

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const Results = () => {
    const [results, setResults] = useState([]);
    const { categoryName } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `/products/category/${categoryName}`
                );
                setResults(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, [categoryName]);

    return (
        <Layout>
            <section className={styles.resultsSection}>
                <h1>Results</h1>
                <p>
                    More from <span>{capitalizeFirstLetter(categoryName)}</span>
                    .
                </p>

                <div className={styles.productsContainer}>
                    {results.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={[
                                product.image,
                                product.title,
                                product.id,
                                product.price,
                                product.rating,
                            ]}
                            renderAdd={true}
                        />
                    ))}
                </div>
            </section>
        </Layout>
    );
};

export default Results;
