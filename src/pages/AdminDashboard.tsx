import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    serverTimestamp,
} from 'firebase/firestore';
import {
    LogOut,
    Plus,
    Trash2,
    Edit,
    Package,
    ShoppingBag,
    MessageSquare,
    Ruler,
    X,
    Upload,
    Image as ImageIcon,
} from 'lucide-react';

interface MeasurementField {
    id: string;
    name: string;
    unit: string;
}

interface GarmentTemplate {
    id: string;
    name: string;
    measurementFields: MeasurementField[];
    measurementGuideImage?: string; // Path to image in public/measurement-guides/
    createdAt: any;
}

const AdminDashboard = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [garments, setGarments] = useState<GarmentTemplate[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingGarment, setEditingGarment] = useState<GarmentTemplate | null>(null);

    // Form states
    const [garmentName, setGarmentName] = useState('');
    const [measurementGuideImage, setMeasurementGuideImage] = useState('');
    const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
    const [measurementFields, setMeasurementFields] = useState<MeasurementField[]>([
        { id: crypto.randomUUID(), name: '', unit: 'cm' },
    ]);

    useEffect(() => {
        fetchGarments();
    }, []);

    const fetchGarments = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'garment_templates'));
            const garmentsData: GarmentTemplate[] = [];
            querySnapshot.forEach((doc) => {
                garmentsData.push({ id: doc.id, ...doc.data() } as GarmentTemplate);
            });
            setGarments(garmentsData);
        } catch (error) {
            console.error('Error fetching garments:', error);
            toast({
                title: 'Error',
                description: 'Failed to load garment templates',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/admin/login');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to sign out',
                variant: 'destructive',
            });
        }
    };

    const addMeasurementField = () => {
        setMeasurementFields([
            ...measurementFields,
            { id: crypto.randomUUID(), name: '', unit: 'cm' },
        ]);
    };

    const removeMeasurementField = (id: string) => {
        if (measurementFields.length > 1) {
            setMeasurementFields(measurementFields.filter((field) => field.id !== id));
        }
    };

    const updateMeasurementField = (id: string, key: 'name' | 'unit', value: string) => {
        setMeasurementFields(
            measurementFields.map((field) =>
                field.id === id ? { ...field, [key]: value } : field
            )
        );
    };

    // Handle image file selection
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast({
                title: 'Invalid File',
                description: 'Please upload an image file (PNG, JPG, JPEG)',
                variant: 'destructive',
            });
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast({
                title: 'File Too Large',
                description: 'Please upload an image smaller than 5MB',
                variant: 'destructive',
            });
            return;
        }

        setUploadedImageFile(file);

        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setImagePreviewUrl(previewUrl);
    };

    // Helper function to save image to public folder
    const saveImageToPublicFolder = async (file: File, garmentName: string): Promise<string> => {
        // Generate safe filename from garment name
        const safeFileName = garmentName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        const fileExtension = file.name.split('.').pop() || 'png';
        const fileName = `${safeFileName}.${fileExtension}`;
        const imagePath = `/measurement-guides/${fileName}`;

        // Create FormData for file upload
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', fileName);

        try {
            // Convert file to base64 for storage (since we can't write directly to public folder in production)
            // In production, this would be handled by a backend API
            // For now, we'll save the file and return the path
            // Note: In a real production app, you'd upload to a server or use a service

            return imagePath;
        } catch (error) {
            console.error('Error saving image:', error);
            throw error;
        }
    };

    // Remove uploaded image
    const handleRemoveImage = () => {
        setUploadedImageFile(null);
        setImagePreviewUrl('');
        setMeasurementGuideImage('');

        if (imagePreviewUrl) {
            URL.revokeObjectURL(imagePreviewUrl);
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate
        if (!garmentName.trim()) {
            toast({
                title: 'Validation Error',
                description: 'Please enter a garment name',
                variant: 'destructive',
            });
            return;
        }

        const validFields = measurementFields.filter((field) => field.name.trim());
        if (validFields.length === 0) {
            toast({
                title: 'Validation Error',
                description: 'Please add at least one measurement field',
                variant: 'destructive',
            });
            return;
        }

        try {
            let finalImagePath = measurementGuideImage;

            // If a new image file was uploaded, save it
            if (uploadedImageFile) {
                finalImagePath = await saveImageToPublicFolder(uploadedImageFile, garmentName);

                toast({
                    title: 'Image Upload',
                    description: `Please manually save the uploaded image to: public${finalImagePath}`,
                    duration: 10000,
                });
            }

            if (editingGarment) {
                // Update existing garment
                await updateDoc(doc(db, 'garment_templates', editingGarment.id), {
                    name: garmentName,
                    measurementFields: validFields.map(({ id, ...rest }) => rest),
                    measurementGuideImage: finalImagePath || null,
                    updatedAt: serverTimestamp(),
                });
                toast({
                    title: 'Success',
                    description: 'Garment template updated successfully',
                });
            } else {
                // Create new garment
                await addDoc(collection(db, 'garment_templates'), {
                    name: garmentName,
                    measurementFields: validFields.map(({ id, ...rest }) => rest),
                    measurementGuideImage: finalImagePath || null,
                    createdAt: serverTimestamp(),
                });
                toast({
                    title: 'Success',
                    description: 'Garment template created successfully',
                });
            }

            // Reset form
            setGarmentName('');
            setMeasurementGuideImage('');
            setUploadedImageFile(null);
            setImagePreviewUrl('');
            setMeasurementFields([{ id: crypto.randomUUID(), name: '', unit: 'cm' }]);
            setShowAddForm(false);
            setEditingGarment(null);
            fetchGarments();
        } catch (error) {
            console.error('Error saving garment:', error);
            toast({
                title: 'Error',
                description: 'Failed to save garment template',
                variant: 'destructive',
            });
        }
    };

    const handleEdit = (garment: GarmentTemplate) => {
        setEditingGarment(garment);
        setGarmentName(garment.name);
        setMeasurementGuideImage(garment.measurementGuideImage || '');
        setUploadedImageFile(null);
        // Set preview to existing image if available
        setImagePreviewUrl(garment.measurementGuideImage || '');
        setMeasurementFields(
            garment.measurementFields.map((field) => ({
                ...field,
                id: crypto.randomUUID(),
            }))
        );
        setShowAddForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this garment template?')) {
            return;
        }

        try {
            await deleteDoc(doc(db, 'garment_templates', id));
            toast({
                title: 'Success',
                description: 'Garment template deleted successfully',
            });
            fetchGarments();
        } catch (error) {
            console.error('Error deleting garment:', error);
            toast({
                title: 'Error',
                description: 'Failed to delete garment template',
                variant: 'destructive',
            });
        }
    };

    const cancelForm = () => {
        setShowAddForm(false);
        setEditingGarment(null);
        setGarmentName('');
        setMeasurementGuideImage('');
        setUploadedImageFile(null);
        if (imagePreviewUrl && !imagePreviewUrl.startsWith('/measurement-guides')) {
            URL.revokeObjectURL(imagePreviewUrl);
        }
        setImagePreviewUrl('');
        setMeasurementFields([{ id: crypto.randomUUID(), name: '', unit: 'cm' }]);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-foreground-muted font-inter">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-playfair text-foreground">Admin Dashboard</h1>
                            <p className="text-sm text-foreground-muted font-inter mt-1">
                                Welcome back, {user?.email}
                            </p>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-inter text-sm"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.button
                        onClick={() => navigate('/admin/orders')}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <ShoppingBag className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-foreground-muted font-inter">View Orders</p>
                                <p className="text-2xl font-playfair text-foreground">Orders</p>
                            </div>
                        </div>
                    </motion.button>

                    <motion.button
                        onClick={() => navigate('/admin/inquiries')}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-50 rounded-lg">
                                <MessageSquare className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-foreground-muted font-inter">View Inquiries</p>
                                <p className="text-2xl font-playfair text-foreground">Messages</p>
                            </div>
                        </div>
                    </motion.button>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <Package className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-foreground-muted font-inter">Garment Templates</p>
                                <p className="text-2xl font-playfair text-foreground">{garments.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Garment Templates Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl font-playfair text-foreground">Garment Templates</h2>
                            <p className="text-sm text-foreground-muted font-inter mt-1">
                                Manage measurement templates for different garment types
                            </p>
                        </div>
                        {!showAddForm && (
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-inter text-sm"
                            >
                                <Plus className="w-4 h-4" />
                                Add Template
                            </button>
                        )}
                    </div>

                    {/* Add/Edit Form */}
                    {showAddForm && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-playfair text-lg">
                                    {editingGarment ? 'Edit Template' : 'Create New Template'}
                                </h3>
                                <button
                                    onClick={cancelForm}
                                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2 font-inter">
                                        Garment Name
                                    </label>
                                    <input
                                        type="text"
                                        value={garmentName}
                                        onChange={(e) => setGarmentName(e.target.value)}
                                        placeholder="e.g., Blouse, Churidar, Kurti"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-inter"
                                    />
                                </div>

                                {/* Image Upload Section */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-3 font-inter">
                                        Measurement Guide Image (Optional)
                                    </label>

                                    {!imagePreviewUrl ? (
                                        // Upload Button
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/png,image/jpeg,image/jpg"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                                id="image-upload"
                                            />
                                            <label
                                                htmlFor="image-upload"
                                                className="flex items-center justify-center gap-3 w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
                                            >
                                                <Upload className="w-6 h-6 text-gray-400" />
                                                <div className="text-center">
                                                    <p className="text-sm font-medium text-foreground font-inter">
                                                        Click to upload measurement guide
                                                    </p>
                                                    <p className="text-xs text-foreground-muted font-inter mt-1">
                                                        PNG, JPG up to 5MB
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    ) : (
                                        // Image Preview with Actions
                                        <div className="space-y-3">
                                            <div className="relative group border-2 border-gray-200 rounded-lg overflow-hidden">
                                                <img
                                                    src={imagePreviewUrl}
                                                    alt="Measurement guide preview"
                                                    className="w-full h-48 object-contain bg-gray-50"
                                                />
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                    <ImageIcon className="w-8 h-8 text-white" />
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                {/* Replace Image */}
                                                <div className="relative flex-1">
                                                    <input
                                                        type="file"
                                                        accept="image/png,image/jpeg,image/jpg"
                                                        onChange={handleImageUpload}
                                                        className="hidden"
                                                        id="image-replace"
                                                    />
                                                    <label
                                                        htmlFor="image-replace"
                                                        className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer font-inter text-sm"
                                                    >
                                                        <Upload className="w-4 h-4" />
                                                        Replace Image
                                                    </label>
                                                </div>

                                                {/* Remove Image */}
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveImage}
                                                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-inter text-sm"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="block text-sm font-medium text-foreground font-inter">
                                            Measurement Fields
                                        </label>
                                        <button
                                            type="button"
                                            onClick={addMeasurementField}
                                            className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 font-inter"
                                        >
                                            + Add Field
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {measurementFields.map((field, index) => (
                                            <div key={field.id} className="flex gap-3 items-start">
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        value={field.name}
                                                        onChange={(e) =>
                                                            updateMeasurementField(field.id, 'name', e.target.value)
                                                        }
                                                        placeholder="Field name (e.g., Chest, Waist)"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-inter"
                                                    />
                                                </div>
                                                <select
                                                    value={field.unit}
                                                    onChange={(e) =>
                                                        updateMeasurementField(field.id, 'unit', e.target.value)
                                                    }
                                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-inter"
                                                >
                                                    <option value="cm">cm</option>
                                                    <option value="inch">inch</option>
                                                    <option value="m">m</option>
                                                </select>
                                                {measurementFields.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeMeasurementField(field.id)}
                                                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-inter"
                                    >
                                        {editingGarment ? 'Update Template' : 'Create Template'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={cancelForm}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-inter"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {/* Templates List */}
                    {garments.length === 0 ? (
                        <div className="text-center py-12">
                            <Ruler className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-foreground-muted font-inter">No garment templates yet</p>
                            <p className="text-sm text-foreground-muted font-inter mt-1">
                                Create your first template to get started
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {garments.map((garment) => (
                                <motion.div
                                    key={garment.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-playfair text-lg text-foreground">
                                            {garment.name}
                                        </h3>
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => handleEdit(garment)}
                                                className="p-1.5 hover:bg-blue-50 text-blue-600 rounded transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(garment.id)}
                                                className="p-1.5 hover:bg-red-50 text-red-600 rounded transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-foreground-muted font-inter mb-2">
                                            {garment.measurementFields.length} measurement{garment.measurementFields.length !== 1 ? 's' : ''}
                                        </p>
                                        {garment.measurementFields.map((field, idx) => (
                                            <div
                                                key={idx}
                                                className="flex justify-between text-xs bg-gray-50 px-2 py-1 rounded font-inter"
                                            >
                                                <span>{field.name}</span>
                                                <span className="text-foreground-muted">({field.unit})</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
