import React from 'react';
import { useLanguage } from '../../../hooks/useLanguage';

interface PurposeSelectionProps {
  onSelect: (purposeId: string) => void;
  selectedPurposeId: string | null;
}

const purposes = [
  { id: 'tourist', icon: '🏛️', labelKey: 'home.visa.tourist', defaultLabel: 'Tourism' },
  { id: 'business', icon: '💼', labelKey: 'home.visa.business', defaultLabel: 'Business' },
  { id: 'medical', icon: '⚕️', labelKey: 'home.visa.medical', defaultLabel: 'Medical' },
  { id: 'student', icon: '🎓', labelKey: 'home.visa.student', defaultLabel: 'Student' },
  { id: 'employment', icon: '🏗️', labelKey: 'home.visa.employment', defaultLabel: 'Employment' },
  { id: 'transit', icon: '✈️', labelKey: 'home.visa.other', defaultLabel: 'Transit' },
];

export default function PurposeSelection({ onSelect, selectedPurposeId }: PurposeSelectionProps) {
  const { t } = useLanguage();

  return (
    <div className="purpose-selection-section">
      <h2 className="purpose-title">{t('visaInfo.purposeTitle', 'What is the purpose of your visit?')}</h2>
      <p className="purpose-subtitle">{t('visaInfo.purposeSubtitle', 'Select the primary reason for your travel to India.')}</p>
      
      <div className="purpose-grid">
        {purposes.map((p) => (
          <button
            key={p.id}
            className={`purpose-tile ${selectedPurposeId === p.id ? 'selected' : ''}`}
            onClick={() => onSelect(p.id)}
            aria-pressed={selectedPurposeId === p.id}
          >
            <span className="purpose-icon" aria-hidden="true">{p.icon}</span>
            <span className="purpose-label">{t(p.labelKey, p.defaultLabel)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
