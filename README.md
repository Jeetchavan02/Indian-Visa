# Indian Visa Portal

A modern, responsive web application for the Indian Visa portal, built with React, TypeScript, and Vite. This application provides a comprehensive platform for users to find visa information, apply for visas, track their applications, and plan their journey to India.

## Features

- **Visa Finder**: Interactive tool to help users find the right visa type for their journey.
- **Visa Information**: Detailed information about different visa categories, requirements, and fees.
- **Application Portal**: Seamless application process for various Indian visas.
- **Application Tracking**: Check the status of ongoing visa applications.
- **Plan Journey**: Resources and information for planning a trip to India.
- **Advisories**: Latest travel advisories and updates.
- **Accessibility Support**: Built-in accessibility features with a dedicated context provider.
- **Multi-language Support**: Internationalization support via a custom language provider.

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Bundler/Build Tool**: Vite
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **Mapping/Visualizations**: React Simple Maps, d3-geo
- **Linting**: Oxlint

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

This will start the Vite dev server with Hot Module Replacement (HMR).

### Building for Production

To build the application for production:

```bash
npm run build
```

This command runs TypeScript type checking (`tsc -b`) followed by the Vite build process. The optimized static assets will be generated in the `dist` folder.

To preview the production build locally:

```bash
npm run preview
```

### Linting

The project uses Oxlint for fast and efficient linting:

```bash
npm run lint
```

## Project Structure

```text
src/
├── assets/         # Static assets (images, icons, etc.)
├── components/     # Reusable React components (Layout, UI elements)
├── data/           # Mock data or static data constants
├── hooks/          # Custom React hooks (useLanguage, useAccessibility)
├── i18n/           # Internationalization resources
├── pages/          # Page components corresponding to routes
├── types/          # TypeScript type definitions
├── App.tsx         # Main application component and routing setup
├── index.css       # Global styles
└── main.tsx        # Application entry point
```

## Accessibility

The application includes a `SkipLink` component and an `AccessibilityProvider` to ensure the platform is usable by everyone, adhering to modern web accessibility standards.
