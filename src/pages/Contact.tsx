import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. We'll get back to you soon!",
    });

    setFormData({ name: "", phone: "", email: "", message: "" });
    setIsSubmitting(false);
  };

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
              Get in <span className="italic">Touch</span>
            </h1>
            <p className="text-editorial-subtitle">
              We'd love to hear from you
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-background-ivory">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-editorial-title mb-8">
                Let's Create
                <br />
                <span className="italic text-primary">Something Beautiful</span>
              </h2>
              <p className="text-editorial-body mb-12">
                Whether you're looking for a custom design, have questions about
                our collections, or simply want to explore possibilities—we're
                here to help you on your style journey.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="font-playfair text-lg mb-2">Email</h3>
                  <a
                    href="mailto:narmigk@gmail.com"
                    className="font-inter text-foreground-muted hover:text-primary transition-colors"
                  >
narmigk@gmail.com                  </a>
                </div>
                <div>
                  <h3 className="font-playfair text-lg mb-2">Follow Us</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://www.instagram.com/narmatha_fashion_home?igsh=MTJxcTdpdzQyeXVrcw=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-inter text-sm uppercase tracking-wider text-foreground-muted hover:text-primary transition-colors"
                    >
                      Instagram
                    </a>
                    <span className="text-foreground-muted">•</span>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-inter text-sm uppercase tracking-wider text-foreground-muted hover:text-primary transition-colors"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="input-luxury peer"
                  />
                  <label className="absolute top-4 left-0 font-inter text-sm text-foreground-muted transition-all peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                    Full Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="input-luxury peer"
                  />
                  <label className="absolute top-4 left-0 font-inter text-sm text-foreground-muted transition-all peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                    Phone Number
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="input-luxury peer"
                  />
                  <label className="absolute top-4 left-0 font-inter text-sm text-foreground-muted transition-all peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                    Email Address
                  </label>
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder=" "
                    className="input-luxury peer resize-none"
                  />
                  <label className="absolute top-4 left-0 font-inter text-sm text-foreground-muted transition-all peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                    Your Message
                  </label>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-luxury-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                      />
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
