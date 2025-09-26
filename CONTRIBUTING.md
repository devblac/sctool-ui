# 🤝 Contributing to StarCraft Replay Analyzer Frontend

First off, thanks for taking the time to contribute! ❤️

We welcome all contributions, whether it's bug reports, feature requests, documentation improvements, or code contributions.

## 🚀 Quick Start

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/devblac/sctool-ui.git
   cd sctool-ui
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Create** a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
5. **Make** your changes and test them:
   ```bash
   npm run dev
   ```
6. **Commit** your changes:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
7. **Push** to your fork:
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open** a Pull Request on GitHub

## 📋 Development Guidelines

### Code Standards
- Follow the [Development Guidelines](docs/guidelines.md)
- Write clean, readable, and maintainable code
- Use TypeScript for all new code
- Follow Material-UI design patterns
- Write meaningful commit messages

### Commit Message Format
```
feat: add new chart component
fix: resolve Grid compatibility issue
docs: update component documentation
refactor: optimize chart rendering performance
style: fix component styling
test: add unit tests for analytics
```

### Branch Naming
- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/documentation-update` - Documentation changes
- `refactor/component-name` - Code refactoring
- `test/test-description` - Test additions

## 🐛 Reporting Bugs

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/devblac/sctool-ui/issues/new?template=bug_report.md).

**Great Bug Reports** tend to have:
- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## 💡 Feature Requests

Feature requests are welcome! Please provide:
- **Use case**: Describe the problem you're trying to solve
- **Proposed solution**: How you think it should work
- **Alternatives considered**: Other solutions you've considered
- **Additional context**: Screenshots, mockups, or examples

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Environment Configuration
1. Copy `.env.example` to `.env`
2. Update environment variables as needed
3. Install dependencies: `npm install`

### Running Tests
```bash
npm test          # Run tests in watch mode
npm run test:ci   # Run tests once for CI
```

### Building for Production
```bash
npm run build     # Build for production
npm run preview   # Preview production build
```

## 🎨 Design Contributions

### UI/UX Guidelines
- Follow Material Design principles
- Ensure responsive design works on all screen sizes
- Maintain accessibility standards (WCAG 2.1)
- Use consistent color schemes and typography

### Adding New Components
1. Create component in appropriate folder (`src/components/`)
2. Follow existing naming conventions
3. Add TypeScript interfaces
4. Include proper error handling
5. Write tests if applicable

## 📝 Documentation

### Updating Documentation
- Keep README.md up to date with new features
- Update inline code comments
- Add JSDoc comments for public APIs
- Update changelog for significant changes

### Adding Screenshots
- Add screenshots to README.md for new features
- Use consistent image sizes (800x400 recommended)
- Add alt text for accessibility
- Keep images in a dedicated folder

## 🔍 Code Review Process

All submissions require review. We'll do our best to provide constructive feedback and get your pull request merged quickly.

### What We Look For
- ✅ Code follows project style guidelines
- ✅ Tests pass (if applicable)
- ✅ No breaking changes
- ✅ Good commit messages
- ✅ Documentation updated

### Review Checklist
- [ ] Follows TypeScript best practices
- [ ] Uses proper React patterns
- [ ] Material-UI components used correctly
- [ ] Responsive design implemented
- [ ] Error handling included
- [ ] Performance considerations addressed

## 🏆 Recognition

Contributors will be recognized in:
- README.md acknowledgments section
- GitHub repository contributors
- Release notes
- Project documentation

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and general discussion
- **Email**: For private/sensitive matters

### Community Guidelines
- Be respectful and inclusive
- Use welcoming and inclusive language
- Be collaborative
- Focus on what is best for the community
- Show empathy towards other community members

## 🔐 Security Issues

If you discover a security vulnerability, please follow our [Security Policy](SECURITY.md).

**Do NOT** file a public issue. Instead, disclose it privately by:
1. Emailing the maintainers
2. Creating a private security advisory

## 🙏 Acknowledgments

Your contributions help make StarCraft Replay Analyzer better for everyone. Thank you for your time, expertise, and passion!

---

<div align="center">

**Happy contributing! 🚀**

</div>
