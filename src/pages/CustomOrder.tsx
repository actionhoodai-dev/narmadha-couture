import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { MeasurementModal } from "@/components/MeasurementModal";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { Info } from "lucide-react";

interface MeasurementField {
    name: string;
    unit: string;
}

interface GarmentTemplate {
    id: string;
    name: string;
    measurementFields: MeasurementField[];
    measurementGuideImage?: string;
}

const CustomOrder = () => {
    const { toast } = useToast();
    const [showMeasurementGuide, setShowMeasurementGuide] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [garmentTemplates, setGarmentTemplates] = useState<GarmentTemplate[]>([]);
    const [selectedGarmentId, setSelectedGarmentId] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState<GarmentTemplate | null>(null);

    const [formData, setFormData] = useState({
        // Customer Information
        name: "",
        phone: "",
        email: "",
        address: "",

        // Garment Details
        garmentTemplateId: "",
        fabricPreference: "",
        deliveryDate: "",

        // Dynamic measurements (will be populated based on template)
        measurements: {} as Record<string, string>,

        // Additional Notes
        additionalNotes: "",
    });

    // Fetch garment templates on component mount
    useEffect(() => {
        fetchGarmentTemplates();
    }, []);

    // Update selected template when garment selection changes
    useEffect(() => {
        if (selectedGarmentId) {
            const template = garmentTemplates.find(t => t.id === selectedGarmentId);
            setSelectedTemplate(template || null);

            // Initialize measurements object with empty strings
            if (template) {
                const initialMeasurements: Record<string, string> = {};
                template.measurementFields.forEach(field => {
                    initialMeasurements[field.name] = "";
                });
                setFormData(prev => ({
                    ...prev,
                    garmentTemplateId: selectedGarmentId,
                    measurements: initialMeasurements
                }));
            }
        }
    }, [selectedGarmentId, garmentTemplates]);

    const fetchGarmentTemplates = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'garment_templates'));
            const templates: GarmentTemplate[] = [];
            querySnapshot.forEach((doc) => {
                templates.push({ id: doc.id, ...doc.data() } as GarmentTemplate);
            });
            setGarmentTemplates(templates);

            // Auto-select first template if available
            if (templates.length > 0 && !selectedGarmentId) {
                setSelectedGarmentId(templates[0].id);
            }
        } catch (error) {
            console.error('Error fetching garment templates:', error);
            toast({
                title: 'Error',
                description: 'Failed to load garment templates. Please refresh the page.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        // Handle garment selection separately
        if (name === "garmentTemplateId") {
            setSelectedGarmentId(value);
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleMeasurementChange = (fieldName: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            measurements: {
                ...prev.measurements,
                [fieldName]: value
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (!selectedTemplate) {
                throw new Error("No garment template selected");
            }

            // Save to Firestore
            const orderData = {
                customerInfo: {
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    address: formData.address,
                },
                garmentInfo: {
                    templateId: formData.garmentTemplateId,
                    templateName: selectedTemplate.name,
                    fabricPreference: formData.fabricPreference || null,
                    deliveryDate: formData.deliveryDate || null,
                },
                measurements: formData.measurements,
                additionalNotes: formData.additionalNotes || null,
                status: "pending",
                createdAt: serverTimestamp(),
            };

            await addDoc(collection(db, 'orders'), orderData);

            // Also send email notification
            const measurementsList = Object.entries(formData.measurements)
                .map(([key, value], index) => `${index + 1}. ${key}: ${value}`)
                .join('\n');

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
Garment Type: ${selectedTemplate.name}
Fabric Preference: ${formData.fabricPreference || "Not specified"}
Preferred Delivery Date: ${formData.deliveryDate || "Not specified"}

MEASUREMENTS:
-------------
${measurementsList}

ADDITIONAL NOTES:
-----------------
${formData.additionalNotes || "None"}
            `.trim();

            await fetch(
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
                        subject: `Custom Order - ${selectedTemplate.name} for ${formData.name}`,
                        message: emailBody,
                    }),
                }
            );

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
                garmentTemplateId: selectedGarmentId,
                fabricPreference: "",
                deliveryDate: "",
                measurements: {},
                additionalNotes: "",
            });

            // Re-initialize measurements for current template
            if (selectedTemplate) {
                const initialMeasurements: Record<string, string> = {};
                selectedTemplate.measurementFields.forEach(field => {
                    initialMeasurements[field.name] = "";
                });
                setFormData(prev => ({ ...prev, measurements: initialMeasurements }));
            }
        } catch (error) {
            console.error('Order submission error:', error);
            toast({
                title: "Something went wrong",
                description: "Please try again or contact us directly.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-foreground-muted font-inter">Loading order form...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    if (garmentTemplates.length === 0) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center max-w-md">
                        <h2 className="text-2xl font-playfair mb-4">No Garment Templates Available</h2>
                        <p className="text-foreground-muted font-inter">
                            Please contact us directly to place an order.
                        </p>
                    </div>
                </div>
            </Layout>
        );
    }

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
                                        name="garmentTemplateId"
                                        value={selectedGarmentId}
                                        onChange={handleChange}
                                        required
                                        className="input-luxury peer"
                                    >
                                        {garmentTemplates.map(template => (
                                            <option key={template.id} value={template.id}>
                                                {template.name}
                                            </option>
                                        ))}
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

                        {/* Dynamic Measurements Section */}
                        {selectedTemplate && selectedTemplate.measurementFields.length > 0 && (
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

                                    {selectedTemplate.measurementGuideImage && (
                                        <button
                                            type="button"
                                            onClick={() => setShowMeasurementGuide(true)}
                                            className="btn-luxury-secondary flex items-center gap-2 whitespace-nowrap"
                                        >
                                            <Info className="w-4 h-4" />
                                            View Measurement Guide
                                        </button>
                                    )}
                                </div>

                                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                                    <p className="font-inter text-sm text-foreground flex items-start gap-2">
                                        <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span>
                                            Enter all measurements in the specified units.
                                            {selectedTemplate.measurementGuideImage && (
                                                <> Click the "View Measurement Guide" button above to see how to take each measurement correctly.</>
                                            )}
                                        </span>
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {selectedTemplate.measurementFields.map((field, index) => (
                                        <div key={index} className="relative">
                                            <input
                                                type="number"
                                                step="0.25"
                                                value={formData.measurements[field.name] || ""}
                                                onChange={(e) => handleMeasurementChange(field.name, e.target.value)}
                                                required
                                                placeholder=" "
                                                className="input-luxury peer"
                                            />
                                            <label className="absolute top-4 left-0 font-inter text-sm text-foreground-muted transition-all peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                                                {index + 1}. {field.name} ({field.unit}) *
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

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
            {selectedTemplate && (
                <MeasurementModal
                    isOpen={showMeasurementGuide}
                    onClose={() => setShowMeasurementGuide(false)}
                    imagePath={selectedTemplate.measurementGuideImage}
                    garmentName={selectedTemplate.name}
                />
            )}
        </Layout>
    );
};

export default CustomOrder;
