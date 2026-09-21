import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import './VisaFinderPage.css';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function VisaFinderPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState('');
  const [purpose, setPurpose] = useState('');
  const [duration, setDuration] = useState('');
  const [hasVisa, setHasVisa] = useState('');

  const nextStep = () => setStep(s => Math.min(s + 1, 5));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const purposes = ['Tourism', 'Business', 'Medical', 'Study', 'Employment', 'Transit', 'Conference', 'Other'];
  
  const handlePurposeSelect = (p: string) => {
    setPurpose(p);
    nextStep();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="finder-step-content fade-in">
            <h2 className="finder-q">Where are you travelling from?</h2>
            <p className="finder-desc">Select your country of origin or citizenship.</p>
            <div className="form-group mt-4">
              <select className="form-input form-select" value={country} onChange={e => setCountry(e.target.value)}>
                <option value="">Select country...</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="JP">Japan</option>
                <option value="SG">Singapore</option>
                <option value="DE">Germany</option>
                <option value="OTHER">Other Country</option>
              </select>
            </div>
            <div className="finder-actions mt-6">
              <button className="btn btn-primary" onClick={nextStep} disabled={!country}>
                Continue <ArrowRight size={18} />
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="finder-step-content fade-in">
            <h2 className="finder-q">What is the purpose of your visit?</h2>
            <p className="finder-desc">Choose the option that best describes why you are travelling to India.</p>
            <div className="purpose-grid mt-4">
              {purposes.map(p => (
                <button 
                  key={p}
                  className={`purpose-tile ${purpose === p ? 'selected' : ''}`}
                  onClick={() => handlePurposeSelect(p)}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="finder-actions mt-6">
              <button className="btn btn-ghost" onClick={prevStep}>
                <ArrowLeft size={18} /> Back
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="finder-step-content fade-in">
            <h2 className="finder-q">How long do you plan to stay?</h2>
            <div className="duration-options mt-4">
              <button className={`duration-tile ${duration === 'short' ? 'selected' : ''}`} onClick={() => { setDuration('short'); nextStep(); }}>
                <strong>Short term</strong>
                <span>Less than 30 days</span>
              </button>
              <button className={`duration-tile ${duration === 'medium' ? 'selected' : ''}`} onClick={() => { setDuration('medium'); nextStep(); }}>
                <strong>Medium term</strong>
                <span>1 to 6 months</span>
              </button>
              <button className={`duration-tile ${duration === 'long' ? 'selected' : ''}`} onClick={() => { setDuration('long'); nextStep(); }}>
                <strong>Long term</strong>
                <span>More than 6 months</span>
              </button>
            </div>
            <div className="finder-actions mt-6">
              <button className="btn btn-ghost" onClick={prevStep}>
                <ArrowLeft size={18} /> Back
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="finder-step-content fade-in">
            <h2 className="finder-q">Do you already have a valid Indian visa?</h2>
            <div className="duration-options mt-4">
              <button className={`duration-tile ${hasVisa === 'yes' ? 'selected' : ''}`} onClick={() => { setHasVisa('yes'); nextStep(); }}>
                Yes
              </button>
              <button className={`duration-tile ${hasVisa === 'no' ? 'selected' : ''}`} onClick={() => { setHasVisa('no'); nextStep(); }}>
                No
              </button>
            </div>
            <div className="finder-actions mt-6">
              <button className="btn btn-ghost" onClick={prevStep}>
                <ArrowLeft size={18} /> Back
              </button>
            </div>
          </div>
        );
      case 5:
        // Recommendation logic
        let recommendation = 'Regular / Paper Visa';
        let recDesc = 'Based on your long-term plans or specific purpose, a standard paper visa processed through an Indian Mission is recommended.';
        let linkTo = '/visa-info';
        let linkState = { service: 'regular' };

        if (hasVisa === 'yes') {
          recommendation = 'e-Arrival Card';
          recDesc = 'Since you already have a valid visa, you simply need to fill out your e-Arrival Card before entering India.';
          linkState = { service: 'earrival' };
        } else if (duration === 'short' && ['Tourism', 'Business', 'Medical', 'Conference'].includes(purpose)) {
          recommendation = 'eVisa';
          recDesc = 'You are likely eligible for an eVisa. This is a fast, entirely online process.';
          linkState = { service: 'evisa' };
        }

        return (
          <div className="finder-step-content text-center fade-in">
            <CheckCircle2 size={48} className="text-saffron mx-auto mb-4" />
            <h2 className="finder-q mb-2">We recommend:</h2>
            <h1 className="text-navy font-bold text-3xl mb-4">{recommendation}</h1>
            <p className="text-secondary mb-8 max-w-md mx-auto">{recDesc}</p>
            
            <div className="flex flex-col gap-3 justify-center max-w-xs mx-auto">
              <button className="btn btn-primary" onClick={() => navigate(linkTo, { state: linkState })}>
                View Requirements
              </button>
              <button className="btn btn-ghost" onClick={() => { setStep(1); setCountry(''); setPurpose(''); setDuration(''); setHasVisa(''); }}>
                Start over
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="finder-page page-content">
      <div className="container-md pt-8 pb-20">
        <div className="finder-card">
          <div className="finder-header">
            <h1 className="text-navy text-xl font-bold uppercase tracking-wide">Find the right visa</h1>
            {step < 5 && (
              <div className="finder-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }}></div>
                </div>
                <div className="progress-text">Step {step} of 4</div>
              </div>
            )}
          </div>
          
          <div className="finder-body">
            {renderStep()}
          </div>
        </div>
      </div>
    </main>
  );
}
