import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Globe, Accessibility, Menu, X, ChevronDown, User } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useAccessibility } from '../../hooks/useAccessibility';
import type { Language } from '../../types';
import AccessibilityPanel from './AccessibilityPanel';
import './Header.css';

export default function Header() {
  const { t, language, setLanguage, languageNames } = useLanguage();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [a11yOpen, setA11yOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const a11yRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (a11yRef.current && !a11yRef.current.contains(e.target as Node)) setA11yOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [navigate]);

  useEffect(() => {
    if (!mobileOpen) return;
    const firstFocusable = mobileRef.current?.querySelector<HTMLElement>('a, button');
    firstFocusable?.focus();
  }, [mobileOpen]);

  const navLinks = [
    { href: '/', label: t('nav.home', 'Home') },
    { href: '/visa-info', label: t('nav.visaInfo', 'Visa Information') },
    { href: '/apply', label: t('nav.application', 'Application') },
    { href: '/track', label: t('nav.track', 'Track Status') },
    { href: '/help', label: t('nav.help', 'Help') },
  ];

  const languages: Language[] = ['en', 'hi', 'mr', 'ta', 'te', 'bn', 'gu', 'kn', 'ml', 'pa'];

  return (
    <>
      <header className="site-header" role="banner">
        <div className="container">
          <div className="header-inner">
            <Link to="/" className="site-logo" aria-label="Indian Visa Online — Home">
              <div className="logo-icon-v2" aria-hidden="true">
                <div className="logo-stripe-v2 saffron" />
                <div className="logo-stripe-v2 white">
                  <div className="ashoka-chakra" />
                </div>
                <div className="logo-stripe-v2 green" />
              </div>
              <div className="logo-text">
                <span className="logo-name">{t('site.name', 'Indian Visa Online')}</span>
              </div>
            </Link>

            <nav className="desktop-nav" aria-label="Main navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === '/'}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'nav-link--active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="header-actions">
              <div className="dropdown-wrapper" ref={langRef}>
                <button
                  id="lang-btn"
                  className="icon-btn"
                  onClick={() => { setLangOpen(!langOpen); setA11yOpen(false); }}
                  aria-haspopup="listbox"
                  aria-expanded={langOpen}
                  aria-label={t('nav.language', 'Language')}
                  title={t('nav.language', 'Language')}
                >
                  <Globe size={18} aria-hidden="true" />
                  <span className="icon-btn-label">{languageNames[language].slice(0, 2)}</span>
                  <ChevronDown size={14} aria-hidden="true" />
                </button>
                {langOpen && (
                  <div className="dropdown lang-dropdown" role="listbox" aria-labelledby="lang-btn">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        role="option"
                        aria-selected={lang === language}
                        className={`dropdown-item ${lang === language ? 'selected' : ''}`}
                        onClick={() => { setLanguage(lang); setLangOpen(false); }}
                      >
                        {languageNames[lang]}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="dropdown-wrapper" ref={a11yRef}>
                <button
                  id="a11y-btn"
                  className="icon-btn"
                  onClick={() => { setA11yOpen(!a11yOpen); setLangOpen(false); }}
                  aria-haspopup="dialog"
                  aria-expanded={a11yOpen}
                  aria-label={t('nav.accessibility', 'Accessibility')}
                  title={t('nav.accessibility', 'Accessibility')}
                >
                  <Accessibility size={18} aria-hidden="true" />
                </button>
                {a11yOpen && (
                  <div className="dropdown a11y-dropdown" role="dialog" aria-label="Accessibility options">
                    <AccessibilityPanel />
                  </div>
                )}
              </div>

              <Link to="/account" className="icon-btn" title={t('nav.account', 'Account')} aria-label={t('nav.account', 'Account')}>
                <User size={18} aria-hidden="true" />
              </Link>

              <Link to="/apply" className="btn btn-primary btn-sm header-cta">
                {t('nav.apply', 'Apply')}
              </Link>

              <button
                className="hamburger-btn"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          ref={mobileRef}
        >
          <div className="mobile-menu-inner">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === '/'}
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? 'mobile-nav-link--active' : ''}`
                }
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mobile-menu-divider" />
            <Link
              to="/account"
              className="mobile-nav-link"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.account', 'Account')}
            </Link>
            <Link
              to="/apply"
              className="btn btn-primary btn-full mt-2"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.apply', 'Apply')}
            </Link>

            <div className="mobile-lang-section">
              <p className="mobile-lang-label"><Globe size={14} /> {t('nav.language', 'Language')}</p>
              <div className="mobile-lang-grid">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    className={`mobile-lang-btn ${lang === language ? 'selected' : ''}`}
                    onClick={() => { setLanguage(lang); }}
                    aria-pressed={lang === language}
                  >
                    {languageNames[lang]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
