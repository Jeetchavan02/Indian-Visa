import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AccessibilityState } from '../types';

interface AccessibilityContextValue extends AccessibilityState {
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  resetAccessibility: () => void;
}

const defaultState: AccessibilityState = {
  fontSize: 16,
  highContrast: false,
  reducedMotion: false,
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AccessibilityState>(() => {
    try {
      const stored = localStorage.getItem('ivo-accessibility');
      return stored ? JSON.parse(stored) : defaultState;
    } catch {
      return defaultState;
    }
  });

  useEffect(() => {
    localStorage.setItem('ivo-accessibility', JSON.stringify(state));
    const root = document.documentElement;
    root.style.setProperty('--base-font-size', `${state.fontSize}px`);
    if (state.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    if (state.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
  }, [state]);

  const increaseFontSize = () =>
    setState((s) => ({ ...s, fontSize: Math.min(s.fontSize + 2, 24) }));
  const decreaseFontSize = () =>
    setState((s) => ({ ...s, fontSize: Math.max(s.fontSize - 2, 12) }));
  const toggleHighContrast = () =>
    setState((s) => ({ ...s, highContrast: !s.highContrast }));
  const toggleReducedMotion = () =>
    setState((s) => ({ ...s, reducedMotion: !s.reducedMotion }));
  const resetAccessibility = () => setState(defaultState);

  return (
    <AccessibilityContext.Provider
      value={{
        ...state,
        increaseFontSize,
        decreaseFontSize,
        toggleHighContrast,
        toggleReducedMotion,
        resetAccessibility,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used inside AccessibilityProvider');
  return ctx;
}
