import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ExternalLink, ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import WorldMap from '../../components/Map/WorldMap';
import './HomePage.css';

export default function HomePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [selectedCountryName, setSelectedCountryName] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCountrySelect = (id: string, name: string) => {
    setSelectedCountryId(id);
    setSelectedCountryName(name);
  };

  const handleContinue = () => {
    if (selectedCountryId && selectedCountryName) {
      navigate('/visa-info', { state: { countryId: selectedCountryId, countryName: selectedCountryName } });
    }
  };

  const clearSelection = () => {
    setSelectedCountryId(null);
    setSelectedCountryName(null);
  }

  return (
    <main id="main-content" className="home-main">
      {/* Editorial Hero Section */}
      <section className="hero-section">
        <div className="container">
          
          <div className="hero-header-text">
            <h1 className="hero-title">PLAN YOUR JOURNEY TO INDIA</h1>
            <p className="hero-subtitle">Start by selecting your country of origin.</p>
          </div>

          <div className="hero-interactive-zone">
            <div className="hero-search-area">
              <label className="search-label" htmlFor="country-search">Where are you travelling from?</label>
              <div className="country-search-wrapper">
                <Search className="search-icon" size={20} />
                <input
                  id="country-search"
                  type="text"
                  className="country-search-input"
                  placeholder={t('home.searchCountry', 'Search country...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="hero-map-wrapper">
              <WorldMap
                onCountrySelect={handleCountrySelect}
                selectedCountryId={selectedCountryId}
              />
            </div>
            
            {/* The Selection Panel */}
            <div className={`hero-selection-panel ${selectedCountryId ? 'active' : ''}`}>
              {selectedCountryId ? (
                <div className="selection-content">
                  <div className="selection-route">
                    <div className="route-origin">
                      <span className="route-label">Travelling from:</span>
                      <strong className="route-country">{selectedCountryName}</strong>
                    </div>
                    <div className="route-arrow">→</div>
                    <div className="route-destination">
                      <span className="route-label">To:</span>
                      <strong className="route-country">India</strong>
                    </div>
                  </div>
                  <div className="selection-actions">
                    <button className="btn-change-country" onClick={clearSelection}>Change country</button>
                    <button className="btn btn-primary btn-explore" onClick={handleContinue}>
                      Explore visa options
                    </button>
                  </div>
                </div>
              ) : (
                <div className="selection-placeholder">
                  Select a country on the map or use the search above to begin.
                </div>
              )}
            </div>
          </div>
          
        </div>
      </section>

      {/* Visa Services Editorial Section */}
      <section className="visa-services-section">
        <div className="container">
          <h2 className="section-heading">Visa Services</h2>
          
          <div className="services-editorial-list">
            
            <Link to="/visa-info" state={{ service: 'regular' }} className="service-row">
              <div className="service-number">01</div>
              <div className="service-details">
                <h3 className="service-title">Regular / Paper Visa</h3>
                <p className="service-desc">Apply through an Indian Mission / Post.</p>
              </div>
              <div className="service-arrow"><ArrowRight size={24} /></div>
            </Link>

            <Link to="/visa-info" state={{ service: 'evisa' }} className="service-row">
              <div className="service-number">02</div>
              <div className="service-details">
                <h3 className="service-title">eVisa</h3>
                <p className="service-desc">Apply online for eligible travel purposes.</p>
              </div>
              <div className="service-arrow"><ArrowRight size={24} /></div>
            </Link>

            <Link to="/visa-info" state={{ service: 'voa' }} className="service-row">
              <div className="service-number">03</div>
              <div className="service-details">
                <h3 className="service-title">Visa on Arrival</h3>
                <p className="service-desc">Check eligibility and designated entry points.</p>
              </div>
              <div className="service-arrow"><ArrowRight size={24} /></div>
            </Link>

            <Link to="/visa-info" state={{ service: 'afghan' }} className="service-row">
              <div className="service-number">04</div>
              <div className="service-details">
                <h3 className="service-title">Afghan Visa</h3>
                <p className="service-desc">Visa information and application route for Afghan nationals.</p>
              </div>
              <div className="service-arrow"><ArrowRight size={24} /></div>
            </Link>

            <Link to="/visa-info" state={{ service: 'earrival' }} className="service-row highlight-row">
              <div className="service-number"></div>
              <div className="service-details">
                <h3 className="service-title">e-Arrival Card</h3>
                <p className="service-desc">Arrival information before entering India — not a visa.</p>
              </div>
              <div className="service-arrow"><ArrowRight size={24} /></div>
            </Link>

          </div>
        </div>
      </section>

      {/* Find the right visa */}
      <section className="visa-finder-section">
        <div className="container">
          <div className="finder-banner">
            <h2 className="finder-title">Find the right visa</h2>
            <p className="finder-desc">Not sure which option you need?</p>
            <Link to="/finder" className="btn btn-primary">Find my visa</Link>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions-section">
        <div className="container">
          <h2 className="section-heading-sm">Quick Actions</h2>
          <div className="quick-actions-flex">
            <Link to="/track" className="quick-action-link">Track Visa Status</Link>
            <Link to="/application" className="quick-action-link">Continue Saved Application</Link>
            <Link to="/instructions" className="quick-action-link">Visa Instructions</Link>
            <Link to="/earrival" className="quick-action-link">e-Arrival Card</Link>
          </div>
        </div>
      </section>

      {/* Explore by Country */}
      <section className="explore-country-section">
        <div className="container">
          <h2 className="section-heading-sm">Explore by country</h2>
          <div className="country-pills">
            <button className="country-pill" onClick={() => handleCountrySelect('840', 'United States')}>United States</button>
            <button className="country-pill" onClick={() => handleCountrySelect('826', 'United Kingdom')}>United Kingdom</button>
            <button className="country-pill" onClick={() => handleCountrySelect('124', 'Canada')}>Canada</button>
            <button className="country-pill" onClick={() => handleCountrySelect('036', 'Australia')}>Australia</button>
            <button className="country-pill" onClick={() => handleCountrySelect('392', 'Japan')}>Japan</button>
            <button className="country-pill" onClick={() => handleCountrySelect('702', 'Singapore')}>Singapore</button>
            <button className="country-pill" onClick={() => handleCountrySelect('276', 'Germany')}>Germany</button>
          </div>
        </div>
      </section>

      {/* Important Information Accordions */}
      <section className="important-info-section">
        <div className="container">
          <h2 className="section-heading-sm">Important Information</h2>
          <div className="info-accordions">
            
            <details className="info-accordion">
              <summary>Application guidance <ChevronDown className="acc-icon" size={20} /></summary>
              <div className="acc-content">
                Ensure your passport has at least six months of validity remaining from your date of arrival in India.
              </div>
            </details>

            <details className="info-accordion">
              <summary>Entry information <ChevronDown className="acc-icon" size={20} /></summary>
              <div className="acc-content">
                Keep a printed copy of your ETA (Electronic Travel Authorization) with you at all times during your travel to India.
              </div>
            </details>

            <details className="info-accordion">
              <summary>e-Arrival <ChevronDown className="acc-icon" size={20} /></summary>
              <div className="acc-content">
                All foreign nationals arriving in India must fill out an Arrival Card for immigration clearance.
              </div>
            </details>

            <details className="info-accordion">
              <summary>Fraud / intermediary warnings <ChevronDown className="acc-icon" size={20} /></summary>
              <div className="acc-content">
                Beware of fake websites claiming to offer Indian Visa services. Always use the official government portal.
              </div>
            </details>

          </div>
        </div>
      </section>

      {/* Help */}
      <section className="help-section">
        <div className="container">
          <h2 className="section-heading-sm">Help & Support</h2>
          <div className="help-links">
            <Link to="/help" className="help-link">Frequently asked questions</Link>
            <Link to="/contact" className="help-link">Contact / support information</Link>
            <Link to="/accessibility" className="help-link">Accessibility</Link>
          </div>
        </div>
      </section>

    </main>
  );
}
