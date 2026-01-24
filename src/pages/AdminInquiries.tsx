import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { ArrowLeft, MessageSquare, Calendar, User, Mail, Phone } from 'lucide-react';

interface InquiryData {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    createdAt: any;
}

const AdminInquiries = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [inquiries, setInquiries] = useState<InquiryData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/admin/login');
            return;
        }
        fetchInquiries();
    }, [user, navigate]);

    const fetchInquiries = async () => {
        try {
            const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const inquiriesData: InquiryData[] = [];
            querySnapshot.forEach((doc) => {
                inquiriesData.push({ id: doc.id, ...doc.data() } as InquiryData);
            });
            setInquiries(inquiriesData);
        } catch (error) {
            console.error('Error fetching inquiries:', error);
            toast({
                title: 'Error',
                description: 'Failed to load inquiries',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp) return 'N/A';
        try {
            const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch {
            return 'Invalid date';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-foreground-muted font-inter">Loading inquiries...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/admin/dashboard')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-playfair text-foreground">Customer Inquiries</h1>
                            <p className="text-sm text-foreground-muted font-inter mt-1">
                                {inquiries.length} total {inquiries.length === 1 ? 'inquiry' : 'inquiries'}
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {inquiries.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                        <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-playfair text-foreground mb-2">No inquiries yet</h3>
                        <p className="text-foreground-muted font-inter">
                            Customer inquiries from the contact form will appear here
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {inquiries.map((inquiry) => (
                            <motion.div
                                key={inquiry.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                            >
                                {/* Inquiry Header */}
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="p-3 bg-green-50 rounded-lg">
                                        <MessageSquare className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-wrap justify-between items-start gap-2">
                                            <h3 className="font-playfair text-lg text-foreground">
                                                {inquiry.name}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-foreground-muted" />
                                                <span className="text-sm text-foreground-muted font-inter">
                                                    {formatDate(inquiry.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-foreground-muted" />
                                        <div>
                                            <p className="text-xs text-foreground-muted font-inter">Email</p>
                                            <a
                                                href={`mailto:${inquiry.email}`}
                                                className="text-sm font-medium font-inter text-primary hover:underline"
                                            >
                                                {inquiry.email}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-foreground-muted" />
                                        <div>
                                            <p className="text-xs text-foreground-muted font-inter">Phone</p>
                                            <a
                                                href={`tel:${inquiry.phone}`}
                                                className="text-sm font-medium font-inter text-primary hover:underline"
                                            >
                                                {inquiry.phone}
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <h4 className="text-sm font-medium text-foreground font-inter mb-2">
                                        Message
                                    </h4>
                                    <div className="p-4 bg-white border border-gray-200 rounded-lg">
                                        <p className="text-sm text-foreground font-inter whitespace-pre-wrap">
                                            {inquiry.message}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminInquiries;
