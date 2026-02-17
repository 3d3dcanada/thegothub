# OpenSource Hub

<p align="center">
  <img src="https://img.shields.io/github/stars/3d3dcanada/thegothub" alt="Stars">
  <img src="https://img.shields.io/github/license/3d3dcanada/thegothub" alt="License">
  <img src="https://img.shields.io/github/actions/workflow/status/3d3dcanada/thegothub/ci" alt="CI">
</p>

A modern, high-performance web application for discovering and exploring open source projects from multiple platforms. Browse trending projects, search repositories, view READMEs, and discover new open source software.

## ✨ Features

- 🔍 **Universal Search** - Search across all indexed open source projects
- 📊 **Project Metadata** - Stars, forks, description, license, language stats
- 🏷️ **Category Browsing** - Browse by language, framework, category
- 📈 **Trending/Popular** - Discover trending and popular projects
- 📁 **Project Details** - View file structure, README, and contributors
- 🎨 **Dark/Light Mode** - Beautiful theme switching with system preference detection
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/3d3dcanada/thegothub)

### Prerequisites

1. **GitHub Account** - You need a GitHub account to authorize Vercel
2. **GitHub Personal Access Token** - [Create one here](https://github.com/settings/tokens) with `public_repo` scope
3. **PostgreSQL Database** - Vercel Postgres or any PostgreSQL provider

### Deployment Steps

1. **Fork or Clone this Repository**
   ```bash
   git clone https://github.com/3d3dcanada/thegothub.git
   cd thegothub
   ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   
   In the Vercel project settings, add these environment variables:
   
   | Variable | Description | Required |
   |----------|-------------|----------|
   | `DATABASE_URL` | PostgreSQL connection string | Yes |
   | `GITHUB_TOKEN` | GitHub Personal Access Token | No* |
   | `SOFTWARE_HERITAGE_TOKEN` | Software Heritage API Token | No |
   
   *Without GITHUB_TOKEN, the app will use unauthenticated API calls (rate limited)

4. **Set Up Database**
   
   For Vercel Postgres:
   - Go to "Storage" → "Create Database" → "Postgres"
   - Copy the connection string to `DATABASE_URL`

5. **Deploy**
   - Click "Deploy" and wait for the build to complete
   - Your app is live at `https://your-project.vercel.app`

## 🛠️ Local Development

### Prerequisites

- Node.js 20+
- PostgreSQL database (local or hosted)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/3d3dcanada/thegothub.git
cd thegothub

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Edit .env.local with your configuration
# Required: Set DATABASE_URL to your PostgreSQL connection
# Optional: Set GITHUB_TOKEN for higher API rate limits

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── prisma/                 # Database schema and migrations
│   └── schema.prisma      # Prisma schema definition
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/          # API routes
│   │   │   ├── cache/    # Cache management
│   │   │   ├── featured/ # Featured projects
│   │   │   ├── free-to-use/  # Free software projects
│   │   │   ├── github/   # GitHub API proxies
│   │   │   └── projects/ # Project data
│   │   ├── project/      # Project detail pages
│   │   ├── search/       # Search page
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # React components
│   │   ├── layout/       # Header, footer, theme toggle
│   │   ├── project/      # Project cards, details, README viewer
│   │   ├── search/       # Search autocomplete
│   │   └── ui/           # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   │   ├── github.ts     # GitHub API client
│   │   ├── prisma.ts     # Prisma client
│   │   └── utils.ts      # General utilities
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
│   └── kofi-button.png  # Ko-fi donation button
├── .env.example          # Environment variables template
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:studio` | Open Prisma Studio |

## 🔐 Security

- **Environment Variables**: Never commit secrets to GitHub
- **.env Files**: Use `.env.local` for local development (already in `.gitignore`)
- **Vercel Secrets**: Add sensitive data via Vercel Dashboard
- **GitHub Token**: Use a token with minimal scopes needed

See [SECURITY.md](SECURITY.md) for the security policy and vulnerability reporting guidelines.

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) before submitting pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for project data
- [Software Heritage](https://www.softwareheritage.org/) for archive downloads
- [Vercel](https://vercel.com) for hosting and deployment
- All the open source projects featured in this app

---

<p align="center">Made with ❤️ by <a href="https://github.com/3d3dcanada">3d3dcanada</a></p>
