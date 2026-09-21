import { Type, Contrast, Minimize2, RotateCcw } from 'lucide-react';
import { useAccessibility } from '../../hooks/useAccessibility';
import './AccessibilityPanel.css';

export default function AccessibilityPanel() {
  const {
    fontSize,
    highContrast,
    reducedMotion,
    increaseFontSize,
    decreaseFontSize,
    toggleHighContrast,
    toggleReducedMotion,
    resetAccessibility,
  } = useAccessibility();

  return (
    <div className="a11y-panel" role="region" aria-label="Accessibility options">
      <h3 className="a11y-title">Accessibility</h3>

      {/* Text Size */}
      <div className="a11y-section">
        <div className="a11y-label">
          <Type size={14} aria-hidden="true" />
          Text Size <span className="a11y-value">{fontSize}px</span>
        </div>
        <div className="a11y-controls">
          <button
            className="a11y-btn"
            onClick={decreaseFontSize}
            disabled={fontSize <= 12}
            aria-label="Decrease text size"
            title="Decrease"
          >
            A−
          </button>
          <button
            className="a11y-btn"
            onClick={increaseFontSize}
            disabled={fontSize >= 24}
            aria-label="Increase text size"
            title="Increase"
          >
            A+
          </button>
        </div>
      </div>

      {/* High Contrast */}
      <div className="a11y-section">
        <label className="a11y-toggle" htmlFor="high-contrast-toggle">
          <Contrast size={14} aria-hidden="true" />
          High Contrast
        </label>
        <button
          id="high-contrast-toggle"
          role="switch"
          aria-checked={highContrast}
          className={`toggle-switch ${highContrast ? 'on' : ''}`}
          onClick={toggleHighContrast}
          aria-label="Toggle high contrast mode"
        >
          <span className="toggle-knob" />
        </button>
      </div>

      {/* Reduced Motion */}
      <div className="a11y-section">
        <label className="a11y-toggle" htmlFor="reduced-motion-toggle">
          <Minimize2 size={14} aria-hidden="true" />
          Reduce Motion
        </label>
        <button
          id="reduced-motion-toggle"
          role="switch"
          aria-checked={reducedMotion}
          className={`toggle-switch ${reducedMotion ? 'on' : ''}`}
          onClick={toggleReducedMotion}
          aria-label="Toggle reduced motion"
        >
          <span className="toggle-knob" />
        </button>
      </div>

      <button
        className="a11y-reset"
        onClick={resetAccessibility}
        aria-label="Reset all accessibility settings to default"
      >
        <RotateCcw size={12} aria-hidden="true" />
        Reset to defaults
      </button>
    </div>
  );
}
