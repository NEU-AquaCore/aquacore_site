import { useEffect, useState } from 'react';

const storageKey = 'aquacore-color-scheme';
const normalize = value => value === 'light' || value === 'dark' ? value : 'system';

function readPreference() {
  try { return normalize(localStorage.getItem(storageKey)); }
  catch { return 'system'; }
}

function applyPreference(preference, systemDark) {
  const resolved = preference === 'system' ? (systemDark ? 'dark' : 'light') : preference;
  document.documentElement.dataset.theme = preference;
  document.querySelector('meta[name="color-scheme"]').content = preference === 'system' ? 'light dark' : preference;
  document.querySelectorAll('meta[name="theme-color"]').forEach(meta => {
    meta.content = resolved === 'dark' ? '#181818' : '#f6f7f9';
  });
}

export function useColorScheme() {
  const [preference, setPreference] = useState(readPreference);
  const [systemDark, setSystemDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = event => setSystemDark(event.matches);
    const onStorage = event => {
      if (event.key === storageKey || event.key === null) setPreference(readPreference());
    };
    media.addEventListener('change', onChange);
    window.addEventListener('storage', onStorage);
    return () => {
      media.removeEventListener('change', onChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  useEffect(() => applyPreference(preference, systemDark), [preference, systemDark]);

  function choosePreference(value) {
    const next = normalize(value);
    setPreference(next);
    applyPreference(next, systemDark);
    try {
      if (next === 'system') localStorage.removeItem(storageKey);
      else localStorage.setItem(storageKey, next);
    } catch { /* The selection still works without persistence. */ }
  }

  return { preference, systemDark, choosePreference };
}
