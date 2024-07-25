import { Link } from "react-router-dom";
import categoryInfo from "../../Utilities/categoryInfo.json";
import styles from "./CategoryCard.module.css";

const CategoryCard = () => {
    return (
        <div className={styles.categoryGrid}>
            {categoryInfo.map((category) => (
                <div key={category.id} className={styles.categoryItem}>
                    <Link
                        to={`/category/${category.name}`}
                        className={styles.categoryLink}
                    >
                        <h3 className={styles.categoryHeading}>
                            {category.title}
                        </h3>
                        <div className={styles.categoryImageWrapper}>
                            <img
                                src={category.image}
                                alt={`${category.title} category`}
                                className={styles.categoryImage}
                            />
                        </div>
                        <span className={styles.categoryCallToAction}>
                            Shop Now
                        </span>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default CategoryCard;
