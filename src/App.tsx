import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './hooks/useLanguage';
import { AccessibilityProvider } from './hooks/useAccessibility';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/home/HomePage';
import VisaInformationPage from './pages/visaInfo/VisaInformationPage';
import ApplicationPage from './pages/application/ApplicationPage';
import TrackPage from './pages/track/TrackPage';
import SearchPage from './pages/search/SearchPage';
import HelpPage from './pages/help/HelpPage';
import AdvisoriesPage from './pages/advisories/AdvisoriesPage';
import AccountPage from './pages/account/AccountPage';
import NotFoundPage from './pages/notFound/NotFoundPage';
import VisaFinderPage from './pages/finder/VisaFinderPage';

// Skip to main content link for accessibility
function SkipLink() {
  return (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  );
}

function AppRoutes() {
  return (
    <>
      <SkipLink />
      <Header />
      <div className="page-wrapper">
        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/visa-info" element={<VisaInformationPage />} />
            <Route path="/apply" element={<ApplicationPage />} />
            <Route path="/track" element={<TrackPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/advisories" element={<AdvisoriesPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/finder" element={<VisaFinderPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AccessibilityProvider>
        <LanguageProvider>
          <AppRoutes />
        </LanguageProvider>
      </AccessibilityProvider>
    </BrowserRouter>
  );
}
