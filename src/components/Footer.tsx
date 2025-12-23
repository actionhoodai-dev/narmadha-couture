import { Link } from "react-router-dom";
import { Instagram, MapPin } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Fabrics", href: "/fabrics" },
  { name: "Kids Fashion", href: "/kids-fashion" },
  { name: "Customized Gifts", href: "/customized-gifts" },
  { name: "Contact", href: "/contact" },
];

export const Footer = () => {
  return (
    <footer className="footer-luxury">
      <div className="container-luxury">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                <span className="font-playfair text-2xl text-primary-foreground font-semibold">
                  N
                </span>
              </div>
            </Link>
            <h3 className="font-playfair text-xl text-footer-foreground mb-3">
              Narmatha Fashion Home
            </h3>
            <p className="font-inter text-sm text-footer-foreground/60 leading-relaxed">
              Crafting elegance through exquisite designs and timeless fashion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-lg text-footer-foreground mb-6">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="font-inter text-sm text-footer-foreground/60 hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-lg text-footer-foreground mb-6">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:narmathafashionhomes@gmail.com"
                className="font-inter text-sm text-footer-foreground/60 hover:text-primary transition-colors duration-300 block"
              >
                narmathafashionhomes@gmail.com
              </a>
              <address className="font-inter text-sm text-footer-foreground/60 not-italic leading-relaxed">
                Sharptronics First floor,<br />
                Raman Nagar, Mettur,<br />
                Tamil Nadu 636403
              </address>
            </div>
          </div>

          {/* Social & Location */}
          <div>
            <h4 className="font-playfair text-lg text-footer-foreground mb-6">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/narmatha_fashion_home?igsh=MTJxcTdpdzQyeXVrcw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-footer-foreground/20 flex items-center justify-center text-footer-foreground/60 hover:text-primary hover:border-primary transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://maps.app.goo.gl/4zDvCmjnMyHXyLjY6?g_st=aw"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-footer-foreground/20 flex items-center justify-center text-footer-foreground/60 hover:text-primary hover:border-primary transition-all duration-300"
                aria-label="Location"
              >
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-footer-foreground/10">
          <p className="font-inter text-xs text-center text-footer-foreground/40">
            © {new Date().getFullYear()} Narmatha Fashion Home. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
