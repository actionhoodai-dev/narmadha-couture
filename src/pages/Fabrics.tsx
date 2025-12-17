import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { ProductCarousel } from "@/components/ProductCarousel";
import blousePurple from "@/assets/blouse-purple.jpg";
import blouseGreen from "@/assets/blouse-green.jpg";
import blouseGreenEmbroidered from "@/assets/blouse-green-embroidered.jpg";
import blouseRed from "@/assets/blouse-red.jpg";
import blouseBeige from "@/assets/blouse-beige.jpg";

const fabricProducts = [
  { src: blousePurple, title: "Purple Silk" },
  { src: blouseGreen, title: "Green Satin" },
  { src: blouseGreenEmbroidered, title: "Embroidered Silk" },
  { src: blouseRed, title: "Red Brocade" },
  { src: blouseBeige, title: "Beige Cotton" },
];

const Fabrics = () => {
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
              Premium <span className="italic">Fabrics</span>
            </h1>
            <p className="text-editorial-subtitle">
              The finest materials for exceptional creations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fabric Showcase */}
      <section className="bg-background-ivory">
        <ProductCarousel
          images={fabricProducts}
          title="Fabric Collection"
          speed={35}
        />
      </section>

      {/* Categories */}
      <section className="section-luxury bg-background">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="gold-line mx-auto mb-8" />
            <h2 className="text-editorial-title">
              Browse by <span className="italic">Category</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Frocks", href: "/fabrics/frocks", image: blouseRed },
              { name: "Gowns", href: "/fabrics/gowns", image: blouseGreen },
              { name: "Tops", href: "/fabrics/tops", image: blouseBeige },
              {
                name: "Blouses",
                href: "/fabrics/blouses",
                image: blousePurple,
              },
            ].map((category, index) => (
              <motion.a
                key={category.name}
                href={category.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group block"
              >
                <div className="card-luxury aspect-[3/4] overflow-hidden rounded-lg mb-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="font-playfair text-2xl text-background">
                      View Collection
                    </span>
                  </div>
                </div>
                <h3 className="font-playfair text-xl text-center text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Fabrics;
