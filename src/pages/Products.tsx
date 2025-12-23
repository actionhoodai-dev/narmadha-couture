import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { ProductCarousel } from "@/components/ProductCarousel";
import blouseYellowWork from "@/assets/blouse-yellow-work.jpg";
import blousePinkEmbroidery from "@/assets/blouse-pink-embroidery.jpg";
import blouseCreamBeadwork from "@/assets/blouse-cream-beadwork.jpg";
import blouseLilacWork from "@/assets/blouse-lilac-work.jpg";
import blouseGreenCutwork from "@/assets/blouse-green-cutwork.jpg";

import frockPrintedBeige from "@/assets/frock-printed-beige.jpg";
import frockPinkLace from "@/assets/frock-pink-lace.jpg";
import frockBlueGown from "@/assets/frock-blue-gown.jpg";

// Product data organized by category
const categories = {
  blouses: [
    { src: blouseYellowWork, title: "Yellow Cutwork Blouse" },
    { src: blousePinkEmbroidery, title: "Pink Zardosi Blouse" },
    { src: blouseCreamBeadwork, title: "Cream Beadwork Blouse" },
    { src: blouseLilacWork, title: "Lilac Designer Blouse" },
    { src: blouseGreenCutwork, title: "Green Pattern Blouse" },
  ],
  frocks: [
    { src: frockPrintedBeige, title: "Printed Beige Frock" },
    { src: frockPinkLace, title: "Pink Lace Frock" },
    { src: frockBlueGown, title: "Blue Party Gown" },
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


      {/* Frocks Carousel */}
      <section className="bg-background-champagne">
        <ProductCarousel
          images={categories.frocks}
          title="Beautiful Frocks"
          speed={38}
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
