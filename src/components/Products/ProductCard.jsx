/* eslint-disable react/prop-types */

import Rating from "@mui/material/Rating";
import CurrencyFormat from "../Currency/Currency";
import styles from "./Products.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../Context/Context";
import { Type } from "../../Utilities/action.type";

const ProductCard = ({ product, flex, renderDec, renderAdd, isDfStyle }) => {
    const [image, title, id, price, rating, description] = product;

    const [state, dispatch] = useContext(DataContext);

    const addToCart = () => {
        dispatch({
            type: Type.ADD_TO_CART,
            item: {
                image,
                title,
                id,
                price,
                rating,
                description,
            },
        });
    };

    return (
        <div
            className={`${styles.cardContainer} ${
                flex ? styles.productFlexed : ""
            }  ${isDfStyle ? styles.dfCardContainer : ""}`}
        >
            <Link to={`/products/${id}`}>
                <img src={image} alt={title} />
            </Link>

            <div>
                <h3>{title}</h3>

                {renderDec && description && (
                    <div style={{ maxWidth: "750px" }}>{description}</div>
                )}

                <div className={styles.rating}>
                    {/* Rating */}
                    <Rating value={rating.rate} precision={0.1} />

                    {/* Count */}
                    <p>{rating.count}</p>
                </div>

                <div>
                    {/* Price */}
                    <CurrencyFormat amount={price} />
                </div>
                {renderAdd && (
                    <button
                        type="button"
                        className={styles.btn}
                        onClick={addToCart}
                    >
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
