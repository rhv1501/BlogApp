# 📝 Personal Blog Application

A modern, SEO-optimized blog application built with Next.js 15, featuring AI-powered content generation, dynamic admin panel, email subscriptions, and social media integration.

![Featured](./public/og-image.png)

## ✨ Features

### 🚀 Core Features

- **Modern Tech Stack**: Built with Next.js 15 App Router, React 19, and MongoDB
- **AI Content Generation**: Powered by Google Gemini AI for automated blog writing
- **SEO Optimized**: Dynamic metadata, sitemaps, robots.txt, and Open Graph tags
- **Admin Panel**: Complete CRUD operations for blog management
- **Email Subscriptions**: Newsletter system with email notifications
- **Social Sharing**: Share posts on Facebook, Twitter, LinkedIn
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Image Storage**: Vercel Blob for optimized image hosting
- **Markdown Editor**: Rich markdown support with live preview
- **Fast Performance**: Server-side rendering with optimized database connections

### 🤖 AI-Powered Features

- **Smart Content Generation**: Generate high-quality blog posts using Google Gemini AI
- **Markdown Output**: AI generates properly formatted markdown content
- **Topic Suggestions**: AI can create content from brief ideas or generate trending topics
- **Content Polishing**: Automatic formatting and structure optimization

### 🔒 Security Features

- **OTP Authentication**: Secure admin login with email-based OTP
- **JWT Tokens**: Secure session management with Jose library
- **Input Validation**: Protected against common vulnerabilities
- **Environment Variables**: Secure configuration management

### 📱 User Experience

- **Skeleton Loading**: Smooth page transitions with skeleton components
- **Toast Notifications**: Real-time feedback with react-toastify
- **Markdown Preview**: Live preview while writing blog posts
- **Responsive Admin**: Mobile-friendly admin dashboard
- **Typography**: Beautiful typography with Outfit font family

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose ODM
- **AI**: Google Generative AI (Gemini)
- **Authentication**: JWT (Jose) + OTP via email
- **Email Service**: Nodemailer with Gmail SMTP
- **File Storage**: Vercel Blob for images
- **Styling**: Tailwind CSS 4 with @tailwindcss/typography
- **Markdown**: React Markdown with syntax highlighting
- **Icons**: React Icons
- **Notifications**: React Toastify
- **Package Manager**: pnpm
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js**: Version 18.17 or later
- **pnpm**: Package manager (recommended)
- **MongoDB**: Database (local or MongoDB Atlas)
- **Gmail Account**: For email services
- **Google AI API Key**: For AI content generation
- **Vercel Account**: For blob storage (optional but recommended)

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

# AI Configuration
GOOGLE_GENAI_API_KEY=your-google-ai-api-key

# File Storage
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token

# Google Search Console (optional)
GOOGLE_VERIFICATION=your-google-verification-code

# Message Queue (optional)
RABBITMQ_URL=your-rabbitmq-url
```

### 4. Database Setup

Make sure MongoDB is running and accessible via your `MONGO_URI`.

### 5. AI Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file as `GOOGLE_GENAI_API_KEY`

### 6. Gmail App Password Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password for "Mail"
3. Use this app password in the `EMAIL_PASSWORD` field

### 7. Vercel Blob Setup (Optional)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Create a new blob store
3. Copy the read/write token to `BLOB_READ_WRITE_TOKEN`

### 8. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
blog-app/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin panel pages
│   │   ├── addProduct/          # Add new blog post
│   │   ├── blogList/            # Manage blog posts
│   │   ├── subscriptions/       # Manage subscriptions
│   │   └── update/              # Update/delete posts
│   ├── api/                      # API routes
│   │   ├── admin/               # Admin authentication
│   │   │   ├── sendotp/         # Send OTP endpoint
│   │   │   └── verifyotp/       # Verify OTP endpoint
│   │   ├── ai/                  # AI content generation
│   │   │   └── generateBlog/    # AI blog generation endpoint
│   │   ├── blog/                # Blog CRUD operations
│   │   └── email/               # Email services
│   ├── blogs/                   # Dynamic blog pages
│   │   └── [id]/                # Individual blog post
│   ├── login/                   # Authentication pages
│   │   └── admin/               # Admin login
│   ├── globals.css              # Global styles
│   ├── layout.js                # Root layout
│   ├── loading.js               # Global loading component
│   ├── not-found.js             # 404 page
│   ├── page.js                  # Homepage
│   ├── robots.js                # SEO robots file
│   └── sitemap.js               # Dynamic sitemap
├── components/                   # React components
│   ├── AdminComponents/          # Admin-specific components
│   │   ├── AddBlog.jsx          # Add blog form with AI
│   │   ├── Bloglist.jsx         # Admin blog listing
│   │   ├── BlogtableItem.jsx    # Blog table row
│   │   ├── Dashboard.jsx        # Admin dashboard
│   │   ├── Sidebar.jsx          # Admin sidebar
│   │   └── UpdateBlog.jsx       # Update blog form
│   ├── Blogitem.jsx             # Blog card component
│   ├── Bloglist.jsx             # Blog listing with skeleton
│   ├── Breadcrumbs.jsx          # Navigation breadcrumbs
│   ├── EditModal.jsx            # Quick edit modal
│   ├── Footer.jsx               # Footer component
│   ├── Header.jsx               # Header component
│   ├── Markdown.jsx             # Markdown renderer
│   └── ShareButtons.jsx         # Social sharing
├── lib/                         # Utility libraries
│   ├── config/                  # Database and models
│   │   ├── db.js               # MongoDB connection
│   │   └── models/             # Mongoose models
│   │       ├── blogModel.js    # Blog schema
│   │       └── EmailModel.js   # Email schema
│   └── utils/                   # Helper functions
│       ├── blob.js             # Vercel Blob utilities
│       ├── getExcerpt.js       # Text excerpt utility
│       ├── jwt.js              # JWT utilities
│       ├── mailer.js           # Email utilities
│       ├── otpstore.js         # OTP storage
│       └── Rabbit.js           # Message queue (optional)
├── public/                      # Static assets
│   ├── favicon.ico
│   ├── og-image.png
│   ├── author.png
│   └── manifest.json
├── assets/                      # Application assets
│   └── assets.js               # Asset exports
├── .env                        # Environment variables
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── middleware.js               # Next.js middleware
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

#### Blog Management

- `GET /api/blog` - Fetch all blog posts
- `POST /api/blog` - Create new blog post
- `PUT /api/blog?id=` - Update blog post
- `DELETE /api/blog?id=` - Delete blog post

#### AI Content Generation

- `POST /api/ai/generateBlog` - Generate blog content using AI

#### Authentication

- `POST /api/admin/sendotp` - Send OTP to admin email
- `POST /api/admin/verifyotp` - Verify OTP and authenticate

#### Email Management

- `POST /api/email` - Subscribe to newsletter
- `GET /api/email` - Get all subscribers (admin only)

### Environment Variables Explained

| Variable                | Description                        | Required |
| ----------------------- | ---------------------------------- | -------- |
| `MONGO_URI`             | MongoDB connection string          | ✅       |
| `ADMIN_EMAIL`           | Admin email for authentication     | ✅       |
| `JWT_SECRET`            | Secret key for JWT tokens          | ✅       |
| `EMAIL`                 | Gmail address for sending emails   | ✅       |
| `EMAIL_PASSWORD`        | Gmail app password                 | ✅       |
| `NEXT_PUBLIC_BASE_URL`  | Base URL for the application       | ✅       |
| `GOOGLE_GENAI_API_KEY`  | Google Generative AI API key       | ✅       |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token          | ❌       |
| `GOOGLE_VERIFICATION`   | Google Search Console verification | ❌       |
| `RABBITMQ_URL`          | Message queue URL                  | ❌       |

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

The application uses Tailwind CSS 4. To customize:

1. **Colors**: Edit `tailwind.config.js`
2. **Fonts**: Update font imports in `app/layout.js` (currently using Outfit)
3. **Components**: Modify components in the `components/` directory

### Adding New Features

1. **New Pages**: Add to the `app/` directory
2. **API Routes**: Add to `app/api/`
3. **Components**: Add to `components/`
4. **Database Models**: Add to `lib/config/models/`
5. **AI Prompts**: Modify system prompts in `app/api/ai/generateBlog/route.js`

### Markdown Customization

The markdown renderer in `components/Markdown.jsx` supports:

- Syntax highlighting with highlight.js
- GitHub Flavored Markdown
- Custom HTML elements
- Embedded videos and images

## 🔍 SEO Features

- **Dynamic Metadata**: Each blog post has unique meta tags with `metadataBase`
- **Open Graph**: Rich social media previews for all pages
- **Twitter Cards**: Enhanced Twitter sharing with large images
- **Sitemap**: Auto-generated XML sitemap (`app/sitemap.js`)
- **Robots.txt**: Search engine crawling instructions (`app/robots.js`)
- **Structured Data**: JSON-LD for rich snippets
- **Semantic HTML**: Proper heading hierarchy and article structure
- **Image Optimization**: Next.js Image component with proper alt tags

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

3. **AI Generation Not Working**:

   ```bash
   # Check your Google AI API key
   # Ensure you have API quota available
   # Check console logs for specific error messages
   ```

4. **Image Upload Failing**:

   ```bash
   # Verify Vercel Blob token is correct
   # Check file size limits
   # Ensure proper file format (jpg, png, webp)
   ```

5. **Build Errors**:
   ```bash
   # Clear Next.js cache
   rm -rf .next
   pnpm build
   ```

### Performance Optimization

- Images are automatically optimized by Next.js and stored in Vercel Blob
- Database connections are cached and reused
- Static assets are served from CDN when deployed
- Skeleton loading improves perceived performance
- AI responses are cached client-side during generation

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
- [Vercel](https://vercel.com) - Deployment platform and blob storage
- [Google AI](https://ai.google.dev/) - Generative AI for content creation
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering
- [Highlight.js](https://highlightjs.org/) - Syntax highlighting

## 📈 Roadmap

- [x] AI-powered content generation
- [x] Vercel Blob image storage
- [x] Markdown editor with preview
- [x] Skeleton loading components
- [ ] Comment system for blog posts
- [ ] Search functionality with AI
- [ ] Tags and categories system
- [ ] RSS feed generation
- [ ] Analytics dashboard
- [ ] Multi-author support
- [ ] Content scheduling
- [ ] Dark mode theme
- [ ] Advanced AI features (image generation, SEO optimization)
- [ ] Mobile app (React Native)

---

⭐ If you found this project helpful, please give it a star on GitHub!
