import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../../hooks/useLanguage';

interface VisaDetailsProps {
  purposeId: string;
}

const Accordion = ({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="info-accordion">
      <button 
        className="accordion-header" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="accordion-content">
          {children}
        </div>
      )}
    </div>
  );
};

export default function VisaDetails({ purposeId }: VisaDetailsProps) {
  const { t } = useLanguage();

  // Mocked details based on purpose
  const getDetails = (id: string) => {
    switch(id) {
      case 'tourist':
        return {
          title: t('visa.tourist.title', 'e-Tourist Visa'),
          desc: 'For recreation, sightseeing, casual visit to meet friends or relatives, short duration medical treatment or casual business visit.',
          duration: '30 Days to 5 Years',
          entries: 'Multiple',
          fee: '$25 - $80',
          eligibility: [
            'Applicant\'s passport should have at least six months validity from the date of arrival in India.',
            'Passport should have at least two blank pages for stamping by the Immigration Officer.',
            'Applicants must have return ticket or onward journey ticket, with sufficient money to spend during their stay in India.'
          ],
          documents: [
            'Scanned Bio Page of the passport showing the Photograph and Details',
            'Recent Passport size Photograph',
            'Return/Onward Ticket'
          ]
        };
      default:
        return {
          title: t('visa.business.title', 'e-Business Visa'),
          desc: 'For all short term business purposes including attending technical/business meetings, setting up industrial/business venture, delivering lectures under Global Initiative for Academic Networks (GIAN) etc.',
          duration: 'Up to 1 Year',
          entries: 'Multiple',
          fee: '$80 - $100',
          eligibility: [
            'Passport should have at least six months validity from the date of arrival in India.',
            'Business purpose must be genuine.',
            'Must not be intending to start a long-term business or seeking employment in India.'
          ],
          documents: [
            'Scanned Bio Page of the passport',
            'Recent Passport size Photograph',
            'Copy of Business Card',
            'Invitation Letter from Indian Party (Optional but recommended)'
          ]
        };
    }
  };

  const details = getDetails(purposeId);

  return (
    <div className="visa-details-section">
      <div className="visa-main-info">
        <h2 className="visa-detail-title">{details.title}</h2>
        <p className="visa-detail-desc">{details.desc}</p>

        <Accordion title={t('visaInfo.eligibility', 'Eligibility Requirements')} defaultOpen={true}>
          <ul>
            {details.eligibility.map((item, i) => (
              <li key={i}>
                <CheckCircle className="list-icon" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Accordion>

        <Accordion title={t('visaInfo.documents', 'Required Documents')} defaultOpen={true}>
          <ul>
            {details.documents.map((item, i) => (
              <li key={i}>
                <FileText className="list-icon" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Accordion>
      </div>

      <div className="visa-sidebar">
        <div className="visa-action-card">
          <h3 className="text-h3" style={{ color: 'var(--color-navy)' }}>{t('visaInfo.summary', 'Visa Summary')}</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div className="text-sm text-secondary">Validity</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                <Clock size={16} /> {details.duration}
              </div>
            </div>
            <div>
              <div className="text-sm text-secondary">Entries Allowed</div>
              <div style={{ fontWeight: 600 }}>{details.entries}</div>
            </div>
            <div>
              <div className="text-sm text-secondary">Estimated Fee</div>
              <div style={{ fontWeight: 600 }}>{details.fee}</div>
            </div>
          </div>

          <Link to="/apply" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
            {t('nav.apply', 'Start Application')}
          </Link>
        </div>
      </div>
    </div>
  );
}
