import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, CheckCircle, Clock, FileText, Award } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { demoApplications } from '../../data/miscData';
import type { DemoApplication } from '../../types';
import './TrackPage.css';

type Status = DemoApplication['status'];

const STATUS_STEPS: { key: Status; label: string; desc: string }[] = [
  { key: 'submitted', label: 'Application Submitted', desc: 'Your application has been received.' },
  { key: 'review', label: 'Documents Under Review', desc: 'Your documents are being reviewed.' },
  { key: 'processing', label: 'Application Processing', desc: 'Your application is being processed.' },
  { key: 'decision', label: 'Decision', desc: 'A decision has been made on your application.' },
];

const STATUS_ORDER: Status[] = ['submitted', 'review', 'processing', 'decision'];

function getStatusIndex(status: Status) {
  return STATUS_ORDER.indexOf(status);
}

export default function TrackPage() {
  const { t } = useLanguage();
  const [appId, setAppId] = useState('');
  const [dob, setDob] = useState('');
  const [result, setResult] = useState<DemoApplication | null | 'not-found'>(null);
  const [searched, setSearched] = useState(false);
  const [errors, setErrors] = useState({ appId: '', dob: '' });

  const handleCheck = () => {
    const newErrors = { appId: '', dob: '' };
    if (!appId.trim()) newErrors.appId = 'Please enter your Application ID.';
    if (!dob) newErrors.dob = 'Please enter your date of birth.';
    if (newErrors.appId || newErrors.dob) {
      setErrors(newErrors);
      return;
    }
    setErrors({ appId: '', dob: '' });
    const found = demoApplications.find(
      (a) => a.id.toLowerCase() === appId.trim().toLowerCase()
    );
    setResult(found || 'not-found');
    setSearched(true);
  };

  const currentStatusIndex = result && result !== 'not-found' ? getStatusIndex(result.status) : -1;

  return (
    <main id="main-content" className="page-content">
      <div className="page-hero-sm">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">{t('track.title')}</span>
          </nav>
          <h1 className="text-h1">{t('track.title')}</h1>
          <p className="page-hero-desc">{t('track.subtitle')}</p>
          <div className="badge badge-demo">{t('demo.badge')}</div>
        </div>
      </div>

      <section className="section-sm">
        <div className="container-sm">
          {/* Search Form */}
          <div className="card track-search-card">
            <div className="card-body">
              <h2 className="track-form-title">Check Application Status</h2>
              <div className="alert alert-info mb-5">
                <span className="alert-icon">ℹ️</span>
                <span>{t('track.hint')}</span>
              </div>

              <div className="track-form-grid">
                <div className="form-group">
                  <label htmlFor="appId" className="form-label">
                    {t('track.appId')} <span className="required" aria-label="required">*</span>
                  </label>
                  <input
                    id="appId"
                    type="text"
                    className={`form-input ${errors.appId ? 'error' : ''}`}
                    value={appId}
                    onChange={(e) => { setAppId(e.target.value); setErrors((e2) => ({ ...e2, appId: '' })); }}
                    placeholder="e.g. IVO-2024-001"
                    aria-required="true"
                    aria-describedby={errors.appId ? 'appid-err' : undefined}
                  />
                  {errors.appId && (
                    <span id="appid-err" className="form-error" role="alert">{errors.appId}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="trackDob" className="form-label">
                    {t('track.dob')} <span className="required" aria-label="required">*</span>
                  </label>
                  <input
                    id="trackDob"
                    type="date"
                    className={`form-input ${errors.dob ? 'error' : ''}`}
                    value={dob}
                    onChange={(e) => { setDob(e.target.value); setErrors((e2) => ({ ...e2, dob: '' })); }}
                    aria-required="true"
                    aria-describedby={errors.dob ? 'dob-err' : undefined}
                  />
                  {errors.dob && (
                    <span id="dob-err" className="form-error" role="alert">{errors.dob}</span>
                  )}
                </div>
              </div>

              <button
                className="btn btn-primary mt-5"
                onClick={handleCheck}
                aria-label="Check application status"
              >
                <Search size={16} aria-hidden="true" />
                {t('track.check')}
              </button>
            </div>
          </div>

          {/* Results */}
          {searched && (
            <div className="track-results mt-6" role="region" aria-live="polite" aria-label="Application status result">
              {result === 'not-found' && (
                <div className="card">
                  <div className="card-body text-center">
                    <div className="track-not-found-icon" aria-hidden="true">🔍</div>
                    <h3>Application Not Found</h3>
                    <p className="text-secondary mt-2">
                      No demo application was found with that ID. Try one of the demo IDs shown above.
                    </p>
                  </div>
                </div>
              )}

              {result && result !== 'not-found' && (
                <div className="card">
                  <div className="card-header">
                    <div className="track-result-header">
                      <div>
                        <div className="badge badge-demo mb-2">{t('track.demoLabel')}</div>
                        <h3 className="track-app-id">{result.id}</h3>
                        <div className="track-app-meta">
                          <span className="track-visa-type">{result.visaType}</span>
                          <span className="track-separator">·</span>
                          <span>Submitted: {result.submittedDate}</span>
                        </div>
                      </div>
                      <div className={`track-status-badge status-${result.status}`}>
                        {result.status === 'submitted' && <FileText size={14} aria-hidden="true" />}
                        {result.status === 'review' && <Clock size={14} aria-hidden="true" />}
                        {result.status === 'processing' && <Clock size={14} aria-hidden="true" />}
                        {result.status === 'decision' && <Award size={14} aria-hidden="true" />}
                        {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <h4 className="track-timeline-title">Application Timeline</h4>
                    <div className="timeline" role="list">
                      {STATUS_STEPS.map((step, i) => {
                        const stepIndex = i;
                        const isDone = stepIndex <= currentStatusIndex;
                        const isCurrent = stepIndex === currentStatusIndex;
                        return (
                          <div
                            key={step.key}
                            className={`timeline-item ${isDone ? 'done' : ''}`}
                            role="listitem"
                          >
                            <div className="timeline-line" aria-hidden="true" />
                            <div className={`timeline-dot ${isCurrent ? 'current' : isDone ? 'done' : 'pending'}`}>
                              {isDone && !isCurrent && <CheckCircle size={14} aria-hidden="true" />}
                              {isCurrent && '●'}
                              {!isDone && '○'}
                            </div>
                            <div className="timeline-content">
                              <div className={`timeline-title ${isCurrent ? 'text-saffron' : ''}`}>
                                {step.label}
                                {isCurrent && (
                                  <span className="badge badge-saffron ml-2">Current</span>
                                )}
                              </div>
                              <div className="timeline-date">{step.desc}</div>
                              {isCurrent && (
                                <div className="timeline-date">Last updated: {result.lastUpdated}</div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
