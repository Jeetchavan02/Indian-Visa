import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, Check, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useSaveResume } from '../../hooks/useSaveResume';
import { visaCategories } from '../../data/visaData';
import type { ApplicationDraft } from '../../types';
import './ApplicationPage.css';

const STEPS = [
  { id: 1, key: 'app.step.visa', short: 'Visa' },
  { id: 2, key: 'app.step.eligibility', short: 'Eligibility' },
  { id: 3, key: 'app.step.applicant', short: 'Applicant' },
  { id: 4, key: 'app.step.travel', short: 'Travel' },
  { id: 5, key: 'app.step.documents', short: 'Documents' },
  { id: 6, key: 'app.step.review', short: 'Review' },
  { id: 7, key: 'app.step.confirmation', short: 'Confirm' },
];

type FieldErrors = Partial<Record<keyof ApplicationDraft, string>>;

function validateApplicant(draft: Partial<ApplicationDraft>, t: (key: string) => string): FieldErrors {
  const errors: FieldErrors = {};
  if (!draft.fullName?.trim()) errors.fullName = t('form.fullName.error');
  if (!draft.dateOfBirth) errors.dateOfBirth = t('form.dob.error');
  if (!draft.nationality?.trim()) errors.nationality = t('form.nationality.error');
  if (!draft.passportNumber?.trim()) errors.passportNumber = t('form.passport.error1');
  else if (!/^[A-Z0-9]{6,12}$/i.test(draft.passportNumber.trim())) {
    errors.passportNumber = t('form.passport.error2');
  }
  if (!draft.email?.trim()) errors.email = t('form.email.error1');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) {
    errors.email = t('form.email.error2');
  }
  if (!draft.phone?.trim()) errors.phone = t('form.phone.error');
  return errors;
}

function validateTravel(draft: Partial<ApplicationDraft>, t: (key: string) => string): FieldErrors {
  const errors: FieldErrors = {};
  if (!draft.purposeOfVisit) errors.purposeOfVisit = t('form.purpose.error');
  if (!draft.intendedArrivalDate) errors.intendedArrivalDate = t('form.arrival.error');
  if (!draft.intendedDuration?.trim()) errors.intendedDuration = t('form.duration.error');
  if (!draft.portOfArrival?.trim()) errors.portOfArrival = t('form.port.error');
  return errors;
}

export default function ApplicationPage() {
  const { t } = useLanguage();
  const [params] = useSearchParams();
  const { draft, saveDraft, clearDraft } = useSaveResume();

  const initialVisa = params.get('visa') || draft.visaType || '';
  const [step, setStep] = useState<number>(draft.step > 1 ? draft.step : 1);
  const [localDraft, setLocalDraft] = useState<Partial<ApplicationDraft>>({
    ...draft,
    visaType: initialVisa,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [savedMsg, setSavedMsg] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedVisa = visaCategories.find((v) => v.id === localDraft.visaType);

  const update = (field: keyof ApplicationDraft, value: string) => {
    setLocalDraft((p) => ({ ...p, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSave = () => {
    saveDraft({ ...localDraft, step } as ApplicationDraft);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  const handleNext = () => {
    let newErrors: FieldErrors = {};
    if (step === 1 && !localDraft.visaType) {
      alert(t('form.selectVisaTypeError'));
      return;
    }
    if (step === 3) newErrors = validateApplicant(localDraft, t);
    if (step === 4) newErrors = validateTravel(localDraft, t);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstError = document.querySelector('.form-input.error');
      (firstError as HTMLElement)?.focus();
      return;
    }
    setErrors({});
    saveDraft({ ...localDraft, step: step + 1 } as ApplicationDraft);
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    clearDraft();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted || step === 7) {
    const appId = `IVO-${Date.now().toString().slice(-6)}`;
    return (
      <main id="main-content" className="page-content">
        <div className="app-confirmation section">
          <div className="container-sm">
            <div className="confirmation-icon" aria-hidden="true">✓</div>
            <h1 className="confirmation-title">{t('app.confirm.title')}</h1>
            <p className="confirmation-desc">
              {t('app.confirm.desc')}
            </p>
            <div className="confirmation-id">
              <span>{t('app.confirm.id')}</span>
              <strong>{appId}</strong>
            </div>
            <div className="alert alert-warning mt-4">
              <span className="alert-icon">⚠️</span>
              <span>{t('app.demo.warning')}</span>
            </div>
            <div className="confirmation-actions mt-6">
              <Link to="/track" className="btn btn-primary">{t('quickActions.track')}</Link>
              <Link to="/" className="btn btn-secondary">{t('app.confirm.returnHome')}</Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="page-content">
      <div className="page-hero-sm">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">{t('app.title')}</span>
          </nav>
          <h1 className="text-h1">{t('app.title')}</h1>
        </div>
      </div>

      <div className="container app-layout">
        {/* Step Indicator */}
        <div className="app-step-bar" role="navigation" aria-label="Application steps">
          {STEPS.map((s, i) => {
            const status = s.id < step ? 'completed' : s.id === step ? 'current' : 'pending';
            return (
              <div key={s.id} className="app-step-item">
                <div className={`step-circle ${status}`} aria-label={`Step ${s.id}: ${s.short} — ${status}`}>
                  {status === 'completed' ? <Check size={14} aria-hidden="true" /> : s.id}
                </div>
                <div className={`step-label ${status}`}>{s.short}</div>
                {i < STEPS.length - 1 && (
                  <div className={`step-connector ${status === 'completed' ? 'completed' : ''}`} aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>

        {/* Save notice */}
        {savedMsg && (
          <div className="alert alert-success mb-4" role="status" aria-live="polite">
            <Check size={16} aria-hidden="true" />
            <span>{t('app.saved')}</span>
          </div>
        )}

        {/* Step Content */}
        <div className="app-step-content card">
          <div className="card-body">

            {/* STEP 1 — Visa Selection */}
            {step === 1 && (
              <div>
                <h2 className="app-step-title">{t('app.step.visa.title')}</h2>
                <p className="app-step-desc text-secondary mb-6">
                  {t('app.step.visa.desc')}
                </p>
                <div className="visa-select-grid">
                  {visaCategories.map((visa) => (
                    <button
                      key={visa.id}
                      className={`visa-select-card ${localDraft.visaType === visa.id ? 'selected' : ''}`}
                      onClick={() => update('visaType', visa.id)}
                      aria-pressed={localDraft.visaType === visa.id}
                    >
                      <span className="vsc-icon" aria-hidden="true">{visa.icon}</span>
                      <div className="vsc-content">
                        <div className="vsc-name">{visa.name}</div>
                        <div className="vsc-desc">{visa.shortDescription}</div>
                      </div>
                      {localDraft.visaType === visa.id && (
                        <div className="vsc-check" aria-hidden="true">
                          <Check size={14} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2 — Eligibility */}
            {step === 2 && (
              <div>
                <h2 className="app-step-title">{t('app.step.eligibility.title')}</h2>
                <p className="app-step-desc text-secondary mb-6">
                  {t('app.step.eligibility.desc').replace('{visaName}', selectedVisa?.name || 'visa')}
                </p>

                <div className="eligibility-list">
                  {(selectedVisa?.eligibility || []).map((item, i) => (
                    <div key={i} className="eligibility-item">
                      <Check size={18} className="elig-check" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="form-group mt-6">
                  <label className="eligibility-confirm-label">
                    <input type="checkbox" required defaultChecked />
                    <span>{t('app.step.eligibility.confirm')}</span>
                  </label>
                </div>
              </div>
            )}

            {/* STEP 3 — Applicant Details */}
            {step === 3 && (
              <div>
                <h2 className="app-step-title">{t('app.step.applicant.title')}</h2>
                <p className="app-step-desc text-secondary mb-6">
                  {t('app.step.applicant.desc')}
                </p>
                <div className="app-form-grid">
                  <div className="form-group">
                    <label htmlFor="fullName" className="form-label">
                      {t('form.fullName')} <span className="required" aria-label="required">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      className={`form-input ${errors.fullName ? 'error' : ''}`}
                      value={localDraft.fullName || ''}
                      onChange={(e) => update('fullName', e.target.value)}
                      placeholder={t('form.fullName.placeholder')}
                      autoComplete="name"
                      aria-required="true"
                      aria-describedby={errors.fullName ? 'fullName-err' : undefined}
                    />
                    {errors.fullName && (
                      <span id="fullName-err" className="form-error" role="alert">
                        <AlertCircle size={12} aria-hidden="true" /> {errors.fullName}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="dateOfBirth" className="form-label">
                      {t('form.dob')} <span className="required" aria-label="required">*</span>
                    </label>
                    <input
                      id="dateOfBirth"
                      type="date"
                      className={`form-input ${errors.dateOfBirth ? 'error' : ''}`}
                      value={localDraft.dateOfBirth || ''}
                      onChange={(e) => update('dateOfBirth', e.target.value)}
                      aria-required="true"
                      aria-describedby={errors.dateOfBirth ? 'dob-err' : undefined}
                    />
                    {errors.dateOfBirth && (
                      <span id="dob-err" className="form-error" role="alert">
                        <AlertCircle size={12} aria-hidden="true" /> {errors.dateOfBirth}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="nationality" className="form-label">
                      {t('form.nationality')} <span className="required" aria-label="required">*</span>
                    </label>
                    <input
                      id="nationality"
                      type="text"
                      className={`form-input ${errors.nationality ? 'error' : ''}`}
                      value={localDraft.nationality || ''}
                      onChange={(e) => update('nationality', e.target.value)}
                      placeholder={t('form.nationality.placeholder')}
                      autoComplete="country-name"
                      aria-required="true"
                      aria-describedby={errors.nationality ? 'nat-err' : undefined}
                    />
                    {errors.nationality && (
                      <span id="nat-err" className="form-error" role="alert">
                        <AlertCircle size={12} aria-hidden="true" /> {errors.nationality}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="passportNumber" className="form-label">
                      {t('form.passport')} <span className="required" aria-label="required">*</span>
                    </label>
                    <input
                      id="passportNumber"
                      type="text"
                      className={`form-input ${errors.passportNumber ? 'error' : ''}`}
                      value={localDraft.passportNumber || ''}
                      onChange={(e) => update('passportNumber', e.target.value.toUpperCase())}
                      placeholder={t('form.passport.placeholder')}
                      aria-required="true"
                      aria-describedby="passportNumber-hint passportNumber-err"
                    />
                    <span id="passportNumber-hint" className="form-hint">
                      {t('form.passport.hint')}
                    </span>
                    {errors.passportNumber && (
                      <span id="passportNumber-err" className="form-error" role="alert">
                        <AlertCircle size={12} aria-hidden="true" /> {errors.passportNumber}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      {t('form.email')} <span className="required" aria-label="required">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      value={localDraft.email || ''}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder={t('form.email.placeholder')}
                      autoComplete="email"
                      aria-required="true"
                      aria-describedby={errors.email ? 'email-err' : undefined}
                    />
                    {errors.email && (
                      <span id="email-err" className="form-error" role="alert">
                        <AlertCircle size={12} aria-hidden="true" /> {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      {t('form.phone')} <span className="required" aria-label="required">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      value={localDraft.phone || ''}
                      onChange={(e) => update('phone', e.target.value)}
                      placeholder={t('form.phone.placeholder')}
                      autoComplete="tel"
                      aria-required="true"
                      aria-describedby={errors.phone ? 'phone-err' : undefined}
                    />
                    {errors.phone && (
                      <span id="phone-err" className="form-error" role="alert">
                        <AlertCircle size={12} aria-hidden="true" /> {errors.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 — Travel Details */}
            {step === 4 && (
              <div>
                <h2 className="app-step-title">{t('app.step.travel.title')}</h2>
                <p className="app-step-desc text-secondary mb-6">
                  {t('app.step.travel.desc')}
                </p>
                <div className="app-form-grid">
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label htmlFor="purposeOfVisit" className="form-label">
                      {t('form.purpose')} <span className="required" aria-label="required">*</span>
                    </label>
                    <select
                      id="purposeOfVisit"
                      className={`form-input form-select ${errors.purposeOfVisit ? 'error' : ''}`}
                      value={localDraft.purposeOfVisit || ''}
                      onChange={(e) => update('purposeOfVisit', e.target.value)}
                      aria-required="true"
                      aria-describedby={errors.purposeOfVisit ? 'purpose-err' : undefined}
                    >
                      <option value="">{t('form.purpose.placeholder')}</option>
                      <option value="tourism">Tourism</option>
                      <option value="business">Business</option>
                      <option value="medical">Medical</option>
                      <option value="study">Study</option>
                      <option value="employment">Employment</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.purposeOfVisit && (
                      <span id="purpose-err" className="form-error" role="alert">
                        <AlertCircle size={12} aria-hidden="true" /> {errors.purposeOfVisit}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="intendedArrivalDate" className="form-label">
                      {t('form.arrival')} <span className="required" aria-label="required">*</span>
                    </label>
                    <input
                      id="intendedArrivalDate"
                      type="date"
                      className={`form-input ${errors.intendedArrivalDate ? 'error' : ''}`}
                      value={localDraft.intendedArrivalDate || ''}
                      onChange={(e) => update('intendedArrivalDate', e.target.value)}
                      aria-required="true"
                      aria-describedby={errors.intendedArrivalDate ? 'arrival-err' : undefined}
                    />
                    {errors.intendedArrivalDate && (
                      <span id="arrival-err" className="form-error" role="alert">
                        <AlertCircle size={12} aria-hidden="true" /> {errors.intendedArrivalDate}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="intendedDuration" className="form-label">
                      {t('form.duration')} <span className="required" aria-label="required">*</span>
                    </label>
                    <input
                      id="intendedDuration"
                      type="text"
                      className={`form-input ${errors.intendedDuration ? 'error' : ''}`}
                      value={localDraft.intendedDuration || ''}
                      onChange={(e) => update('intendedDuration', e.target.value)}
                      placeholder={t('form.duration.placeholder')}
                      aria-required="true"
                      aria-describedby={errors.intendedDuration ? 'duration-err' : undefined}
                    />
                    {errors.intendedDuration && (
                      <span id="duration-err" className="form-error" role="alert">
                        <AlertCircle size={12} aria-hidden="true" /> {errors.intendedDuration}
                      </span>
                    )}
                  </div>

                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label htmlFor="portOfArrival" className="form-label">
                      {t('form.port')} <span className="required" aria-label="required">*</span>
                    </label>
                    <select
                      id="portOfArrival"
                      className={`form-input form-select ${errors.portOfArrival ? 'error' : ''}`}
                      value={localDraft.portOfArrival || ''}
                      onChange={(e) => update('portOfArrival', e.target.value)}
                      aria-required="true"
                      aria-describedby={errors.portOfArrival ? 'port-err' : undefined}
                    >
                      <option value="">{t('form.port.placeholder')}</option>
                      <option value="DEL">Indira Gandhi International Airport, Delhi</option>
                      <option value="BOM">Chhatrapati Shivaji Maharaj Airport, Mumbai</option>
                      <option value="MAA">Chennai International Airport</option>
                      <option value="BLR">Kempegowda International Airport, Bengaluru</option>
                      <option value="CCU">Netaji Subhas Chandra Bose Airport, Kolkata</option>
                      <option value="HYD">Rajiv Gandhi International Airport, Hyderabad</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.portOfArrival && (
                      <span id="port-err" className="form-error" role="alert">
                        <AlertCircle size={12} aria-hidden="true" /> {errors.portOfArrival}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5 — Documents */}
            {step === 5 && (
              <div>
                <h2 className="app-step-title">{t('app.step.documents.title')}</h2>
                <p className="app-step-desc text-secondary mb-6">
                  {t('app.step.documents.desc').replace('{visaName}', selectedVisa?.name || 'visa')}
                </p>

                <div className="doc-checklist">
                  {(selectedVisa?.documentsRequired || []).map((doc, i) => (
                    <div key={i} className="doc-item">
                      <div className="doc-icon" aria-hidden="true">📄</div>
                      <div className="doc-name">{doc}</div>
                      <div className="doc-status badge badge-gray">Required (Demo)</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 6 — Review */}
            {step === 6 && (
              <div>
                <h2 className="app-step-title">{t('app.step.review.title')}</h2>
                <p className="app-step-desc text-secondary mb-6">
                  {t('app.step.review.desc')}
                </p>

                <div className="review-sections">
                  <div className="review-section">
                    <div className="review-section-header">
                      <h3>{t('app.step.visa')}</h3>
                      <button className="btn btn-ghost btn-sm" onClick={() => setStep(1)}>{t('review.edit')}</button>
                    </div>
                    <p>{selectedVisa?.name || '—'}</p>
                  </div>
                  <div className="review-section">
                    <div className="review-section-header">
                      <h3>{t('app.step.applicant')}</h3>
                      <button className="btn btn-ghost btn-sm" onClick={() => setStep(3)}>{t('review.edit')}</button>
                    </div>
                    <div className="review-grid">
                      {[
                        { label: t('form.fullName'), value: localDraft.fullName },
                        { label: t('form.dob'), value: localDraft.dateOfBirth },
                        { label: t('form.nationality'), value: localDraft.nationality },
                        { label: t('form.passport'), value: localDraft.passportNumber },
                        { label: t('form.email'), value: localDraft.email },
                        { label: t('form.phone'), value: localDraft.phone },
                      ].map(({ label, value }) => (
                        <div key={label} className="review-item">
                          <div className="review-label">{label}</div>
                          <div className="review-value">{value || '—'}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="review-section">
                    <div className="review-section-header">
                      <h3>{t('app.step.travel')}</h3>
                      <button className="btn btn-ghost btn-sm" onClick={() => setStep(4)}>{t('review.edit')}</button>
                    </div>
                    <div className="review-grid">
                      {[
                        { label: t('form.purpose'), value: localDraft.purposeOfVisit },
                        { label: t('form.arrival'), value: localDraft.intendedArrivalDate },
                        { label: t('form.duration'), value: localDraft.intendedDuration },
                        { label: t('form.port'), value: localDraft.portOfArrival },
                      ].map(({ label, value }) => (
                        <div key={label} className="review-item">
                          <div className="review-label">{label}</div>
                          <div className="review-value">{value || '—'}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="app-nav">
          {step > 1 && (
            <button className="btn btn-ghost" onClick={handleBack} aria-label="Go to previous step">
              ← {t('app.back')}
            </button>
          )}
          <div className="app-nav-right">
            <button className="btn btn-ghost btn-sm" onClick={handleSave} aria-label="Save progress">
              {t('app.save')}
            </button>
            {step < 6 ? (
              <button className="btn btn-primary" onClick={handleNext} aria-label="Continue to next step">
                {t('app.next')} →
              </button>
            ) : (
              <button className="btn btn-saffron" onClick={handleSubmit} aria-label="Submit application">
                {t('app.submit')} →
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
