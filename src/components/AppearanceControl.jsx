import { useEffect, useId, useRef } from 'react';
import { FiMonitor, FiMoon, FiSun } from 'react-icons/fi';
import { useColorScheme } from '../hooks/useColorScheme';

export default function AppearanceControl() {
  const { preference, systemDark, choosePreference } = useColorScheme();
  const ref = useRef(null);
  const id = useId();
  const Icon = preference === 'system' ? FiMonitor : preference === 'dark' ? FiMoon : FiSun;

  useEffect(() => {
    const onPointer = event => {
      if (!ref.current?.contains(event.target)) ref.current?.removeAttribute('open');
    };
    const onEscape = event => {
      if (event.key === 'Escape' && ref.current?.open) {
        ref.current.removeAttribute('open');
        ref.current.querySelector('summary').focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  return (
    <details className="aqua-appearance" ref={ref}>
      <summary className="aqua-icon-button" aria-label="Appearance settings" title="Appearance settings">
        <Icon aria-hidden="true" />
      </summary>
      <fieldset className="aqua-appearance-panel">
        <legend>Appearance</legend>
        {[
          { value: 'system', icon: FiMonitor, label: 'Use device settings', detail: `Currently ${systemDark ? 'dark' : 'light'}` },
          { value: 'light', icon: FiSun, label: 'Light', detail: 'A brighter view' },
          { value: 'dark', icon: FiMoon, label: 'Dark', detail: 'A quieter view' },
        ].map(option => (
          <label key={option.value}>
            <option.icon aria-hidden="true" />
            <span>{option.label}<small>{option.detail}</small></span>
            <input type="radio" name={id} value={option.value} checked={preference === option.value} onChange={() => choosePreference(option.value)} />
          </label>
        ))}
      </fieldset>
    </details>
  );
}
