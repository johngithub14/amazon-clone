import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../Utilities/axios";
import ProductCard from "../../components/Products/ProductCard";
import Loader from "../../components/Loader/Loader";

const ProductDetails = () => {
    const { productId } = useParams();
    const [isLoading, setLoading] = useState(false);

    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/products/${productId}`);

                setProduct([
                    res.data.image,
                    res.data.title,
                    res.data.id,
                    res.data.price,
                    {
                        rate: res.data.rating.rate,
                        count: res.data.rating.count,
                    },
                    res.data.description,
                ]);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    return (
        <Layout>
            {isLoading ? (
                <Loader />
            ) : (
                product && (
                    <ProductCard
                        product={product}
                        flex={true}
                        renderDec={true}
                        renderAdd={true}
                    />
                )
            )}
        </Layout>
    );
};

export default ProductDetails;
