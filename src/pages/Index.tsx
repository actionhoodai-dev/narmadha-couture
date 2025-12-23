import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProductCarousel } from "@/components/ProductCarousel";
import heroImage from "@/assets/hero-fashion.jpg";

import blouseYellowWork from "@/assets/blouse-yellow-work.jpg";
import blousePinkEmbroidery from "@/assets/blouse-pink-embroidery.jpg";
import blouseCreamBeadwork from "@/assets/blouse-cream-beadwork.jpg";
import blouseLilacWork from "@/assets/blouse-lilac-work.jpg";
import blouseGreenCutwork from "@/assets/blouse-green-cutwork.jpg";
import kidsPinkDress from "@/assets/kids-pink-dress.jpg";

import frockPrintedBeige from "@/assets/frock-printed-beige.jpg";
import frockBlueGown from "@/assets/frock-blue-gown.jpg";

const featuredProducts = [
  { src: blouseYellowWork, title: "Yellow Cutwork Masterpiece" },
  { src: blousePinkEmbroidery, title: "Pink Royal Zardosi" },
  { src: blouseCreamBeadwork, title: "Cream Beadwork Classic" },
  { src: blouseLilacWork, title: "Lilac Dreams" },
  { src: blouseGreenCutwork, title: "Green Pattern Design" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Narmatha Fashion Home - Luxury Fashion"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative container-luxury py-32">
          <div className="max-w-2xl">
            <motion.h1
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.4 }}
className="text-editorial-hero mb-6 mt-5 md:mt-0">
  Narmatha
  <br />
  <span className="italic text-primary">Fashion Home</span>
</motion.h1>

<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="mb-8"
>
  <div className="gold-line mb-8" />
  <p className="font-inter text-sm uppercase tracking-[0.3em] text-foreground-muted">
    Elegance Refined
  </p>
</motion.div>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-editorial-body max-w-md mb-12"
            >
              Where tradition meets contemporary artistry. Each piece is a
              testament to exquisite craftsmanship and timeless beauty.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/products" className="btn-luxury-primary">
                Explore Collection
              </Link>
              <Link to="/about" className="btn-luxury-outline">
                Our Story
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-inter text-xs uppercase tracking-widest text-foreground-muted">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-primary"
          />
        </motion.div>
      </section>

      {/* About Teaser */}
      <section className="section-luxury bg-background-ivory">
        <div className="container-luxury">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="gold-line mb-8" />
              <h2 className="text-editorial-title mb-6">
                The Art of
                <br />
                <span className="italic">Indian Craftsmanship</span>
              </h2>
              <p className="text-editorial-body mb-8">
                At Narmatha Fashion Home, we celebrate the rich heritage of
                Indian textiles. Each creation is meticulously handcrafted,
                blending traditional techniques with contemporary aesthetics.
              </p>
              <Link to="/about" className="btn-luxury-ghost group">
                <span>Discover Our Story</span>
                <motion.span
                  className="inline-block ml-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-lg overflow-hidden">
                <img
                  src={frockPrintedBeige}
                  alt="Handcrafted fashion"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full -z-10" />
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/20 rounded-full -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-8 bg-background">
        <ProductCarousel
          images={featuredProducts}
          title="Featured Collection"
          speed={40}
        />
      </section>

      {/* Categories Grid */}
      <section className="section-luxury bg-background-champagne">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="gold-line mx-auto mb-8" />
            <h2 className="text-editorial-title">
              Explore Our <span className="italic">Categories</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Blouses", image: blouseLilacWork, href: "/fabrics/blouses" },
              { name: "Frocks", image: frockBlueGown, href: "/fabrics/frocks" },
              {
                name: "Kids Fashion",
                image: kidsPinkDress,
                href: "/kids-fashion",
              },
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={category.href} className="group block">
                  <div className="card-luxury aspect-[3/4] overflow-hidden rounded-lg mb-4">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <h3 className="font-playfair text-xl text-center text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        <div className="container-luxury relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-playfair text-4xl md:text-5xl mb-6">
              Begin Your Style Journey
            </h2>
            <p className="font-inter text-background/70 mb-10">
              Connect with us to create your perfect ensemble. Custom designs
              tailored to your vision.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground font-inter text-sm uppercase tracking-[0.2em] transition-all duration-500 hover:bg-gold-light"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
