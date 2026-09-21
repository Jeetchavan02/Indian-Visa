import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileText, CheckCircle, MapPin, Search } from 'lucide-react';
import './HomePage.css';

export default function HomePage() {
  return (
    <main className="landing-main">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="container landing-hero-container">
          
          <div className="hero-content-left">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              INDIAN VISA ONLINE — ACADEMIC REDESIGN
            </div>
            
            <h1 className="landing-title">
              Apply for an Indian Visa<br/>with Confidence
            </h1>
            
            <p className="landing-subtitle">
              A simple, guided way to understand visa<br/>
              requirements, check eligibility and manage your<br/>
              application.
            </p>
            
            <div className="resume-box">
              <CheckCircle2 size={16} className="text-gray-400" />
              <span>Your application progress has been saved.</span>
              <Link to="/apply" className="resume-link">Resume Application &rarr;</Link>
            </div>
            
            <div className="hero-actions">
              <Link to="/plan" className="btn btn-saffron btn-lg hero-btn-primary">
                Start Application <ArrowRight size={20} />
              </Link>
              <Link to="/track" className="btn btn-secondary btn-lg hero-btn-secondary">
                Track Application
              </Link>
            </div>
            
            <div className="hero-footer-link">
              <span className="text-gray-400">Not sure which visa you need?</span>
              <Link to="/finder" className="find-visa-link">Find My Visa &rarr;</Link>
            </div>
          </div>

          <div className="hero-content-right">
            <div className="progress-graphic">
              <div className="graphic-header">
                <div className="graphic-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <span className="graphic-title">APPLICATION PROGRESS</span>
              </div>
              
              <div className="graphic-steps">
                <div className="g-step completed">
                  <div className="g-circle"><CheckCircle2 size={16} /></div>
                  <span className="g-label">Visa</span>
                </div>
                <div className="g-step completed">
                  <div className="g-circle"><CheckCircle2 size={16} /></div>
                  <span className="g-label">Eligibility</span>
                </div>
                <div className="g-step current">
                  <div className="g-circle">3</div>
                  <span className="g-label">Applicant</span>
                </div>
                <div className="g-step pending">
                  <div className="g-circle">4</div>
                  <span className="g-label">Travel</span>
                </div>
                <div className="g-step pending">
                  <div className="g-circle">5</div>
                  <span className="g-label">Review</span>
                </div>
              </div>
              
              <div className="graphic-skeleton">
                <div className="skel-line full"></div>
                <div className="skel-line partial"></div>
                <div className="skel-line full mt"></div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Action Cards Section */}
      <section className="landing-actions-section">
        <div className="container">
          <h2 className="actions-title text-center">What would you like to do?</h2>
          
          <div className="action-cards-grid">
            
            <Link to="/plan" className="action-card">
              <div className="ac-icon-wrapper ac-gray">
                <FileText size={24} />
              </div>
              <div className="ac-content">
                <h3>Apply for a Visa</h3>
                <p>Start a new visa application.</p>
              </div>
              <div className="ac-arrow"><ArrowRight size={18} /></div>
            </Link>

            <Link to="/finder" className="action-card ac-active">
              <div className="ac-icon-wrapper ac-green">
                <CheckCircle size={24} />
              </div>
              <div className="ac-content">
                <h3>Check Eligibility</h3>
                <p>Find visa options based on your travel purpose.</p>
              </div>
              <div className="ac-arrow"><ArrowRight size={18} /></div>
            </Link>

            <Link to="/track" className="action-card">
              <div className="ac-icon-wrapper ac-orange">
                <MapPin size={24} />
              </div>
              <div className="ac-content">
                <h3>Track Application</h3>
                <p>Check the status of an existing application.</p>
              </div>
              <div className="ac-arrow"><ArrowRight size={18} /></div>
            </Link>

            <Link to="/visa-info" className="action-card">
              <div className="ac-icon-wrapper ac-gray">
                <Search size={24} />
              </div>
              <div className="ac-content">
                <h3>View Requirements</h3>
                <p>Find documents, eligibility and other requirements.</p>
              </div>
              <div className="ac-arrow"><ArrowRight size={18} /></div>
            </Link>

          </div>
        </div>
      </section>
    </main>
  );
}
