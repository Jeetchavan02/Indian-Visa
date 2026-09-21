import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { href: '/visa-types', label: t('nav.visaTypes') },
    { href: '/requirements', label: t('nav.requirements') },
    { href: '/how-to-apply', label: t('nav.howToApply') },
    { href: '/track', label: t('nav.track') },
    { href: '/help', label: t('nav.help') },
  ];

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon" aria-hidden="true">
                <div className="logo-stripe saffron" />
                <div className="logo-stripe white" />
                <div className="logo-stripe green" />
              </div>
              <div>
                <div className="footer-site-name">{t('site.name')}</div>
                <div className="footer-site-tagline">{t('site.tagline')}</div>
              </div>
            </div>
            <p className="footer-disclaimer-text">
              {t('footer.disclaimer')}
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            <h3 className="footer-nav-title">Navigation</h3>
            <ul className="footer-nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="footer-nav-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-info">
            <h3 className="footer-nav-title">Quick Actions</h3>
            <ul className="footer-nav-list">
              <li>
                <Link to="/apply" className="footer-nav-link">Apply for a Visa</Link>
              </li>
              <li>
                <Link to="/track" className="footer-nav-link">Track Application</Link>
              </li>
              <li>
                <Link to="/visa-finder" className="footer-nav-link">Find My Visa</Link>
              </li>
              <li>
                <Link to="/search" className="footer-nav-link">Search</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-rights">{t('footer.rights')}</p>
          <p className="footer-academic-note">
            Academic HMI Project · Not an official Government of India service
          </p>
        </div>
      </div>
    </footer>
  );
}
