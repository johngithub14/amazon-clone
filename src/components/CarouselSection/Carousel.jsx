import { useState, useEffect } from "react";

// Styles
import styles from "./Carousel.module.css";

// Assets
import carouselImg1 from "../../assets/carousel_img_1.jpeg";
import carouselImg2 from "../../assets/carousel_img_2.jpeg";
import carouselImg3 from "../../assets/carousel_img_3.jpeg";
import carouselImg4 from "../../assets/carousel_img_4.jpeg";
import carouselImg5 from "../../assets/carousel_img_5.jpeg";
import prevIcon from "../../assets/prev_icon.png";
import nextIcon from "../../assets/next_icon.png";

const CarouselSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        carouselImg1,
        carouselImg2,
        carouselImg3,
        carouselImg4,
        carouselImg5,
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [images.length]);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.carousel}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`${styles.carouselItem} ${
                            currentIndex === index ? styles.active : ""
                        }`}
                    >
                        <img src={image} alt={`Image ${index + 1}`} />
                    </div>
                ))}
            </div>

            <button
                className={`${styles.carouselButton} ${styles.prevButton}`}
                onClick={goToPrevious}
            >
                <img
                    src={prevIcon}
                    alt="Prev Icon"
                    className={styles.prevIcon}
                />
            </button>
            
            <button
                className={`${styles.carouselButton} ${styles.nextButton}`}
                onClick={goToNext}
            >
                <img
                    src={nextIcon}
                    alt="Next Icon"
                    className={styles.nextIcon}
                />
            </button>
        </div>
    );
};

export default CarouselSection;
