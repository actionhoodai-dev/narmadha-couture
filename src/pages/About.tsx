import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import blouseRed from "@/assets/blouse-red.jpg";
import blouseGreen from "@/assets/blouse-green.jpg";
import blouseBeige from "@/assets/blouse-beige.jpg";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="gold-line mb-8" />
            <h1 className="text-editorial-hero mb-6">
              Our <span className="italic">Story</span>
            </h1>
            <p className="text-editorial-subtitle">
              A legacy of craftsmanship, woven with passion
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-background-ivory">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-editorial-title mb-8">
                Where Tradition Meets
                <br />
                <span className="italic text-primary">Modern Elegance</span>
              </h2>
              <div className="space-y-6 text-editorial-body">
                <p>
                  Narmatha Fashion Home was born from a deep reverence for
                  India's rich textile heritage. Founded with the vision of
                  preserving traditional craftsmanship while embracing
                  contemporary design sensibilities.
                </p>
                <p>
                  Every thread tells a story. Our artisans, carrying forward
                  generations of expertise, pour their hearts into creating
                  pieces that transcend mere fashion—they are wearable art.
                </p>
                <p>
                  From intricate zardozi embroidery to delicate hand-painted
                  motifs, each creation is a testament to the skill and
                  dedication of our master craftsmen.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <div className="aspect-[4/5] rounded-lg overflow-hidden">
                  <img
                    src={blouseRed}
                    alt="Artisan craftsmanship"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-2/3 aspect-square border-2 border-primary/30 rounded-lg -z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our <span className="italic">Values</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Craftsmanship",
                description:
                  "Every stitch, every bead, every motif is placed with precision and care by skilled artisans who have dedicated their lives to this art.",
                image: blouseGreen,
              },
              {
                title: "Heritage",
                description:
                  "We honor centuries-old techniques passed down through generations, ensuring these precious traditions continue to thrive.",
                image: blouseRed,
              },
              {
                title: "Elegance",
                description:
                  "Our designs embody timeless sophistication, creating pieces that make every woman feel like royalty.",
                image: blouseBeige,
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group"
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-6">
                  <img
                    src={value.image}
                    alt={value.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-playfair text-2xl mb-4 text-foreground">
                  {value.title}
                </h3>
                <p className="text-editorial-body">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 bg-background-champagne">
        <div className="container-luxury">
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="font-playfair text-6xl text-primary">"</span>
            <p className="font-playfair text-2xl md:text-3xl italic text-foreground leading-relaxed mb-6">
              Fashion is not just about clothes. It's about identity, heritage,
              and the stories we choose to tell the world.
            </p>
            <footer className="font-inter text-sm uppercase tracking-widest text-foreground-muted">
              — Narmatha Fashion Home
            </footer>
          </motion.blockquote>
        </div>
      </section>
    </Layout>
  );
};

export default About;
