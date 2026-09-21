import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { MapPin, Briefcase } from 'lucide-react';
import PurposeSelection from './components/PurposeSelection';
import VisaDetails from './components/VisaDetails';
import './VisaInformationPage.css';

interface LocationState {
  countryId?: string;
  countryName?: string;
}

export default function VisaInformationPage() {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  const [selectedCountryName, setSelectedCountryName] = useState<string | null>(state?.countryName || null);
  const [selectedPurposeId, setSelectedPurposeId] = useState<string | null>(null);

  // If no country was selected, we might want them to go back home, but for now we'll allow a fallback text or redirect
  useEffect(() => {
    if (!selectedCountryName) {
      // In a real app, maybe redirect to home: navigate('/');
      setSelectedCountryName('United States'); // Fallback for direct links
    }
  }, [selectedCountryName]);

  return (
    <main id="main-content" className="visa-info-page">
      <div className="container visa-info-layout">
        
        {/* Breadcrumbs or Back */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link to="/" className="btn btn-ghost" style={{ paddingLeft: 0 }}>
            ← {t('btn.back', 'Back to Home')}
          </Link>
        </div>

        {/* Journey Summary */}
        <div className="journey-summary">
          <div className="journey-step">
            <span className="journey-label">{t('visaInfo.from', 'Travelling From')}</span>
            <span className="journey-value">
              <MapPin size={24} className="text-primary" />
              {selectedCountryName}
            </span>
          </div>
          
          {selectedPurposeId && (
            <div className="journey-step">
              <span className="journey-label">{t('visaInfo.purpose', 'For Purpose Of')}</span>
              <span className="journey-value">
                <Briefcase size={24} className="text-primary" />
                <span style={{ textTransform: 'capitalize' }}>{selectedPurposeId}</span>
              </span>
            </div>
          )}
        </div>

        {/* Step 2: Purpose (Shown if country is known) */}
        {!selectedPurposeId && (
          <PurposeSelection 
            onSelect={setSelectedPurposeId} 
            selectedPurposeId={selectedPurposeId} 
          />
        )}

        {/* Step 3: Requirements (Shown if purpose is known) */}
        {selectedPurposeId && (
          <VisaDetails purposeId={selectedPurposeId} />
        )}
      </div>
    </main>
  );
}
