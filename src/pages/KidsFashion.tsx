import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { ProductCarousel } from "@/components/ProductCarousel";
import kidsFloralBlue from "@/assets/kids-floral-blue.jpg";
import kidsPinkDress from "@/assets/kids-pink-dress.jpg";
import kidsRedSkirtSet from "@/assets/kids-red-skirt-set.jpg";
import kidsVelvetSet from "@/assets/kids-velvet-set.jpg";

const kidsProducts = [
  { src: kidsFloralBlue, title: "Floral Twin Set" },
  { src: kidsPinkDress, title: "Pink Princess Dress" },
  { src: kidsRedSkirtSet, title: "Traditional Skirt Set" },
  { src: kidsVelvetSet, title: "Velvet & Gold Ensemble" },
];

const KidsFashion = () => {
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
              Kids <span className="italic">Fashion</span>
            </h1>
            <p className="text-editorial-subtitle">
              Adorable designs for your little ones
            </p>
          </motion.div>
        </div>
      </section>

      {/* Kids Carousel */}
      <section className="bg-background-ivory">
        <ProductCarousel
          images={kidsProducts}
          title="Kids Collection"
          speed={30}
        />
      </section>

      {/* Info Section */}
      <section className="section-luxury bg-background">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-editorial-title mb-8">
                Designed with
                <br />
                <span className="italic text-primary">Love & Care</span>
              </h2>
              <div className="space-y-6 text-editorial-body">
                <p>
                  Our kids' collection combines comfort with elegance. Each
                  piece is crafted using soft, skin-friendly fabrics that are
                  gentle on delicate skin.
                </p>
                <p>
                  From festive occasions to everyday wear, our designs ensure
                  your little ones look their adorable best while staying
                  comfortable throughout.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={kidsPinkDress}
                  alt="Kids fashion"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden mt-8">
                <img
                  src={kidsVelvetSet}
                  alt="Kids fashion"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default KidsFashion;
