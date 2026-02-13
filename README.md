# TouchCSS Studio

**Visually build CSS and learn interactively with TouchCSS Studio.**

A modern, interactive web application for learning CSS and experimenting with visual CSS editors. Build stunning UIs, master CSS concepts, and get AI-powered explanations - all powered by your choice of AI provider.

## ✨ Features

### 🎨 Visual CSS Editors
- **Box Shadow Editor** - Design complex shadows with real-time preview
- **Gradient Editor** - Create beautiful linear and radial gradients
- **Transform Editor** - Manipulate rotation, scale, translate, and skew
- **Typography Editor** - Fine-tune fonts, spacing, and text styles
- **Filter Effects Editor** - Apply blur, brightness, contrast, and more
- **Animation Editor** - Build CSS keyframe animations visually

### 📚 Interactive Learning
- **Guided Tutorials** - Step-by-step walkthroughs of CSS concepts
- **Hands-On Exercises** - Practice with real coding challenges
- **Difficulty Levels** - From beginner to advanced exercises

### 🤖 AI-Powered Features
- **CSS Explainer** - Get plain-English explanations of any CSS code
- **Dual AI Provider Support** - Choose between Google Gemini or Groq
- **Client-Side Processing** - Your API keys stay on your device
- **Privacy-First** - No data sent to our servers

### 🔧 Additional Features
- Interactive examples of hover effects, transitions, and animations
- CSS custom properties (variables) demonstrations
- Advanced CSS concepts (Container Queries, Scroll-driven Animations, 3D Transforms)
- Progressive Web App (PWA) support - install and use offline

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/prakhar230620/TouchCSS.git
cd TouchCSS
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:9002](http://localhost:9002) in your browser

### 🔑 Configuring AI Features

TouchCSS Studio uses **client-side AI integration**, meaning you provide your own API keys which are stored securely in your browser's localStorage.

#### Getting Your API Keys

**Option 1: Google Gemini** (Recommended for beginners)
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Free tier includes generous usage limits

**Option 2: Groq** (Fast inference)
1. Visit [Groq Console](https://console.groq.com/keys)
2. Sign up for a free account
3. Create a new API key
4. Free tier available with good limits

#### Setting Up API Keys in the App

1. Click the **Settings** icon in the navigation bar (or on the AI Tools page)
2. Select your preferred AI provider (Gemini or Groq)
3. Paste your API key in the corresponding field
4. Click **Save Settings**

Your API key is stored locally in your browser and is never sent to our servers. All AI requests go directly from your browser to the AI provider.

## 🛠️ Tech Stack

- **Next.js 15.2.3** - React framework with App Router
- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful UI components
- **Google Generative AI** - Gemini AI integration
- **OpenAI SDK** - Groq AI integration (OpenAI-compatible endpoint)
- **Radix UI** - Accessible component primitives
- **Lucide Icons** - Beautiful icon library

## 📁 Project Structure

```
TouchCSS/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Home page
│   │   ├── build/             # Visual CSS editors
│   │   ├── learn/             # Tutorials & exercises
│   │   ├── tools/             # AI CSS Explainer
│   │   └── additional-features/ # CSS examples
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── tools/             # Visual editor components
│   │   ├── layout/            # Navigation, layout
│   │   └── ai-settings-dialog.tsx # AI configuration
│   ├── lib/
│   │   ├── api-key-storage.ts # localStorage utilities
│   │   ├── ai-providers.ts    # AI provider integrations
│   │   └── utils.ts           # Utility functions
│   └── ai/                    # Legacy server-side AI (deprecated)
├── public/                    # Static assets, PWA files
└── docs/                      # Documentation
```

## 🔒 Privacy & Security

- **Client-Side Storage**: API keys are stored in browser localStorage
- **No Server Tracking**: We don't collect or store your API keys
- **Direct API Calls**: All AI requests go directly to the provider
- **Open Source**: Full transparency - review the code yourself

**Security Note**: Browser localStorage can be accessed by browser extensions. For production use in sensitive environments, consider additional security measures.

## 🌐 Building for Production

```bash
npm run build
npm start
```

The app will build the production bundle and can be deployed to any Node.js hosting platform (Vercel, Netlify, etc.).

## 📱 PWA Support

TouchCSS Studio is a Progressive Web App and can be installed on your device:

1. Open the app in a supported browser (Chrome, Edge, Safari)
2. Click the install prompt or use browser's "Install App" option
3. Use it like a native app with offline support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- AI powered by [Google Gemini](https://ai.google.dev/) and [Groq](https://groq.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📞 Support

For issues, questions, or feature requests, please open an issue on GitHub.

---

**Made with ❤️ for the CSS learning community**
