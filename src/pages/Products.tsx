import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { ProductCarousel } from "@/components/ProductCarousel";
import blousePurple from "@/assets/blouse-purple.jpg";
import blouseGreen from "@/assets/blouse-green.jpg";
import blouseGreenEmbroidered from "@/assets/blouse-green-embroidered.jpg";
import blouseRed from "@/assets/blouse-red.jpg";
import blouseBeige from "@/assets/blouse-beige.jpg";

// Product data organized by category
const categories = {
  blouses: [
    { src: blousePurple, title: "Royal Purple Blouse" },
    { src: blouseGreen, title: "Emerald Silk Blouse" },
    { src: blouseRed, title: "Crimson Bridal Blouse" },
    { src: blouseBeige, title: "Golden Beige Blouse" },
    { src: blouseGreenEmbroidered, title: "Traditional Green" },
  ],
  gowns: [
    { src: blouseRed, title: "Crimson Evening Gown" },
    { src: blousePurple, title: "Lavender Dream" },
    { src: blouseBeige, title: "Champagne Elegance" },
    { src: blouseGreen, title: "Forest Green Gown" },
  ],
  frocks: [
    { src: blouseBeige, title: "Summer Frock" },
    { src: blousePurple, title: "Festive Frock" },
    { src: blouseGreen, title: "Party Frock" },
    { src: blouseRed, title: "Traditional Frock" },
  ],
  tops: [
    { src: blouseGreen, title: "Designer Top" },
    { src: blouseBeige, title: "Casual Elegance" },
    { src: blousePurple, title: "Evening Top" },
    { src: blouseRed, title: "Festive Top" },
  ],
};

const Products = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="gold-line mb-8" />
            <h1 className="text-editorial-hero mb-6">
              Our <span className="italic">Collection</span>
            </h1>
            <p className="text-editorial-subtitle">
              Discover the artistry in every thread
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blouses Carousel */}
      <section className="bg-background-ivory">
        <ProductCarousel
          images={categories.blouses}
          title="Exquisite Blouses"
          speed={35}
        />
      </section>

      {/* Gowns Carousel */}
      <section className="bg-background">
        <ProductCarousel
          images={categories.gowns}
          title="Elegant Gowns"
          speed={40}
        />
      </section>

      {/* Frocks Carousel */}
      <section className="bg-background-champagne">
        <ProductCarousel
          images={categories.frocks}
          title="Beautiful Frocks"
          speed={38}
        />
      </section>

      {/* Tops Carousel */}
      <section className="bg-background">
        <ProductCarousel
          images={categories.tops}
          title="Designer Tops"
          speed={42}
        />
      </section>

      {/* Custom Order CTA */}
      <section className="py-24 bg-foreground text-background">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl md:text-4xl mb-6">
              Looking for Something Special?
            </h2>
            <p className="font-inter text-background/70 mb-8 max-w-xl mx-auto">
              We create custom designs tailored to your unique vision. Let us
              craft your dream ensemble.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground font-inter text-sm uppercase tracking-[0.2em] transition-all duration-500 hover:bg-gold-light"
            >
              Request Custom Design
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
