// Components
import Nav from "./Nav/Nav";
import SubNav from "./SubNav/SubNav";

import styles from "./Header.module.css";

const Header = () => {
    return (
        <section className={styles.fixed}>
            <Nav />
            <SubNav />
        </section>
    );
};

export default Header;
