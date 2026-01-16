# 🤝 Contributing to HSC Productions

Thank you for your interest in contributing to HSC Productions! This guide will help you get started.

## **📋 Table of Contents**
1. [Getting Started](#getting-started)
2. [Development Setup](#development-setup)
3. [Content Management](#content-management)
4. [Code Guidelines](#code-guidelines)
5. [Testing](#testing)
6. [Submitting Changes](#submitting-changes)
7. [Bug Reports](#bug-reports)
8. [Feature Requests](#feature-requests)

---

## **🚀 Getting Started**

### **Prerequisites**
- **Node.js 18+** - Latest LTS version recommended
- **npm or yarn** - Package manager
- **Git** - Version control
- **VS Code** - Recommended IDE with extensions

### **Recommended VS Code Extensions**
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

---

## **⚙️ Development Setup**

### **1. Clone Repository**
```bash
git clone https://github.com/idongCodes/hscprod.git
cd hscprod
```

### **2. Install Dependencies**
```bash
npm install
# or
yarn install
```

### **3. Environment Setup**
```bash
# Copy environment template
cp .env.example .env.local

# Add your environment variables
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### **4. Start Development Server**
```bash
npm run dev
```

### **5. Verify Setup**
Open [http://localhost:3000](http://localhost:3000) and ensure:
- ✅ Homepage loads correctly
- ✅ Gallery displays images/videos
- ✅ Media page shows audio tracks
- ✅ About page displays correctly

---

## **📁 Content Management**

### **Adding New Content**

#### **Gallery Images/Videos**
```bash
# Add to appropriate folders
public/images/your-image.jpg
public/videos/your-video.mp4

# Files are automatically detected
# No code changes required
```

#### **Audio Tracks**
```bash
# Beats (no artist images)
public/audio/beats/your-beat.mp3

# Songs (with artist images)
public/audio/songs/your-song.mp3
public/images/artists/artist-name.jpg
```

#### **File Naming Conventions**
```
# Audio files
Artist Name - Song Title (prod. HSC).mp3
Beat Name.flac

# Artist images
artist_name.jpg
artist-name.png
```

### **Content Organization**
```
public/
├── images/
│   ├── gallery/          # Gallery images (auto-scanned)
│   ├── artists/          # Artist thumbnails
│   ├── about.png         # About page image
│   └── hero.jpg         # Homepage hero
├── videos/
│   └── *.mp4           # Gallery videos (auto-scanned)
├── audio/
│   ├── beats/           # Instrumental tracks
│   └── songs/           # Vocal tracks
└── icons/              # Favicon and app icons
```

---

## **📝 Code Guidelines**

### **TypeScript Standards**
```typescript
// Use interfaces for type safety
interface AudioTrack {
  id: string;
  title: string;
  genre: string;
  audio_url: string;
  artist_image?: string;
}

// Use proper typing for API responses
export async function GET(): Promise<NextResponse<AudioTrack[]>> {
  // Implementation
}
```

### **Component Structure**
```typescript
// Use functional components with hooks
export default function ComponentName() {
  const [state, setState] = useState<Type>(initialValue);
  
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  return (
    <div className="tailwind-classes">
      {/* JSX content */}
    </div>
  );
}
```

### **Styling Guidelines**
```typescript
// Use Tailwind CSS classes
<div className="flex items-center justify-center bg-black text-white">
  {/* Content */}
</div>

// Avoid inline styles
// BAD: <div style={{ color: 'red' }}>
// GOOD: <div className="text-red-500">
```

### **File Naming**
```
// Components: PascalCase
AudioPlayer.tsx
GalleryGrid.tsx

// Utilities: camelCase
formatDate.ts
sanitizePath.ts

// Pages: kebab-case
about/page.tsx
media/page.tsx
```

---

## **🧪 Testing**

### **Manual Testing Checklist**
- [ ] **Responsive Design**: Test on mobile, tablet, desktop
- [ ] **Browser Compatibility**: Chrome, Safari, Firefox, Edge
- [ ] **Functionality**: All buttons and links work
- [ ] **Performance**: Fast loading and smooth interactions
- [ ] **Accessibility**: Keyboard navigation and screen readers

### **Testing Tools**
```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Build test
npm run build

# Performance audit
npm run analyze
```

### **Browser Testing**
- **Chrome DevTools**: Performance and accessibility
- **Firefox Developer Tools**: Cross-browser compatibility
- **Safari Web Inspector**: Apple device testing
- **Mobile Devices**: Real device testing recommended

---

## **📤 Submitting Changes**

### **1. Create Feature Branch**
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### **2. Make Changes**
- Follow code guidelines
- Test thoroughly
- Update documentation

### **3. Commit Changes**
```bash
git add .
git commit -m "feat: add new feature description"
# or
git commit -m "fix: resolve issue description"
```

### **4. Push and Create PR**
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- **Clear title** describing changes
- **Detailed description** of what was done
- **Testing notes** and screenshots
- **Related issues** if applicable

---

## **🐛 Bug Reports**

### **Bug Report Template**
```markdown
## Bug Description
Brief description of the issue

## Steps to Reproduce
1. Go to...
2. Click on...
3. See error...

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., macOS, Windows, Linux]
- Browser: [e.g., Chrome 120, Safari 17]
- Device: [e.g., iPhone 14, Desktop]

## Screenshots
If applicable, add screenshots

## Additional Context
Any other relevant information
```

### **Where to Report**
- **GitHub Issues**: [Create New Issue](https://github.com/idongCodes/hscprod/issues/new)
- **Discussions**: [Start Discussion](https://github.com/idongCodes/hscprod/discussions)

---

## **✨ Feature Requests**

### **Feature Request Template**
```markdown
## Feature Description
Clear description of the feature

## Problem Statement
What problem does this solve?

## Proposed Solution
How should this work?

## Alternatives Considered
Other approaches you thought of

## Additional Context
Mockups, examples, or references
```

### **Request Categories**
- **🎨 UI/UX Improvements**: Design and usability
- **⚡ Performance**: Speed and optimization
- **🔧 Functionality**: New features or capabilities
- **📱 Mobile**: Mobile-specific improvements
- **🔊 Audio**: Music-related enhancements

---

## **🎯 Contribution Areas**

### **High Priority**
- **🎵 Audio Features**: Enhanced music player, playlists
- **📱 Mobile Experience**: Touch interactions, PWA
- **⚡ Performance**: Loading speed, optimization
- **🎨 UI Polish**: Animations, micro-interactions

### **Medium Priority**
- **🔍 Search**: Content discovery and filtering
- **📊 Analytics**: Usage tracking and insights
- **🌐 Internationalization**: Multi-language support
- **♿ Accessibility**: Enhanced screen reader support

### **Low Priority**
- **🎨 Themes**: Custom color schemes
- **📧 Notifications**: Email integrations
- **🔗 Social**: Sharing capabilities
- **📝 Blog**: Content management system

---

## **🏆 Recognition**

### **Contributor Types**
- **🐛 Bug Fixers**: Issue resolution
- **✨ Feature Developers**: New functionality
- **📝 Documentation**: Guides and improvements
- **🎨 Designers**: UI/UX contributions
- **🧪 Testers**: Quality assurance

### **Acknowledgment**
All contributors are recognized in:
- **README.md**: Contributor list
- **Release Notes**: Feature attributions
- **About Page**: Special thanks
- **GitHub Stats**: Contribution tracking

---

## **📞 Getting Help**

### **Discussions**
- **Questions**: [GitHub Discussions](https://github.com/idongCodes/hscprod/discussions)
- **Ideas**: Brainstorming and feedback
- **Show and Tell**: Share your work

### **Issues**
- **Bugs**: [Report Issues](https://github.com/idongCodes/hscprod/issues)
- **Feature Requests**: [Request Features](https://github.com/idongCodes/hscprod/issues/new)
- **Documentation**: [Report Docs Issues](https://github.com/idongCodes/hscprod/issues/new)

### **Community**
- **Discord**: (if available)
- **Twitter**: @hscprod
- **Email**: contact@hscprod.com

---

## **📄 License**

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

## **🙏 Thank You**

Your contributions help make HSC Productions better for everyone. Whether you're fixing bugs, adding features, improving documentation, or providing feedback, we appreciate your time and effort!

**Happy coding!** 🎵✨

---

*This contributing guide is updated regularly. Last revised: January 2026*
