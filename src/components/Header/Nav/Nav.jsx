// Style
import styles from "./Nav.module.css";

import { Link } from "react-router-dom";

// Assets
import amazonLogo from "../../../assets/amazon_logo.png";
import locationIcon from "../../../assets/location_icon.png";
import searchIcon from "../../../assets/search_icon.png";
import searchIconSM from "../../../assets/search_icon_sm.png";
import countryFlag from "../../../assets/country_flag.png";
import cartIcon from "../../../assets/cart_icon.png";
import accountIcon from "../../../assets/account_icon.png";
import { useContext } from "react";
import { DataContext } from "../../Context/Context";

import { auth } from "../../../Utilities/firebase";

const Nav = () => {
    const [{ cart, user }, dispatch] = useContext(DataContext);

    const totalItem = cart?.reduce((amount, item) => {
        return item.amount + amount;
    }, 0);

    return (
        <nav className={styles.navbar}>
            <div className={styles.navSection}>
                <div className={styles.logoContainer}>
                    <Link to="/" className={styles.logoLink}>
                        <img
                            src={amazonLogo}
                            alt="Amazon Logo"
                            className={styles.logo}
                        />
                    </Link>
                </div>

                <div className={styles.deliveryContainer}>
                    <a href="#" className={styles.deliveryLink}>
                        <div className={styles.iconWrapper}>
                            <img
                                src={locationIcon}
                                alt="Location Icon"
                                className={styles.icon}
                            />
                        </div>
                        <div className={styles.navText}>
                            <span className={styles.smallText}>Deliver to</span>
                            <span className={styles.largeText}>Ethiopia</span>
                        </div>
                    </a>
                </div>

                <div className={styles.mobileAccount}>
                    <a href="#" className={styles.signInLink}>
                        <p>Sign in ›</p>
                    </a>

                    <a href="">
                        <img
                            src={accountIcon}
                            alt="Account Icon"
                            className={styles.accountIcon}
                        />
                    </a>
                </div>
            </div>

            <div className={`${styles.navSection} ${styles.searchSection}`}>
                <div className={styles.searchContainer}>
                    <div className={styles.search}>
                        <select
                            className={styles.searchDropdown}
                            aria-label="Search category"
                        >
                            <option value="all">All</option>
                        </select>
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="Search Amazon"
                        />
                        <button type="submit" className={styles.searchButton}>
                            <img
                                src={searchIcon}
                                alt="Search"
                                className={styles.searchIcon}
                            />
                            <img
                                src={searchIconSM}
                                alt="Search"
                                className={styles.searchIconSM}
                            />
                        </button>
                    </div>
                </div>
            </div>

            <div className={`${styles.navSection} ${styles.rightSection}`}>
                <div className={styles.languageContainer}>
                    <img
                        src={countryFlag}
                        alt="Country Flag"
                        className={styles.flagIcon}
                    />
                    <select
                        className={styles.languageSelect}
                        aria-label="Language selection"
                    >
                        <option value="EN">EN</option>
                    </select>
                </div>
                <div className={styles.accountsWrapper}>
                    <Link to={!user && "/auth"} className={styles.accountLink}>
                        <div className={styles.navText}>
                            <span className={styles.smallText}>
                                {user ? (
                                    <>
                                        <p>
                                            Hello, {user?.email?.split("@")[0]}
                                        </p>
                                        <span
                                            className={styles.largeText}
                                            style={{ color: "white" }}
                                            onClick={() => auth.signOut()}
                                        >
                                            Sign Out
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <p>Hello, sign in</p>
                                        <span
                                            className={styles.largeText}
                                            style={{ color: "white" }}
                                        >
                                            Accounts & Lists
                                        </span>
                                    </>
                                )}
                            </span>
                        </div>
                    </Link>
                </div>
                <div className={styles.ordersWrapper}>
                    <Link to="/orders" className={styles.ordersLink}>
                        <div className={styles.navText}>
                            <span className={styles.smallText}>Returns</span>
                            <span className={styles.largeText}>& Orders</span>
                        </div>
                    </Link>
                </div>
                <div className={styles.cartContainer}>
                    <Link to="/cart" className={styles.cartLink}>
                        <img
                            src={cartIcon}
                            alt="Cart"
                            className={styles.cartIcon}
                        />
                        <span className={styles.cartCount}>{totalItem}</span>
                        <span className={styles.largeText}>Cart</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
