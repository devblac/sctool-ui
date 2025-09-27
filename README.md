# 🎮 StarCraft Replay Analyzer Frontend

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-7.3.2-blue.svg)](https://mui.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-purple.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, fast, and intuitive web interface for analyzing StarCraft replay files. Built with React, Material-UI, and Vite for optimal performance and developer experience.

## ✨ Features

- **📊 Comprehensive Analytics Dashboard**: Visual charts and insights from your replay data
- **🎯 Performance Tracking**: Win rates, APM, game duration analysis, and strategic insights
- **🗺️ Map Analysis**: Popular map statistics and matchup distributions
- **⚙️ Advanced Configuration**: Customizable analysis settings and replay directory management
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🚀 Modern Tech Stack**: Built with React 19, TypeScript, and Material-UI v7

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- StarCraft replay files (from StarCraft: Remastered or similar)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/devblac/sctool-ui
   cd sctool-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run start` - Alias for `npm run dev`

## 📋 Project Structure

```
sctool-ui/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Charts.tsx     # Chart components
│   │   └── ErrorBoundary.tsx
│   ├── pages/             # Page-level components
│   │   ├── Dashboard.tsx  # Main dashboard
│   │   ├── Analytics.tsx  # Analytics page
│   │   └── Settings.tsx   # Configuration page
│   ├── services/          # API and external services
│   └── App.tsx            # Main application component
├── docs/                  # Documentation
├── vite.config.ts         # Vite configuration
└── package.json           # Dependencies and scripts
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api

# Application Settings
VITE_APP_NAME=StarCraft Replay Analyzer
VITE_APP_VERSION=1.0.0
```

### Replay Directory Setup

1. Open the Settings page in the application
2. Configure your replay directory path
3. Enable recursive search if needed
4. Select analyzers for your analysis
5. Run analysis to generate data

## 🎨 Tech Stack

### Frontend Framework
- **React 19.1.1** - Modern React with concurrent features
- **TypeScript 4.9.5** - Type safety and better developer experience
- **Vite 7.1.7** - Lightning-fast build tool and dev server

### UI Components
- **Material-UI 7.3.2** - Modern Material Design components
- **Recharts 3.2.1** - Beautiful, responsive charts
- **React Router 7.9.2** - Client-side routing

### Development Tools
- **Vitest** - Fast unit testing
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting

## 📊 Screenshots

*Dashboard Overview*
![Dashboard](https://via.placeholder.com/800x400/1976d2/ffffff?text=Dashboard+Overview)

*Analytics Page*
![Analytics](https://via.placeholder.com/800x400/388e3c/ffffff?text=Analytics+Page)

*Settings Configuration*
![Settings](https://via.placeholder.com/800x400/f57c00/ffffff?text=Settings+Page)

## 🚀 Deployment

### GitHub Pages (Automated)
🚀 **Automatic deployment** on every push to main branch!

Your app is available at: `https://devblac.github.io/sctool-ui/`

**Features:**
- ✅ **Auto-deployment** via GitHub Actions (every push to main)
- ✅ **CDN delivery** for fast loading
- ✅ **Mock data demo** (frontend-only)
- ✅ **Mobile responsive** design
- ✅ **Build optimization** with code splitting

**Manual deployment** (if needed):
```bash
npm run deploy
```

### Other Platforms
See our [Deployment Guide](docs/DEPLOYMENT.md) for Docker, Vercel, Netlify, and other hosting options.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Documentation

- [Development Guidelines](docs/guidelines.md) - Coding standards and best practices
- [Frontend Integration Guide](FRONTEND_INTEGRATION_GUIDE.md) - Integration documentation
- [API Documentation](API.md) - Backend API reference
- [Deployment Guide](docs/DEPLOYMENT.md) - Hosting and deployment instructions
- [GitHub Actions Workflow](.github/workflows/deploy.yml) - Automated deployment configuration

## 🐛 Issues and Support

- **Bug Reports**: [GitHub Issues](https://github.com/devblac/sctool-ui/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/devblac/sctool-ui/discussions)
- **Questions**: [GitHub Discussions](https://github.com/devblac/sctool-ui/discussions)

## 📜 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **StarCraft Community** for their passion and dedication
- **Material-UI Team** for the amazing component library
- **React Team** for the powerful framework
- **Vite Team** for the blazing-fast build tool

## 🔗 Related Projects

- [SCTool CLI](https://github.com/marianogappa/sctool) - Command-line tool for replay analysis

---

<div align="center">

**Built with ❤️ for the StarCraft community**

[⭐ Star on GitHub](https://github.com/devblac/sctool-ui) • [🐛 Report Bug](https://github.com/devblac/sctool-ui/issues) • [💬 Discussions](https://github.com/devblac/sctool-ui/discussions)

</div>
