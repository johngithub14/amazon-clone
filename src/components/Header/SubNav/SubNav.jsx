/* eslint-disable react/no-unescaped-entities */

// Style
import styles from "./SubNav.module.css";

// Assets
import menuIcon from "../../../assets/menu_icon.png";

const SubHeader = () => {
    return (
        <div className={styles.subHeader}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <a href="#" className={styles.navLink}>
                        <span className={styles.iconWrapper}>
                            <img
                                src={menuIcon}
                                alt="Menu Icon"
                                className={styles.icon}
                            />
                        </span>
                        <p className={styles.navText}>All</p>
                    </a>
                </li>
                <li className={styles.navItem}>
                    <a href="#" className={styles.navLink}>
                        Today's Deals
                    </a>
                </li>
                <li className={styles.navItem}>
                    <a href="#" className={styles.navLink}>
                        Customer Service
                    </a>
                </li>
                <li className={styles.navItem}>
                    <a href="#" className={styles.navLink}>
                        Registry
                    </a>
                </li>
                <li className={styles.navItem}>
                    <a href="#" className={styles.navLink}>
                        Gift Cards
                    </a>
                </li>
                <li className={styles.navItem}>
                    <a href="#" className={styles.navLink}>
                        Sell
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default SubHeader;
