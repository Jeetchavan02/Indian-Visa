import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, X } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { searchResults } from '../../data/miscData';
import './SearchPage.css';

const SUGGESTED = [
  'Visa Requirements',
  'Visa Fees',
  'Processing Information',
  'Documents Required',
  'Application Status',
  'Visa Types',
];

export default function SearchPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = searched && query.trim()
    ? searchResults.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          r.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSearch = () => {
    if (query.trim()) setSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleClear = () => {
    setQuery('');
    setSearched(false);
    inputRef.current?.focus();
  };

  return (
    <main id="main-content" className="page-content">
      <div className="page-hero-sm">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">Search</span>
          </nav>
          <h1 className="text-h1">Search Visa Information</h1>
          <p className="page-hero-desc">Find information about visa types, requirements, processing and more.</p>
        </div>
      </div>

      <section className="section-sm">
        <div className="container-md">
          {/* Search Bar */}
          <div className="search-page-bar" role="search">
            <label htmlFor="search-input" className="sr-only">Search visa information</label>
            <div className="search-bar search-bar-lg">
              <Search size={20} aria-hidden="true" className="search-icon-left" />
              <input
                id="search-input"
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('search.placeholder')}
                aria-label="Search visa information"
                aria-describedby="search-hint"
              />
              {query && (
                <button
                  className="search-clear-btn"
                  onClick={handleClear}
                  aria-label="Clear search"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              )}
            </div>
            <button
              className="btn btn-primary"
              onClick={handleSearch}
              aria-label="Search"
              disabled={!query.trim()}
            >
              {t('btn.search')}
            </button>
          </div>
          <p id="search-hint" className="sr-only">Press Enter or click Search to find results</p>

          {/* Suggested Searches */}
          {!searched && (
            <div className="search-suggestions">
              <p className="suggestions-label">Suggested searches:</p>
              <div className="suggestions-list">
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    className="suggestion-pill"
                    onClick={() => { setQuery(s); setSearched(true); }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {searched && (
            <div className="search-results" role="region" aria-live="polite" aria-label="Search results">
              {results.length === 0 ? (
                <div className="search-empty">
                  <div className="search-empty-icon" aria-hidden="true">🔍</div>
                  <h3>{t('search.noResults')}</h3>
                  <p className="text-secondary">{t('search.tryAnother')}</p>
                  <div className="suggestions-list mt-4">
                    {SUGGESTED.map((s) => (
                      <button
                        key={s}
                        className="suggestion-pill"
                        onClick={() => { setQuery(s); }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <p className="search-count" aria-live="polite">
                    {results.length} result{results.length !== 1 ? 's' : ''} for "<strong>{query}</strong>"
                  </p>
                  <div className="search-results-list">
                    {results.map((result) => (
                      <Link key={result.id} to={result.href} className="search-result-card">
                        <div className="src-category badge badge-gray">{result.category}</div>
                        <h3 className="src-title">{result.title}</h3>
                        <p className="src-excerpt">{result.excerpt}</p>
                        <span className="src-link">View →</span>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
