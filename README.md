# 📝 Personal Blog Application

A modern, SEO-optimized blog application built with Next.js 15, featuring a dynamic admin panel, email subscriptions, and social media integration.

![Blog App Screenshot](./public/og-image.jpg)

## ✨ Features

### 🚀 Core Features

- **Modern Tech Stack**: Built with Next.js 15 App Router, React 19, and MongoDB
- **SEO Optimized**: Dynamic metadata, sitemaps, robots.txt, and Open Graph tags
- **Admin Panel**: Complete CRUD operations for blog management
- **Email Subscriptions**: Newsletter system with email notifications
- **Social Sharing**: Share posts on Facebook, Twitter, LinkedIn
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Image Optimization**: Next.js Image component with lazy loading
- **Fast Performance**: Server-side rendering with optimized database connections

### 🔒 Security Features

- **OTP Authentication**: Secure admin login with email-based OTP
- **JWT Tokens**: Secure session management
- **Input Validation**: Protected against common vulnerabilities
- **Environment Variables**: Secure configuration management

### 📱 User Experience

- **Loading States**: Smooth page transitions with skeleton loading
- **Toast Notifications**: Real-time feedback for user actions
- **Dark Mode Support**: Theme-aware components
- **Typography**: Beautiful typography with Inter font family

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + OTP via email
- **Email Service**: Nodemailer with Gmail SMTP
- **Styling**: Tailwind CSS with custom components
- **Icons**: React Icons
- **Package Manager**: pnpm
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js**: Version 18.17 or later
- **pnpm**: Package manager (recommended)
- **MongoDB**: Database (local or MongoDB Atlas)
- **Gmail Account**: For email services

### Installing pnpm

```bash
npm install -g pnpm
# or
corepack enable
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/blog-app.git
cd blog-app
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-app?retryWrites=true&w=majority

# Admin Configuration
ADMIN_EMAIL=your-admin@gmail.com
JWT_SECRET=your-super-secret-jwt-key

# Email Configuration
EMAIL=your-gmail@gmail.com
EMAIL_PASSWORD=your-gmail-app-password

# Application URLs
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Google Search Console (optional)
GOOGLE_VERIFICATION=your-google-verification-code

# Message Queue (optional)
RABBITMQ_URL=your-rabbitmq-url
```

### 4. Database Setup

Make sure MongoDB is running and accessible via your `MONGO_URI`.

### 5. Gmail App Password Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password for "Mail"
3. Use this app password in the `EMAIL_PASSWORD` field

### 6. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
blog-app/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin panel pages
│   │   ├── add-product/          # Add new blog post
│   │   ├── subscriptions/        # Manage subscriptions
│   │   └── update/               # Update/delete posts
│   ├── api/                      # API routes
│   │   ├── admin/                # Admin authentication
│   │   ├── blog/                 # Blog CRUD operations
│   │   └── email/                # Email services
│   ├── blogs/                    # Dynamic blog pages
│   │   └── [id]/                 # Individual blog post
│   ├── globals.css               # Global styles
│   ├── layout.js                 # Root layout
│   ├── loading.js                # Global loading component
│   ├── page.js                   # Homepage
│   ├── robots.txt                # SEO robots file
│   └── sitemap.xml               # Dynamic sitemap
├── components/                   # React components
│   ├── AdminComponents/          # Admin-specific components
│   ├── BlogCard.jsx             # Blog card component
│   ├── BlogList.jsx             # Blog listing
│   ├── Footer.jsx               # Footer component
│   ├── Header.jsx               # Header component
│   ├── Markdown.jsx             # Markdown renderer
│   └── ShareButtons.jsx         # Social sharing
├── lib/                         # Utility libraries
│   ├── config/                  # Database and models
│   │   ├── db.js               # MongoDB connection
│   │   └── models/             # Mongoose models
│   └── utils/                   # Helper functions
├── public/                      # Static assets
│   ├── favicon.ico
│   ├── og-image.jpg
│   └── manifest.json
├── assets/                      # Application assets
├── .env                        # Environment variables
├── next.config.mjs             # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── package.json                # Dependencies
└── README.md                   # This file
```

## 🎯 Available Scripts

```bash
# Development
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Package Management
pnpm add <package>     # Add dependency
pnpm add -D <package>  # Add dev dependency
pnpm remove <package>  # Remove dependency
pnpm update           # Update all dependencies
```

## 🔧 Configuration

### Database Models

The application uses the following MongoDB collections:

- **blogs**: Blog posts with title, content, images, and metadata
- **emails**: Email subscriptions for newsletter

### API Endpoints

- `GET /api/blog` - Fetch all blog posts
- `POST /api/blog` - Create new blog post
- `DELETE /api/blog` - Delete blog post
- `POST /api/email` - Subscribe to newsletter
- `GET /api/email` - Get all subscribers (admin only)
- `POST /api/admin/login` - Admin login with OTP
- `POST /api/admin/verifyotp` - Verify OTP and authenticate

### Environment Variables Explained

| Variable               | Description                        | Required |
| ---------------------- | ---------------------------------- | -------- |
| `MONGO_URI`            | MongoDB connection string          | ✅       |
| `ADMIN_EMAIL`          | Admin email for authentication     | ✅       |
| `JWT_SECRET`           | Secret key for JWT tokens          | ✅       |
| `EMAIL`                | Gmail address for sending emails   | ✅       |
| `EMAIL_PASSWORD`       | Gmail app password                 | ✅       |
| `NEXT_PUBLIC_BASE_URL` | Base URL for the application       | ✅       |
| `GOOGLE_VERIFICATION`  | Google Search Console verification | ❌       |
| `RABBITMQ_URL`         | Message queue URL                  | ❌       |

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. **Connect Repository**:

   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository

2. **Configure Environment Variables**:

   - Add all environment variables from your `.env` file
   - Update `NEXT_PUBLIC_BASE_URL` to your production domain

3. **Deploy**:
   - Vercel will automatically build and deploy your application

### Deploy on Other Platforms

For other platforms (Netlify, Railway, etc.), ensure:

- Node.js 18+ support
- Environment variables are properly configured
- MongoDB is accessible from the deployment platform

## 🎨 Customization

### Styling

The application uses Tailwind CSS. To customize:

1. **Colors**: Edit `tailwind.config.js`
2. **Fonts**: Update font imports in `app/layout.js`
3. **Components**: Modify components in the `components/` directory

### Adding New Features

1. **New Pages**: Add to the `app/` directory
2. **API Routes**: Add to `app/api/`
3. **Components**: Add to `components/`
4. **Database Models**: Add to `lib/config/models/`

## 🔍 SEO Features

- **Dynamic Metadata**: Each blog post has unique meta tags
- **Open Graph**: Rich social media previews
- **Twitter Cards**: Enhanced Twitter sharing
- **Sitemap**: Auto-generated XML sitemap
- **Robots.txt**: Search engine crawling instructions
- **Structured Data**: JSON-LD for rich snippets

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:

   ```bash
   # Check your MONGO_URI format
   mongodb+srv://username:password@cluster.mongodb.net/database-name
   ```

2. **Email Not Sending**:

   ```bash
   # Ensure Gmail app password is correct
   # Enable 2-factor authentication first
   ```

3. **Build Errors**:
   ```bash
   # Clear Next.js cache
   rm -rf .next
   pnpm build
   ```

### Performance Optimization

- Images are automatically optimized by Next.js
- Database connections are cached
- Static assets are served from CDN when deployed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rudresh H Vyas**

- Website: [blog.rhv1501.me](https://blog.rhv1501.me)
- GitHub: [@rhv1501](https://github.com/rhv1501)
- Email: rhv4748@gmail.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [MongoDB](https://mongodb.com) - Database
- [Vercel](https://vercel.com) - Deployment platform

## 📈 Roadmap

- [ ] Comment system for blog posts
- [ ] Search functionality
- [ ] Tags and categories
- [ ] RSS feed
- [ ] Analytics dashboard
- [ ] Multi-author support
- [ ] Content scheduling
- [ ] Image upload to cloud storage

---

⭐ If you found this project helpful, please give it a star on GitHub!
