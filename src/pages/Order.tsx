import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { Ruler, Package } from 'lucide-react';

interface MeasurementField {
    name: string;
    unit: string;
}

interface GarmentTemplate {
    id: string;
    name: string;
    measurementFields: MeasurementField[];
}

const Order = () => {
    const { toast } = useToast();
    const [garmentTemplates, setGarmentTemplates] = useState<GarmentTemplate[]>([]);
    const [selectedGarment, setSelectedGarment] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Customer info
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');

    // Dynamic measurements
    const [measurements, setMeasurements] = useState<Record<string, string>>({});

    useEffect(() => {
        fetchGarmentTemplates();
    }, []);

    const fetchGarmentTemplates = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'garment_templates'));
            const templates: GarmentTemplate[] = [];
            querySnapshot.forEach((doc) => {
                templates.push({ id: doc.id, ...doc.data() } as GarmentTemplate);
            });
            setGarmentTemplates(templates);
        } catch (error) {
            console.error('Error fetching garment templates:', error);
            toast({
                title: 'Error',
                description: 'Failed to load garment types',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGarmentChange = (garmentId: string) => {
        setSelectedGarment(garmentId);
        setMeasurements({});
    };

    const handleMeasurementChange = (fieldName: string, value: string) => {
        setMeasurements({ ...measurements, [fieldName]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Get selected garment details
        const garment = garmentTemplates.find((g) => g.id === selectedGarment);
        if (!garment) {
            toast({
                title: 'Error',
                description: 'Please select a garment type',
                variant: 'destructive',
            });
            setIsSubmitting(false);
            return;
        }

        // Validate all measurements are filled
        const filledMeasurements: Record<string, string> = {};
        for (const field of garment.measurementFields) {
            const key = `${field.name} (${field.unit})`;
            const value = measurements[key];
            if (!value || !value.trim()) {
                toast({
                    title: 'Incomplete Form',
                    description: `Please enter ${field.name}`,
                    variant: 'destructive',
                });
                setIsSubmitting(false);
                return;
            }
            filledMeasurements[key] = value.trim();
        }

        try {
            // Save order to Firestore
            await addDoc(collection(db, 'orders'), {
                customerName,
                customerEmail: customerEmail || null,
                customerPhone,
                garmentType: garment.name,
                measurements: filledMeasurements,
                createdAt: serverTimestamp(),
            });

            toast({
                title: 'Order Submitted!',
                description: 'Thank you! Your order has been received.',
            });

            // Reset form
            setCustomerName('');
            setCustomerEmail('');
            setCustomerPhone('');
            setSelectedGarment('');
            setMeasurements({});
        } catch (error) {
            console.error('Error submitting order:', error);
            toast({
                title: 'Submission Failed',
                description: 'Please try again later.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedGarmentData = garmentTemplates.find(
        (g) => g.id === selectedGarment
    );

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-background">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-foreground-muted font-inter">Loading...</p>
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
                            Place Your <span className="italic">Order</span>
                        </h1>
                        <p className="text-editorial-subtitle">
                            Share your measurements and we'll craft the perfect fit
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Order Form Section */}
            <section className="py-20 bg-background-ivory">
                <div className="container-luxury">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-primary/10"
                        >
                            {garmentTemplates.length === 0 ? (
                                <div className="text-center py-12">
                                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-playfair text-foreground mb-2">
                                        No Garment Types Available
                                    </h3>
                                    <p className="text-foreground-muted font-inter">
                                        Please check back later
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Customer Information */}
                                    <div>
                                        <h2 className="text-2xl font-playfair text-foreground mb-6 flex items-center gap-2">
                                            <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                                                1
                                            </span>
                                            Your Information
                                        </h2>

                                        <div className="space-y-4">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={customerName}
                                                    onChange={(e) => setCustomerName(e.target.value)}
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
                                                    value={customerPhone}
                                                    onChange={(e) => setCustomerPhone(e.target.value)}
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
                                                    value={customerEmail}
                                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                                    placeholder=" "
                                                    className="input-luxury peer"
                                                />
                                                <label className="absolute top-4 left-0 font-inter text-sm text-foreground-muted transition-all peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                                                    Email Address (Optional)
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Garment Selection */}
                                    <div>
                                        <h2 className="text-2xl font-playfair text-foreground mb-6 flex items-center gap-2">
                                            <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                                                2
                                            </span>
                                            Select Garment Type
                                        </h2>

                                        <select
                                            value={selectedGarment}
                                            onChange={(e) => handleGarmentChange(e.target.value)}
                                            required
                                            className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-primary bg-transparent font-inter text-foreground transition-colors"
                                        >
                                            <option value="">Choose a garment type...</option>
                                            {garmentTemplates.map((garment) => (
                                                <option key={garment.id} value={garment.id}>
                                                    {garment.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Measurements */}
                                    {selectedGarmentData && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <h2 className="text-2xl font-playfair text-foreground mb-6 flex items-center gap-2">
                                                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                                                    3
                                                </span>
                                                Enter Measurements
                                            </h2>

                                            <div className="p-6 bg-primary/5 rounded-xl border border-primary/10 mb-6">
                                                <div className="flex items-start gap-3">
                                                    <Ruler className="w-5 h-5 text-primary mt-0.5" />
                                                    <div>
                                                        <p className="text-sm font-medium text-foreground font-inter mb-1">
                                                            Measurement Instructions
                                                        </p>
                                                        <p className="text-xs text-foreground-muted font-inter leading-relaxed">
                                                            Please enter all measurements accurately. Each field shows the
                                                            unit of measurement (cm/inch). Make sure to measure carefully
                                                            for the best fit.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {selectedGarmentData.measurementFields.map((field, index) => {
                                                    const fieldKey = `${field.name} (${field.unit})`;
                                                    return (
                                                        <div key={index} className="relative">
                                                            <input
                                                                type="number"
                                                                step="0.1"
                                                                value={measurements[fieldKey] || ''}
                                                                onChange={(e) =>
                                                                    handleMeasurementChange(fieldKey, e.target.value)
                                                                }
                                                                required
                                                                placeholder=" "
                                                                className="input-luxury peer"
                                                            />
                                                            <label className="absolute top-4 left-0 font-inter text-sm text-foreground-muted transition-all peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
                                                                {field.name} ({field.unit}) *
                                                            </label>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Submit Button */}
                                    {selectedGarmentData && (
                                        <motion.button
                                            type="submit"
                                            disabled={isSubmitting}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            className="btn-luxury-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                                                    Submitting Order...
                                                </span>
                                            ) : (
                                                'Submit Order'
                                            )}
                                        </motion.button>
                                    )}
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Order;
