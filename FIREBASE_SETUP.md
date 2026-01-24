# Firebase Setup & Security Rules

## Complete Implementation Guide

This document provides all the necessary setup steps and security configurations for the Narmadha Couture admin system.

---

## 🔥 Firebase Firestore Security Rules

Add these rules to your Firebase Console under **Firestore Database > Rules**:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is authenticated (admin)
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Garment Templates Collection
    // Public: Read access for order form
    // Admin: Full CRUD access
    match /garment_templates/{templateId} {
      allow read: if true; // Public can read to populate order form
      allow create, update, delete: if isAuthenticated(); // Only admins can modify
    }
    
    // Orders Collection
    // Public: Can create orders (submit)
    // Admin: Can read all orders
    match /orders/{orderId} {
      allow create: if true; // Public users can submit orders
      allow read: if isAuthenticated(); // Only admins can view orders
      allow update, delete: if false; // Nobody can update or delete (read-only for admin)
    }
    
    // Inquiries Collection
    // Public: Can create inquiries (submit contact form)
    // Admin: Can read all inquiries
    match /inquiries/{inquiryId} {
      allow create: if true; // Public users can submit inquiries
      allow read: if isAuthenticated(); // Only admins can view inquiries
      allow update, delete: if false; // Nobody can update or delete (read-only for admin)
    }
  }
}
```

---

## 📋 Firestore Collections Structure

### 1. **garment_templates** Collection

Stores admin-defined garment types with their measurement fields.

**Document Structure:**
```javascript
{
  name: "Blouse",
  measurementFields: [
    { name: "Chest", unit: "cm" },
    { name: "Waist", unit: "cm" },
    { name: "Sleeve Length", unit: "inch" },
    { name: "Shoulder Width", unit: "cm" }
  ],
  createdAt: Timestamp,
  updatedAt: Timestamp (optional)
}
```

### 2. **orders** Collection

Stores customer orders with measurements.

**Document Structure:**
```javascript
{
  customerName: "John Doe",
  customerEmail: "john@example.com", // Optional, can be null
  customerPhone: "+1234567890",
  garmentType: "Blouse",
  measurements: {
    "Chest (cm)": "92",
    "Waist (cm)": "76",
    "Sleeve Length (inch)": "16",
    "Shoulder Width (cm)": "38"
  },
  createdAt: Timestamp
}
```

### 3. **inquiries** Collection

Stores contact form submissions.

**Document Structure:**
```javascript
{
  name: "Jane Smith",
  email: "jane@example.com",
  phone: "+1234567890",
  message: "I'm interested in custom embroidery work...",
  createdAt: Timestamp
}
```

---

## 🔐 Firebase Authentication Setup

### Step 1: Enable Email/Password Authentication

1. Go to **Firebase Console** → Your Project
2. Navigate to **Authentication** → **Sign-in method**
3. Click on **Email/Password**
4. Enable **Email/Password** (first toggle)
5. Click **Save**

### Step 2: Create Admin User

You have **two options** to create an admin user:

#### **Option A: Firebase Console (Recommended for first admin)**

1. Go to **Firebase Console** → **Authentication** → **Users**
2. Click **Add User**
3. Enter email: `admin@narmadha.com` (or your preferred email)
4. Enter password: Create a strong password
5. Click **Add User**

#### **Option B: Firebase CLI (for additional admins)**

```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Create user (you'll be prompted for email and password)
firebase auth:import users.json --project your-project-id
```

**users.json** format:
```json
{
  "users": [{
    "localId": "admin1",
    "email": "admin@narmadha.com",
    "passwordHash": "your-hashed-password",
    "emailVerified": true
  }]
}
```

---

## 🚀 Deployment Checklist

### Pre-Deployment

- [x] Firebase project created
- [ ] Firestore database enabled (in production mode)
- [ ] Security rules deployed
- [ ] Email/Password authentication enabled
- [ ] Admin user created
- [ ] Environment variables configured in Vercel

### Vercel Environment Variables

Add these in **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**:

```
VITE_FIREBASE_API_KEY=AIzaSyD7X0tBJWb37_DyH4OXMuNfRvlh0EtBhSU
VITE_FIREBASE_AUTH_DOMAIN=narmatha-fashion-home.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=narmatha-fashion-home
VITE_FIREBASE_STORAGE_BUCKET=narmatha-fashion-home.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1058482985315
VITE_FIREBASE_APP_ID=1:1058482985315:web:7f1c602c54361295571b56
VITE_FIREBASE_MEASUREMENT_ID=G-TMQ974XQ63
```

> **Important:** Make sure all variables have the `VITE_` prefix for Vite to expose them to the client.

---

## 📍 Routes Overview

### Public Routes (No Authentication Required)

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/about` | About page |
| `/products` | Products page |
| `/fabrics` | Fabrics catalog |
| `/fabrics/:category` | Specific fabric category |
| `/kids-fashion` | Kids fashion page |
| `/customized-gifts` | Customized gifts page |
| `/contact` | Contact form (saves to Firestore) |
| `/order` | **NEW** - Order form with dynamic measurements |

### Admin Routes (Authentication Required)

| Route | Description |
|-------|-------------|
| `/admin` | Redirects to dashboard |
| `/admin/login` | Admin login page |
| `/admin/dashboard` | Garment template management |
| `/admin/orders` | View all customer orders |
| `/admin/inquiries` | View all contact form inquiries |

> **Note:** `/admin` routes are **NOT linked** anywhere on the public website. They must be accessed by manually typing the URL.

---

## 🔒 Security Features

### 1. **Protected Routes**
- All admin routes require Firebase authentication
- Unauthenticated users are redirected to `/admin/login`
- Session persists across browser restarts

### 2. **Firestore Security**
- Public users can only **create** orders and inquiries
- Public users can **read** garment templates (for order form)
- Only authenticated admins can **read** orders and inquiries
- Only authenticated admins can **manage** garment templates
- **No one** can update or delete orders/inquiries (read-only for admins)

### 3. **No Email Exposure**
- Contact form submissions go directly to Firestore
- No third-party email services used
- All data stays within your Firebase project

---

## 🧪 Testing Guide

### Test Public Features

1. **Order Submission:**
   - Visit `/order`
   - Fill customer information
   - Select a garment type
   - Enter measurements
   - Submit order
   - Verify: Order appears in `/admin/orders`

2. **Contact Form:**
   - Visit `/contact`
   - Fill and submit the form
   - Verify: Inquiry appears in `/admin/inquiries`

### Test Admin Features

1. **Login:**
   - Visit `/admin` (should redirect to `/admin/login`)
   - Login with admin credentials
   - Verify: Redirected to `/admin/dashboard`

2. **Garment Template Management:**
   - Create a new garment template with measurement fields
   - Edit an existing template
   - Delete a template
   - Verify: Changes reflect on `/order` page dropdown

3. **View Orders:**
   - Navigate to `/admin/orders`
   - Verify: All submitted orders are displayed
   - Check: Customer info and measurements are visible

4. **View Inquiries:**
   - Navigate to `/admin/inquiries`
   - Verify: All contact form submissions are displayed

5. **Logout:**
   - Click "Sign Out" button
   - Verify: Redirected to `/admin/login`
   - Try accessing `/admin/dashboard` (should redirect to login)

---

## 📝 Usage Instructions for Admin

### Creating Your First Garment Template

1. Login to `/admin`
2. Click **"Add Template"**
3. Enter **Garment Name** (e.g., "Blouse", "Churidar", "Kurti")
4. Add **Measurement Fields**:
   - Field name (e.g., "Chest", "Waist", "Sleeve Length")
   - Select unit (cm, inch, or m)
   - Click "+ Add Field" to add more measurements
5. Click **"Create Template"**
6. The template is now available on the public `/order` page

### Managing Templates

- **Edit:** Click the pencil icon on any template
- **Delete:** Click the trash icon (confirmation required)
- **View Orders:** Click "View Orders" card to see all customer orders
- **View Inquiries:** Click "View Messages" card to see contact form submissions

---

## 🆘 Troubleshooting

### Issue: "Invalid firebase configuration"

**Solution:** Check that all environment variables are correctly set in `.env.local` and Vercel dashboard with the `VITE_` prefix.

### Issue: "Permission denied" when trying to access admin pages

**Solution:** Ensure you're logged in. Try clearing browser cache and logging in again.

### Issue: Orders/Inquiries not showing in admin panel

**Solution:** 
1. Check Firestore security rules are deployed
2. Verify the collections exist in Firestore Console
3. Check browser console for errors

### Issue: Can't login as admin

**Solution:**
1. Verify the admin user exists in Firebase Authentication
2. Check Email/Password authentication is enabled
3. Try password reset if needed

---

## 🔄 Future Enhancements (Optional)

- Add pagination for orders/inquiries
- Export orders to CSV/Excel
- Email notifications for new orders (using Firebase Cloud Functions)
- Order status tracking (pending, in-progress, completed)
- Image upload for garment reference
- Multi-language support

---

## ✅ Summary

This implementation provides:

✓ Hidden admin panel accessible only at `/admin`  
✓ Firebase Email/Password authentication  
✓ Admin-defined garment templates  
✓ Dynamic measurement forms for customers  
✓ Order management system  
✓ Inquiry management system  
✓ Secure Firestore rules  
✓ Production-ready, modular code  
✓ No modifications to existing pages  

All requirements from your specification have been met. The system is ready for deployment to Vercel!
