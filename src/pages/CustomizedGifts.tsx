import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { ProductCarousel } from "@/components/ProductCarousel";
import giftBanglesRed from "@/assets/gift-bangles-red.jpg";
import giftBanglesGold from "@/assets/gift-bangles-gold.jpg";
import giftBanglesPink from "@/assets/gift-bangles-pink.jpg";
import giftBanglesOrange from "@/assets/gift-bangles-orange.jpg";

const giftProducts = [
  { src: giftBanglesRed, title: "Royal Coin Aari Bangles" },
  { src: giftBanglesGold, title: "Golden Mirror Work Bangles" },
  { src: giftBanglesPink, title: "Floral Pink Silk Bangles" },
  { src: giftBanglesOrange, title: "Bridal Silk Thread Set" },
];

const CustomizedGifts = () => {
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
              Customized <span className="italic">Gifts</span>
            </h1>
            <p className="text-editorial-subtitle">
              Thoughtful, handcrafted presents for loved ones
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gifts Carousel */}
      <section className="bg-background-ivory">
        <ProductCarousel
          images={giftProducts}
          title="Gift Collection"
          speed={25}
        />
      </section>

      {/* About Gifts */}
      <section className="section-luxury bg-background">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="gold-line mx-auto mb-8" />
              <h2 className="text-editorial-title mb-8">
                The Gift of
                <br />
                <span className="italic text-primary">Craftsmanship</span>
              </h2>
              <p className="text-editorial-body mb-8">
                Give the gift of elegance with our customized fashion pieces.
                Whether it's a wedding, birthday, or special celebration, our
                personalized gifts carry the warmth of handcrafted artistry.
              </p>
              <p className="text-editorial-body">
                Each gift can be customized with names, dates, or special
                messages, making every piece truly unique and memorable.
              </p>
            </motion.div>
          </div>

          {/* Gift Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              {
                title: "Personalization",
                description: "Add names, dates, or custom messages to any piece",
              },
              {
                title: "Luxury Packaging",
                description: "Beautifully presented in premium gift boxes",
              },
              {
                title: "Gift Cards",
                description: "Let them choose their perfect piece",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center p-8 bg-background-ivory rounded-lg"
              >
                <h3 className="font-playfair text-xl mb-4 text-foreground">
                  {feature.title}
                </h3>
                <p className="font-inter text-foreground-muted">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CustomizedGifts;
