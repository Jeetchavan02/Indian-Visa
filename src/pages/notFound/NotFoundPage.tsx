import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import './NotFoundPage.css';

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <main id="main-content" className="page-content not-found-page">
      <div className="container-sm text-center">
        <div className="not-found-number" aria-hidden="true">404</div>
        <h1 className="not-found-title">{t('notFound.title')}</h1>
        <p className="not-found-message">{t('notFound.message')}</p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary btn-lg">
            {t('notFound.home')}
          </Link>
          <Link to="/help" className="btn btn-secondary">
            Go to Help
          </Link>
        </div>
        <div className="not-found-links">
          <p className="text-secondary text-sm mb-4">Or try one of these:</p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { href: '/visa-types', label: 'Visa Types' },
              { href: '/apply', label: 'Apply' },
              { href: '/track', label: 'Track' },
              { href: '/search', label: 'Search' },
            ].map((link) => (
              <Link key={link.href} to={link.href} className="btn btn-ghost btn-sm">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
