import { useLanguage } from '../../hooks/useLanguage';

export default function AccountPage() {
  const { t } = useLanguage();

  return (
    <main id="main-content" className="page-content">
      <div className="container" style={{ padding: '4rem 1rem', maxWidth: '400px' }}>
        <h1 className="text-h2" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>{t('nav.account', 'Account')}</h1>
        <div className="card">
          <div className="card-body">
            <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
              Sign in to manage your applications.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Email</label>
                <input type="email" className="form-input" placeholder="user@example.com" />
              </div>
              <div>
                <label className="form-label">Password</label>
                <input type="password" className="form-input" placeholder="••••••••" />
              </div>
              <button className="btn btn-primary" style={{ marginTop: '0.5rem' }}>Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
