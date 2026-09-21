import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { faqs } from '../../data/faqData';
import './HelpPage.css';

export default function HelpPage() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <main id="main-content" className="page-content">
      <div className="page-hero-sm">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">{t('help.title')}</span>
          </nav>
          <h1 className="text-h1">{t('help.title')}</h1>
          <p className="page-hero-desc">
            Find answers to common questions about the Indian visa application process.
          </p>
          <div className="badge badge-demo">{t('demo.badge')}</div>
        </div>
      </div>

      <section className="section-sm">
        <div className="container-md">
          <div className="help-layout">
            <div className="help-main">
              <h2 className="help-section-title">{t('help.faqTitle')}</h2>

              <div role="list" aria-label="Frequently asked questions">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="accordion-item"
                    role="listitem"
                  >
                    <button
                      className="accordion-trigger"
                      aria-expanded={!!expanded[faq.id]}
                      onClick={() => toggle(faq.id)}
                      id={`faq-btn-${faq.id}`}
                      aria-controls={`faq-panel-${faq.id}`}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        size={18}
                        className="accordion-icon"
                        aria-hidden="true"
                      />
                    </button>
                    {expanded[faq.id] && (
                      <div
                        id={`faq-panel-${faq.id}`}
                        role="region"
                        aria-labelledby={`faq-btn-${faq.id}`}
                        className="accordion-content"
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Still need help */}
              <div className="still-need-help card mt-8">
                <div className="card-body">
                  <h3 className="snh-title">{t('help.stillNeedHelp')}</h3>
                  <p className="text-secondary mb-4">{t('help.contactNote')}</p>
                  <div className="alert alert-warning">
                    <span className="alert-icon">⚠️</span>
                    <span>
                      Contact information shown would be demo only. This is an academic prototype — please use official government channels for real visa inquiries.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick links sidebar */}
            <aside className="help-sidebar" aria-label="Quick links">
              <div className="card">
                <div className="card-body">
                  <h3 className="help-sidebar-title">Quick Links</h3>
                  <ul className="help-quick-links">
                    {[
                      { href: '/visa-types', label: 'Browse Visa Types' },
                      { href: '/visa-finder', label: 'Find My Visa' },
                      { href: '/apply', label: 'Start Application' },
                      { href: '/track', label: 'Track Application' },
                      { href: '/search', label: 'Search Information' },
                      { href: '/advisories', label: 'View Advisories' },
                    ].map((link) => (
                      <li key={link.href}>
                        <Link to={link.href} className="help-quick-link">
                          {link.label}
                          <ChevronRight size={14} aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
