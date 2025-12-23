import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { ProductCarousel } from "@/components/ProductCarousel";
import frockPrintedBeige from "@/assets/frock-printed-beige.jpg";
import frockPinkLace from "@/assets/frock-pink-lace.jpg";
import frockBlueGown from "@/assets/frock-blue-gown.jpg";

import blouseYellowWork from "@/assets/blouse-yellow-work.jpg";
import blousePinkEmbroidery from "@/assets/blouse-pink-embroidery.jpg";
import blouseCreamBeadwork from "@/assets/blouse-cream-beadwork.jpg";
import blouseLilacWork from "@/assets/blouse-lilac-work.jpg";
import blouseGreenCutwork from "@/assets/blouse-green-cutwork.jpg";

const categoryData: Record<
  string,
  {
    title: string;
    subtitle: string;
    description: string;
    products: { src: string; title: string }[];
  }
> = {
  frocks: {
    title: "Elegant Frocks",
    subtitle: "Timeless designs for every occasion",
    description:
      "Our frock collection features exquisite designs ranging from traditional to contemporary styles. Each piece is crafted with attention to detail, ensuring comfort and elegance.",
    products: [
      { src: frockPrintedBeige, title: "Printed Beige Frock" },
      { src: frockPinkLace, title: "Pink Lace Frock" },
      { src: frockBlueGown, title: "Blue Party Gown" },
    ],
  },
  blouses: {
    title: "Artisan Blouses",
    subtitle: "Handcrafted with passion",
    description:
      "Our blouse collection showcases the finest Indian craftsmanship. Featuring intricate embroidery, zardozi work, and traditional motifs, each piece is a work of art.",
    products: [
      { src: blouseYellowWork, title: "Yellow Cutwork Blouse" },
      { src: blousePinkEmbroidery, title: "Pink Zardosi Blouse" },
      { src: blouseCreamBeadwork, title: "Cream Beadwork Blouse" },
      { src: blouseLilacWork, title: "Lilac Designer Blouse" },
      { src: blouseGreenCutwork, title: "Green Pattern Blouse" },
    ],
  },
};

const FabricCategory = () => {
  const { category } = useParams<{ category: string }>();
  const data = categoryData[category || "blouses"] || categoryData.blouses;

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
              {data.title.split(" ")[0]}{" "}
              <span className="italic">{data.title.split(" ")[1]}</span>
            </h1>
            <p className="text-editorial-subtitle">{data.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 bg-background-ivory">
        <div className="container-luxury">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-editorial-body max-w-2xl"
          >
            {data.description}
          </motion.p>
        </div>
      </section>

      {/* Products Carousel */}
      <section className="bg-background">
        <ProductCarousel
          images={data.products}
          title={`${data.title} Collection`}
          speed={35}
        />
      </section>

      {/* CTA */}
      <section className="py-24 bg-background-champagne">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-3xl md:text-4xl mb-6">
              Want a Custom Design?
            </h2>
            <p className="font-inter text-foreground-muted mb-8 max-w-xl mx-auto">
              Our artisans can create bespoke pieces tailored to your vision.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background font-inter text-sm uppercase tracking-[0.2em] transition-all duration-500 hover:bg-foreground/90"
            >
              Enquire Now
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default FabricCategory;
