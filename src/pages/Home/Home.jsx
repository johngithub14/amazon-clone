import Layout from "../../components/Layout/Layout";

import CarouselSection from "../../components/CarouselSection/Carousel";
import CategorySection from "../../components/CategorySection/CategoryCard";
import Products from "../../components/Products/Products";

const Home = () => {
    return (
        <>
            <Layout>
                <CarouselSection />
                <CategorySection />
                <Products />
            </Layout>
        </>
    );
};

export default Home;
