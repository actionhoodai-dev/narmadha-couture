import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center pt-20">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-playfair text-8xl md:text-9xl text-primary mb-4">
              404
            </h1>
            <h2 className="text-editorial-title mb-6">
              Page Not Found
            </h2>
            <p className="text-editorial-body mb-10 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="btn-luxury-primary">
              Return Home
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
