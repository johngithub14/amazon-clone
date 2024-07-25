import { Link } from "react-router-dom";

import styles from "./NotFound.module.css";

const NotFound = () => {
    return (
        <div className={styles.notFoundContainer}>
            <h1>404</h1>

            <p>The page you are looking for can not be found.</p>

            <Link to="/">
                <button type="button">Back to Home</button>
            </Link>
        </div>
    );
};

export default NotFound;
