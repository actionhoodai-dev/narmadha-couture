# 🔐 Creating Your Admin User

## Quick Steps to Create Admin User

### Step 1: Go to Firebase Console
Visit: https://console.firebase.google.com/

### Step 2: Select Your Project
Click on: **narmatha-fashion-home**

### Step 3: Enable Email/Password Authentication (if not already done)
1. Click **Authentication** in the left sidebar
2. Click **Get Started** (if you see it)
3. Click **Sign-in method** tab
4. Click on **Email/Password**
5. Toggle **Enable** ON
6. Click **Save**

### Step 4: Create Your Admin User
1. Click **Users** tab (top of the page)
2. Click **Add User** button
3. Enter the following:
   - **Email:** `narmathafashionhome@gmail.com`
   - **Password:** `ALLISWELL`
4. Click **Add User**

### Step 5: Verify User Created
You should see the user in the list with:
- Email: narmathafashionhome@gmail.com
- User UID: (some random ID)
- Created: Just now

### Step 6: Test Login
1. Go to: http://localhost:8080/admin/login
2. Enter:
   - Email: `narmathafashionhome@gmail.com`
   - Password: `ALLISWELL`
3. Click **Sign In**

You should now be logged in and redirected to the dashboard! ✅

---

## ⚠️ Important Notes

- The password is case-sensitive: `ALLISWELL` (all caps)
- Make sure you're on the correct Firebase project: **narmatha-fashion-home**
- Email/Password authentication must be enabled in Firebase Console

---

## 🆘 Troubleshooting

### If you still can't login:

1. **Check Firebase Console:**
   - Verify the user exists in Authentication > Users
   - Verify Email/Password is enabled in Sign-in method

2. **Check Browser Console:**
   - Open DevTools (F12)
   - Look for any Firebase errors
   - Share the error message if you see one

3. **Check Environment Variables:**
   - Verify `.env.local` has correct Firebase config
   - Restart dev server after any changes

---

## 📸 Visual Guide

### Firebase Console Path:
```
Firebase Console
  └─ narmatha-fashion-home (Your Project)
      └─ Authentication
          ├─ Sign-in method (Enable Email/Password)
          └─ Users (Add User Here)
```

### What the "Add User" form looks like:
```
┌────────────────────────────────┐
│   Add User                     │
├────────────────────────────────┤
│                                │
│  Email                         │
│  ┌──────────────────────────┐ │
│  │narmathafashionhome@gmail │ │
│  │.com                      │ │
│  └──────────────────────────┘ │
│                                │
│  Password                      │
│  ┌──────────────────────────┐ │
│  │ALLISWELL                 │ │
│  └──────────────────────────┘ │
│                                │
│          [Add User]            │
│                                │
└────────────────────────────────┘
```

---

## ✅ After Creating User

Once the user is created, you can:
1. Login at `/admin/login`
2. Access the dashboard
3. Create garment templates
4. View orders and inquiries

The system is ready to use!
