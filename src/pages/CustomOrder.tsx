import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { MeasurementModal } from "@/components/MeasurementModal";
import { useToast } from "@/hooks/use-toast";
import { Info } from "lucide-react";

const CustomOrder = () => {
    const { toast } = useToast();
    const [showMeasurementGuide, setShowMeasurementGuide] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        // Customer Information
        name: "",
        phone: "",
        email: "",
        address: "",

        // Garment Type
        garmentType: "blouse",
        fabricPreference: "",
        deliveryDate: "",

        // Measurements (Blouse)
        blouseBackLength: "",
        fullShoulder: "",
        shoulderStrap: "",
        backNeckDepth: "",
        frontNeckDepth: "",
        shoulderToApex: "",
        frontLength: "",
        chest: "",
        waist: "",
        sleeveLength: "",
        armRound: "",
        sleeveRound: "",
        armHole: "",

        // Additional Notes
        additionalNotes: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Prepare email content
            const emailBody = `
NEW CUSTOM ORDER SUBMISSION

CUSTOMER INFORMATION:
---------------------
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Address: ${formData.address}

ORDER DETAILS:
--------------
Garment Type: ${formData.garmentType}
Fabric Preference: ${formData.fabricPreference || "Not specified"}
Preferred Delivery Date: ${formData.deliveryDate || "Not specified"}

MEASUREMENTS (in inches):
------------------------
1. Blouse Back Length: ${formData.blouseBackLength}
2. Full Shoulder: ${formData.fullShoulder}
3. Shoulder Strap: ${formData.shoulderStrap}
4. Back Neck Depth: ${formData.backNeckDepth}
5. Front Neck Depth: ${formData.frontNeckDepth}
6. Shoulder to Apex: ${formData.shoulderToApex}
7. Front Length: ${formData.frontLength}
8. Chest (around): ${formData.chest}
9. Waist (around): ${formData.waist}
10. Sleeve Length: ${formData.sleeveLength}
11. Arm Round: ${formData.armRound}
12. Sleeve Round: ${formData.sleeveRound}
13. Arm Hole: ${formData.armHole}

ADDITIONAL NOTES:
-----------------
${formData.additionalNotes || "None"}
      `.trim();

            const res = await fetch(
                "https://formsubmit.co/ajax/narmathafashionhomes@gmail.com",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        subject: `Custom Order - ${formData.garmentType} for ${formData.name}`,
                        message: emailBody,
                    }),
                }
            );

            if (!res.ok) {
                throw new Error("Failed to send");
            }

            toast({
                title: "Order Submitted Successfully!",
                description: "We've received your custom order. We'll contact you within 24 hours.",
            });

            // Reset form
            setFormData({
                name: "",
                phone: "",
                email: "",
                address: "",
                garmentType: "blouse",
                fabricPreference: "",
                deliveryDate: "",
                blouseBackLength: "",
                fullShoulder: "",
                shoulderStrap: "",
                backNeckDepth: "",
                frontNeckDepth: "",
                shoulderToApex: "",
                frontLength: "",
                chest: "",
                waist: "",
                sleeveLength: "",
                armRound: "",
                sleeveRound: "",
                armHole: "",
                additionalNotes: "",
            });
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "Please try again or contact us directly.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
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
                            Custom <span className="italic">Order</span>
                        </h1>
                        <p className="text-editorial-subtitle">
                            Create your perfect garment with precision measurements
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Order Form Section */}
            <section className="py-20 bg-background-ivory">
                <div className="container-luxury max-w-4xl">
                    <form onSubmit={handleSubmit} className="space-y-12">
                        {/* Customer Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <h2 className="text-editorial-title mb-6">Customer Information</h2>

                            <div className="grid md:grid-cols-2 gap-6">
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
                                        Full Name *
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
                                        Phone Number *
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
                                        Email Address *
                                    </label>
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        placeholder=" "
                                        className="input-luxury peer"
                                    />
                                    <label className="absolute top-4 left-0 font-inter text-sm text-foreground-muted transition-all peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                                        Delivery Address *
                                    </label>
                                </div>
                            </div>
                        </motion.div>

                        {/* Order Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="space-y-6"
                        >
                            <h2 className="text-editorial-title mb-6">Order Details</h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="relative">
                                    <select
                                        name="garmentType"
                                        value={formData.garmentType}
                                        onChange={handleChange}
                                        required
                                        className="input-luxury peer"
                                    >
                                        <option value="blouse">Blouse</option>
                                        <option value="frock">Frock</option>
                                        <option value="kids-wear">Kids Wear</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <label className="absolute -top-2 left-0 font-inter text-xs text-primary">
                                        Garment Type *
                                    </label>
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        name="fabricPreference"
                                        value={formData.fabricPreference}
                                        onChange={handleChange}
                                        placeholder=" "
                                        className="input-luxury peer"
                                    />
                                    <label className="absolute top-4 left-0 font-inter text-sm text-foreground-muted transition-all peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                                        Fabric Preference (Optional)
                                    </label>
                                </div>

                                <div className="relative">
                                    <input
                                        type="date"
                                        name="deliveryDate"
                                        value={formData.deliveryDate}
                                        onChange={handleChange}
                                        className="input-luxury peer"
                                    />
                                    <label className="absolute -top-2 left-0 font-inter text-xs text-foreground-muted">
                                        Preferred Delivery Date
                                    </label>
                                </div>
                            </div>
                        </motion.div>

                        {/* Measurements Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                                <div>
                                    <h2 className="text-editorial-title mb-2">Measurements</h2>
                                    <p className="font-inter text-sm text-foreground-muted">
                                        Please refer to the measurement guide before filling the form
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setShowMeasurementGuide(true)}
                                    className="btn-luxury-secondary flex items-center gap-2 whitespace-nowrap"
                                >
                                    <Info className="w-4 h-4" />
                                    View Measurement Guide
                                </button>
                            </div>

                            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                                <p className="font-inter text-sm text-foreground flex items-start gap-2">
                                    <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                    <span>
                                        All measurements should be in <strong>inches</strong>.
                                        Click the "View Measurement Guide" button above to see how to take each measurement correctly.
                                    </span>
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    { name: "blouseBackLength", label: "1. Blouse Back Length" },
                                    { name: "fullShoulder", label: "2. Full Shoulder" },
                                    { name: "shoulderStrap", label: "3. Shoulder Strap" },
                                    { name: "backNeckDepth", label: "4. Back Neck Depth" },
                                    { name: "frontNeckDepth", label: "5. Front Neck Depth" },
                                    { name: "shoulderToApex", label: "6. Shoulder to Apex" },
                                    { name: "frontLength", label: "7. Front Length" },
                                    { name: "chest", label: "8. Chest (around)" },
                                    { name: "waist", label: "9. Waist (around)" },
                                    { name: "sleeveLength", label: "10. Sleeve Length" },
                                    { name: "armRound", label: "11. Arm Round" },
                                    { name: "sleeveRound", label: "12. Sleeve Round" },
                                    { name: "armHole", label: "13. Arm Hole" },
                                ].map(({ name, label }) => (
                                    <div key={name} className="relative">
                                        <input
                                            type="number"
                                            step="0.25"
                                            name={name}
                                            value={formData[name as keyof typeof formData]}
                                            onChange={handleChange}
                                            required
                                            placeholder=" "
                                            className="input-luxury peer"
                                        />
                                        <label className="absolute top-4 left-0 font-inter text-sm text-foreground-muted transition-all peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                                            {label} (inches) *
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Additional Notes */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="space-y-6"
                        >
                            <h2 className="text-editorial-title mb-6">Additional Information</h2>

                            <div className="relative">
                                <textarea
                                    name="additionalNotes"
                                    value={formData.additionalNotes}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder=" "
                                    className="input-luxury peer resize-none"
                                />
                                <label className="absolute top-4 left-0 font-inter text-sm text-foreground-muted transition-all peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                                    Special Instructions or Design Preferences (Optional)
                                </label>
                            </div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
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
                                        Submitting Order...
                                    </span>
                                ) : (
                                    "Submit Custom Order"
                                )}
                            </motion.button>
                        </motion.div>
                    </form>
                </div>
            </section>

            {/* Measurement Modal */}
            <MeasurementModal
                isOpen={showMeasurementGuide}
                onClose={() => setShowMeasurementGuide(false)}
            />
        </Layout>
    );
};

export default CustomOrder;
