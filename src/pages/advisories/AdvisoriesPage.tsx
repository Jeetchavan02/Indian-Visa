import { Link } from 'react-router-dom';
import { ChevronRight, AlertTriangle, Info, AlertOctagon } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { advisories } from '../../data/miscData';
import './AdvisoriesPage.css';

const severityIcon = {
  info: <Info size={18} aria-hidden="true" />,
  warning: <AlertTriangle size={18} aria-hidden="true" />,
  caution: <AlertOctagon size={18} aria-hidden="true" />,
};

const severityClass = {
  info: 'advisory-info',
  warning: 'advisory-warning',
  caution: 'advisory-caution',
};

export default function AdvisoriesPage() {
  const { t } = useLanguage();

  const categories = [...new Set(advisories.map((a) => a.category))];

  return (
    <main id="main-content" className="page-content">
      <div className="page-hero-sm">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">Advisories</span>
          </nav>
          <h1 className="text-h1">Visa Advisories</h1>
          <p className="page-hero-desc">
            Important information for visa applicants. All advisories are for demonstration purposes.
          </p>
          <div className="badge badge-demo">{t('demo.badge')}</div>
        </div>
      </div>

      <section className="section-sm">
        <div className="container-md">
          <div className="alert alert-warning mb-8">
            <span className="alert-icon">⚠️</span>
            <span>
              All advisories shown are demo information for academic HMI evaluation purposes. 
              They do not constitute official government advice.
            </span>
          </div>

          {categories.map((cat) => (
            <div key={cat} className="advisory-category mb-8">
              <h2 className="advisory-category-title">{cat}</h2>
              <div className="advisory-cards">
                {advisories
                  .filter((a) => a.category === cat)
                  .map((advisory) => (
                    <div
                      key={advisory.id}
                      className={`advisory-card ${severityClass[advisory.severity]}`}
                      role="article"
                      aria-label={advisory.title}
                    >
                      <div className="advisory-card-icon" aria-hidden="true">
                        {severityIcon[advisory.severity]}
                      </div>
                      <div className="advisory-card-content">
                        <h3 className="advisory-card-title">{advisory.title}</h3>
                        <p className="advisory-card-body">{advisory.content}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
