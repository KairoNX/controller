<div align="center">
  <h1>🎯 Zenus - Instagram Automation Platform</h1>
  <p><strong>Transform Your Instagram Engagement with AI-Powered Automation</strong></p>
  
  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#usage">Usage</a> •
    <a href="#deployment">Deployment</a>
  </p>

  ![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
</div>

---

## 📖 About

**Zenus** is a powerful Instagram automation platform that revolutionizes how you connect with your audience. Automate DM responses, reply to comments intelligently, and boost engagement effortlessly - turning interactions into valuable business opportunities.

Built with modern web technologies, Zenus provides a seamless experience for content creators, businesses, and influencers looking to scale their Instagram presence without sacrificing the personal touch.

---

## ✨ Features

### 🤖 **Smart Automation**
- **AI-Powered Responses**: Leverage OpenAI to generate contextually relevant replies
- **Keyword Triggers**: Set up custom keyword-based automation workflows
- **Auto-Reply to Comments**: Engage with your audience automatically
- **DM Automation**: Handle direct messages efficiently

### 📊 **Analytics & Insights**
- Track automation performance
- Monitor DM and comment counts
- Detailed engagement metrics

### 🔗 **Integrations**
- **Instagram Integration**: Seamless OAuth connection
- **Stripe Payment Processing**: Secure subscription management
- **Clerk Authentication**: Enterprise-grade user authentication

### 💎 **Subscription Plans**
- **Free Plan**: Perfect for getting started
  - Basic automation features
  - Comment reply automation
  - Target response engagement
  
- **Smart AI Plan ($99/month)**: Advanced features for power users
  - AI-powered response generation
  - Advanced analytics
  - Priority support
  - Custom branding options

### 🎨 **Modern UI/UX**
- Beautiful, responsive design
- Dark mode support
- Intuitive dashboard
- Real-time updates

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

### Backend
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **API**: Next.js API Routes
- **Authentication**: [Clerk](https://clerk.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **AI**: [OpenAI](https://openai.com/)

### Developer Tools
- **Package Manager**: npm/pnpm
- **Linting**: ESLint
- **Type Checking**: TypeScript

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** 18.x or higher
- **PostgreSQL** database
- **npm** or **pnpm**

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/zenus"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Instagram Integration
INSTAGRAM_CLIENT_ID=your_instagram_client_id
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret
INSTAGRAM_REDIRECT_URI=http://localhost:3000/callback/instagram

# OpenAI
OPENAI_API_KEY=sk-xxxxx

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Domain
NEXT_PUBLIC_APP_DOMAIN=zenus.space
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KairoNX/controller.git
   cd controller
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📱 Usage

### 1. **Sign Up / Sign In**
Create an account or sign in using Clerk authentication.

### 2. **Connect Instagram**
Navigate to integrations and connect your Instagram account via OAuth.

### 3. **Create Automation**
- Set up triggers (keywords, post interactions)
- Define actions (DM responses, comment replies)
- Configure AI-powered responses

### 4. **Activate & Monitor**
Activate your automation and monitor performance through the dashboard.

---

## 📂 Project Structure

```
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── public/                    # Static assets
├── src/
│   ├── actions/              # Server actions
│   │   ├── automations/      # Automation logic
│   │   ├── integrations/     # Integration handlers
│   │   ├── user/             # User management
│   │   └── webhook/          # Webhook handlers
│   ├── app/                  # Next.js app directory
│   │   ├── (auth)/           # Authentication routes
│   │   ├── (protected)/      # Protected routes
│   │   └── (website)/        # Public landing page
│   ├── components/           # React components
│   │   ├── global/           # Global components
│   │   └── ui/               # UI components
│   ├── constants/            # App constants
│   ├── hooks/                # Custom React hooks
│   ├── icons/                # SVG icons
│   ├── lib/                  # Utility libraries
│   ├── providers/            # Context providers
│   ├── redux/                # Redux store
│   └── types/                # TypeScript types
├── .env                      # Environment variables
├── package.json              # Dependencies
└── tailwind.config.ts        # Tailwind configuration
```

---

## 🔐 Security

- All sensitive API keys are stored in environment variables
- User authentication handled by Clerk
- Stripe webhook verification for payment security
- PostgreSQL with Prisma for SQL injection prevention

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Database Setup

Use a managed PostgreSQL service:
- [Supabase](https://supabase.com/)
- [Neon](https://neon.tech/)
- [Railway](https://railway.app/)
- [PlanetScale](https://planetscale.com/)

---

## 📝 Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run postinstall  # Generate Prisma client

# Linting
npm run lint         # Run ESLint
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 💬 Support

Need help? Have questions?

- 📧 Email: support@zenus.space
- 🐦 Twitter: [@ZenusSpace](https://twitter.com/ZenusSpace)
- 💬 Discord: [Join our community](https://discord.gg/zenus)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Vercel](https://vercel.com/) - Deployment Platform
- [Shadcn/ui](https://ui.shadcn.com/) - UI Component Library
- [Clerk](https://clerk.com/) - Authentication
- [Stripe](https://stripe.com/) - Payment Processing
- [OpenAI](https://openai.com/) - AI Capabilities

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/KairoNX">KairoNX</a></p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
