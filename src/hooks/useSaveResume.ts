import { useState, useEffect } from 'react';
import type { ApplicationDraft } from '../types';

const STORAGE_KEY = 'ivo-application-draft';

const defaultDraft: ApplicationDraft = {
  step: 1,
  visaType: '',
  fullName: '',
  dateOfBirth: '',
  nationality: '',
  passportNumber: '',
  email: '',
  phone: '',
  purposeOfVisit: '',
  intendedArrivalDate: '',
  intendedDuration: '',
  portOfArrival: '',
};

export function useSaveResume() {
  const [draft, setDraft] = useState<ApplicationDraft>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultDraft;
    } catch {
      return defaultDraft;
    }
  });

  const [hasSavedDraft, setHasSavedDraft] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return false;
      const parsed = JSON.parse(stored) as ApplicationDraft;
      return parsed.step > 1 || parsed.visaType !== '';
    } catch {
      return false;
    }
  });

  const saveDraft = (data: Partial<ApplicationDraft>) => {
    setDraft((prev) => {
      const updated = { ...prev, ...data };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setHasSavedDraft(true);
      return updated;
    });
  };

  const clearDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
    setDraft(defaultDraft);
    setHasSavedDraft(false);
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ApplicationDraft;
        setHasSavedDraft(parsed.step > 1 || parsed.visaType !== '');
      } catch {
        setHasSavedDraft(false);
      }
    }
  }, []);

  return { draft, saveDraft, clearDraft, hasSavedDraft };
}
