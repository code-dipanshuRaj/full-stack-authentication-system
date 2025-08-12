# Next.js Full Stack Authentication Template

A modern, production-ready authentication template built with **Next.js 14 App Router**, **MongoDB**, and **Tailwind CSS**.  
Includes user registration, login, email verification, password reset, protected routes, and JWT-based authentication.

---

## ✨ Features

- **User Signup & Login**  
  Secure registration and login with hashed passwords and JWT cookies.

- **Email Verification**  
  Users must verify their email before accessing protected routes.

- **Forgot & Reset Password**  
  Send password reset links via email and securely update passwords.

- **Protected Routes**  
  Middleware-based route protection using JWT cookies.

- **Profile Page**  
  View user details and logout functionality.

- **Responsive UI**  
  Styled with Tailwind CSS for a modern, mobile-friendly experience.

---

## 🗂️ Project Structure

```
src/
  app/
    api/
      users/
        signup/           # Signup API route
        login/            # Login API route
        logout/           # Logout API route
        details/          # Get user details (protected)
        forgot-password/  # Forgot password API
        set-password/     # Set/reset password API
        verifyemail/      # Email verification API
    login/                # Login page
    signup/               # Signup page
    profile/              # Profile page
    forgot-password/      # Forgot password page
    set-password/         # Set/reset password page
    verifyemail/          # Email verification page
  db/
    connectDB.ts          # MongoDB connection logic
  helpers/
    mailer.ts             # Nodemailer email helper
    decodeToken.ts        # JWT decode helper
  models/
    user.model.js         # Mongoose User schema
  middleware.ts           # Route protection middleware
  globals.css             # Tailwind & global styles
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/nextjs-auth-template.git
cd nextjs-auth-template
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root with the following:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
domain=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛡️ Security Notes

- Passwords are hashed using **bcrypt** before storage.
- JWT tokens are stored in **httpOnly cookies** for security.
- All sensitive routes are protected by middleware.
- Email verification and password reset links are time-limited and securely generated.

---

## 📧 Email Setup

This template uses **Nodemailer** for sending emails.  
You can use [Mailtrap](https://mailtrap.io/) or any SMTP provider for development/testing.

---

## 📝 Customization

- Update the UI in `/src/app` pages as needed.
- Extend the user model in `/src/models/user.model.js` for more fields.
- Adjust middleware logic in `/src/middleware.ts` to fit your route protection needs.

---

## 🙏 Credits

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Nodemailer](https://nodemailer.com/)
