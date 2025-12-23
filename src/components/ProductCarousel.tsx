import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ProductCarouselProps {
  images: { src: string; title?: string }[];
  title: string;
  speed?: number;
}

const shuffleImages = <T,>(array: T[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const ProductCarousel = ({
  images,
  title,
  speed = 120,
}: ProductCarouselProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [shuffledImages, setShuffledImages] = useState(images);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShuffledImages(shuffleImages(images));
  }, [images]);

  const duplicatedImages = [...shuffledImages, ...shuffledImages];

  return (
    <div className="py-12 md:py-20">
      {/* Section Title */}
      <div className="container-luxury mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6"
        >
          <div className="gold-line" />
          <h2 className="font-playfair text-3xl md:text-4xl text-foreground">
            {title}
          </h2>
        </motion.div>
      </div>

      {/* Carousel */}
      <div
        ref={containerRef}
        className="carousel-luxury relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="carousel-track flex"
          animate={{
            x: isHovered ? undefined : "-50%",
          }}
          transition={{
            x: {
              duration: speed,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            },
          }}
          style={{ x: isHovered ? undefined : "0%" }}
        >
          {duplicatedImages.map((image, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-72 md:w-80 lg:w-96 px-3"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
            >
              <div className="card-luxury group aspect-[3/4] overflow-hidden rounded-lg shadow-luxury">
                <img
                  src={image.src}
                  alt={image.title || `Product ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="img-overlay" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
