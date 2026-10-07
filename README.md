<div align="center">

<img src="https://img.shields.io/badge/Indian%20Visa-Portal%20Redesign-orange?style=for-the-badge&logo=react" alt="Indian Visa Portal" />

# 🇮🇳 Indian Visa — Modern Portal Redesign

### *A streamlined, accessible, and user-friendly redesign of the official Indian Visa portal.*

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![React Router](https://img.shields.io/badge/React_Router-7.18-CA4245?style=flat-square&logo=reactrouter)](https://reactrouter.com/)
[![Oxlint](https://img.shields.io/badge/Oxlint-1.81-white?style=flat-square)](https://oxc.rs)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

---

> **Indian Visa** is a frontend redesign of the traditional Indian visa application portal. It modernizes the user experience by offering an intuitive visa finder, clear travel advisories, accessibility support, and multi-language capabilities.

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🖥️ Frontend Pages](#️-frontend-pages)
- [🌐 Internationalisation](#-internationalisation)
- [♿ Accessibility](#-accessibility)
- [🤝 Contributing](#-contributing)

---

## ✨ Features

### 👤 User-Facing
| Feature | Description |
|---|---|
| 🔍 **Visa Finder** | Interactive tool to help users identify the correct visa category based on their travel purpose and nationality. |
| 🛂 **Application Portal** | A simplified and user-friendly step-by-step visa application process. |
| 📍 **Application Tracking** | Track the live status of an ongoing visa application seamlessly. |
| 🗺️ **Plan Journey** | Resources, destination guides, and mapping features (using React Simple Maps) for planning a trip to India. |
| ⚠️ **Travel Advisories** | Up-to-date travel alerts and essential notifications for foreign nationals. |
| 🌐 **Multi-language** | Full support for multiple languages with seamless switching capabilities. |
| ♿ **Accessibility** | Built with accessibility in mind, including an `AccessibilityProvider`, keyboard navigation, and 'Skip to main content' links. |

---

## 🏗️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React** | 19.2.8 | UI library & Component framework |
| **Vite** | 8.3.0 | Fast development server & optimized build tool |
| **TypeScript** | ~6.0.2 | Strict type safety for scalable codebase |
| **React Router** | 7.18.4 | Client-side routing for seamless navigation |
| **Lucide React** | 1.47.0 | Beautiful, consistent iconography |
| **React Simple Maps / D3-Geo** | latest | Rendering interactive geographic maps for travel planning |
| **Oxlint** | 1.81.0 | Blazing fast JavaScript/TypeScript linter |

---

## 📁 Project Structure

```
Indian-Visa/
├── 📂 public/                     # Static assets (favicons, etc.)
├── 📂 src/                        # Main application source code
│   ├── 📂 assets/                 # Images, fonts, and local assets
│   ├── 📂 components/             # Reusable UI components (Header, Footer, etc.)
│   ├── 📂 data/                   # Static data constants and mock responses
│   ├── 📂 hooks/                  # Custom hooks (useLanguage, useAccessibility)
│   ├── 📂 i18n/                   # Internationalisation configuration and locales
│   ├── 📂 pages/                  # Page-level components corresponding to routes
│   │   ├── 📂 account/
│   │   ├── 📂 advisories/
│   │   ├── 📂 application/
│   │   ├── 📂 finder/
│   │   ├── 📂 help/
│   │   ├── 📂 home/
│   │   ├── 📂 notFound/
│   │   ├── 📂 plan/
│   │   ├── 📂 search/
│   │   ├── 📂 track/
│   │   └── 📂 visaInfo/
│   ├── 📂 types/                  # Global TypeScript type definitions
│   ├── App.tsx                    # Main App component & Router configuration
│   ├── App.css                    # Component-specific styles
│   ├── index.css                  # Global styles and variables
│   └── main.tsx                   # React root entry point
├── package.json                   # Project metadata and scripts
├── tsconfig.json                  # TypeScript compiler configuration
└── vite.config.ts                 # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** ≥ 18.0.0 — [Download](https://nodejs.org)
- **npm** or **yarn**

---

### 1. Clone the Repository

```bash
git clone https://github.com/Jeetchavan02/Indian-Visa.git
cd Indian-Visa
```

---

### 2. Frontend Setup

```bash
# Install dependencies
npm install
```

**Start the frontend dev server:**
```bash
npm run dev
# → Vite running at http://localhost:5173
```

**Build for production:**
```bash
npm run build
```

---

## 🖥️ Frontend Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Main landing page with portal overview |
| `/visa-info` | Visa Information | Details on eligibility, fees, and requirements |
| `/finder` | Visa Finder | Interactive wizard to determine visa type |
| `/apply` | Apply | Visa application initiation |
| `/track` | Track Application | Status checker for submitted applications |
| `/plan` | Plan Journey | Tourist guides and interactive map planning |
| `/advisories` | Advisories | Important travel news and alerts |
| `/search` | Search | Global portal search functionality |
| `/help` | Help & FAQ | Support center and frequently asked questions |
| `/account` | Account | User profile and application dashboard |

---

## 🌐 Internationalisation

The application includes robust internationalisation support via a custom `useLanguage` hook and dedicated `/i18n` directory. It is designed to cater to applicants globally, allowing them to switch the portal's language without page reloads.

---

## ♿ Accessibility

As a civic-tech redesign, inclusivity is a top priority:
- A custom `useAccessibility` context manages global accessibility preferences (e.g., high contrast, reduced motion).
- Includes a top-level **Skip to main content** link for keyboard users.
- Designed with semantic HTML and appropriate ARIA attributes.

---

## 🤝 Contributing

1. **Fork** the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Open a **Pull Request**

### Code Style
- **TypeScript** is required for all components.
- Run `npm run lint` (uses Oxlint) to ensure fast and strict code quality checks before committing.

---

<div align="center">

**Modernizing the Visa Application Experience**

</div>
