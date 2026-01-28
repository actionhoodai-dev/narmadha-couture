import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface MeasurementModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MeasurementModal = ({ isOpen, onClose }: MeasurementModalProps) => {
    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
            // Prevent body scroll when modal is open
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    // Trap focus within modal
    useEffect(() => {
        if (!isOpen) return;

        const focusableElements = document.querySelectorAll(
            '#measurement-modal button, #measurement-modal [href], #measurement-modal input, #measurement-modal select, #measurement-modal textarea, #measurement-modal [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        document.addEventListener("keydown", handleTab);
        firstElement?.focus();

        return () => {
            document.removeEventListener("keydown", handleTab);
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                    id="measurement-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-4xl max-h-[90vh] bg-background rounded-xl shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-background border-b border-border">
                            <h2
                                id="modal-title"
                                className="font-playfair text-2xl font-semibold text-foreground"
                            >
                                How to Take Measurements
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                aria-label="Close measurement guide"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
                            <div className="flex flex-col items-center gap-4">
                                <p className="font-inter text-foreground-muted text-center max-w-2xl">
                                    Please refer to this guide to ensure accurate measurements for your custom blouse.
                                    This will help us create the perfect fit for you.
                                </p>

                                <div className="w-full bg-muted/30 rounded-lg p-4 overflow-auto">
                                    <img
                                        src="/blouse-measurements.png"
                                        alt="Blouse measurement instruction guide"
                                        className="w-full h-auto object-contain max-w-full mx-auto"
                                        style={{
                                            touchAction: "pinch-zoom",
                                            imageRendering: "crisp-edges"
                                        }}
                                    />
                                </div>

                                <div className="text-sm font-inter text-foreground-muted text-center bg-primary/5 p-4 rounded-lg max-w-2xl">
                                    <strong className="text-foreground">💡 Pro Tip:</strong> For the most accurate measurements,
                                    we recommend having someone assist you or consulting a professional tailor.
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="sticky bottom-0 z-10 px-6 py-4 bg-background border-t border-border">
                            <button
                                onClick={onClose}
                                className="btn-luxury-primary w-full sm:w-auto sm:min-w-[200px] mx-auto block"
                            >
                                Got It
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
