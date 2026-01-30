import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { ArrowLeft, Package, Calendar, User, Mail, Phone, Ruler } from 'lucide-react';

interface OrderData {
    id: string;
    customerInfo: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    garmentInfo: {
        templateId: string;
        templateName: string;
        fabricPreference?: string;
        deliveryDate?: string;
    };
    measurements: Record<string, string>;
    additionalNotes?: string;
    status: string;
    createdAt: any;
}

const AdminOrders = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/admin/login');
            return;
        }
        fetchOrders();
    }, [user, navigate]);

    const fetchOrders = async () => {
        try {
            const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const ordersData: OrderData[] = [];
            querySnapshot.forEach((doc) => {
                ordersData.push({ id: doc.id, ...doc.data() } as OrderData);
            });
            setOrders(ordersData);
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast({
                title: 'Error',
                description: 'Failed to load orders',
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
                    <p className="text-foreground-muted font-inter">Loading orders...</p>
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
                            <h1 className="text-2xl font-playfair text-foreground">Customer Orders</h1>
                            <p className="text-sm text-foreground-muted font-inter mt-1">
                                {orders.length} total {orders.length === 1 ? 'order' : 'orders'}
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {orders.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-playfair text-foreground mb-2">No orders yet</h3>
                        <p className="text-foreground-muted font-inter">
                            Customer orders will appear here once submitted
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                            >
                                {/* Order Header */}
                                <div className="flex flex-wrap justify-between items-start mb-4 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-primary/10 rounded-lg">
                                            <Package className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-playfair text-lg text-foreground">
                                                {order.garmentInfo?.templateName || 'Unknown Template'}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Calendar className="w-4 h-4 text-foreground-muted" />
                                                <span className="text-sm text-foreground-muted font-inter">
                                                    {formatDate(order.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Customer Info */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-foreground-muted" />
                                        <div>
                                            <p className="text-xs text-foreground-muted font-inter">Customer</p>
                                            <p className="text-sm font-medium font-inter">{order.customerInfo?.name || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-foreground-muted" />
                                        <div>
                                            <p className="text-xs text-foreground-muted font-inter">Email</p>
                                            <p className="text-sm font-medium font-inter">{order.customerInfo?.email || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-foreground-muted" />
                                        <div>
                                            <p className="text-xs text-foreground-muted font-inter">Phone</p>
                                            <p className="text-sm font-medium font-inter">{order.customerInfo?.phone || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Measurements */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Ruler className="w-4 h-4 text-foreground-muted" />
                                        <h4 className="text-sm font-medium text-foreground font-inter">
                                            Measurements
                                        </h4>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                        {Object.entries(order.measurements || {}).map(([key, value]) => (
                                            <div
                                                key={key}
                                                className="p-3 bg-white border border-gray-200 rounded-lg"
                                            >
                                                <p className="text-xs text-foreground-muted font-inter mb-1">
                                                    {key}
                                                </p>
                                                <p className="text-sm font-medium font-inter text-foreground">
                                                    {String(value || '')}
                                                </p>
                                            </div>
                                        ))}
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

export default AdminOrders;
