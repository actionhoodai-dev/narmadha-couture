import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await signIn(email, password);
            toast({
                title: 'Welcome back',
                description: 'Successfully logged in to admin panel',
            });
            navigate('/admin/dashboard');
        } catch (error: any) {
            toast({
                title: 'Authentication failed',
                description: error.message || 'Invalid email or password',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background-ivory to-background flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-primary/10">
                    {/* Logo/Title */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                            <Lock className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl font-playfair text-foreground mb-2">
                            Admin Access
                        </h1>
                        <p className="text-sm text-foreground-muted font-inter">
                            Sign in to manage your dashboard
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-foreground mb-2 font-inter"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-inter"
                                placeholder="admin@example.com"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-foreground mb-2 font-inter"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-inter"
                                placeholder="••••••••"
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-inter"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </motion.button>
                    </form>

                    {/* Security Notice */}
                    <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
                        <p className="text-xs text-foreground-muted text-center font-inter">
                            🔒 This is a secure admin area. Unauthorized access is prohibited.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
