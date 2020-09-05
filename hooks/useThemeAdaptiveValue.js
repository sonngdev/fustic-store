import { useState, useEffect } from 'react';

export default function useThemeAdaptiveValue(lightThemeValue, darkThemeValue) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const updateValue = () => {
      const newValue = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? darkThemeValue
        : lightThemeValue;
      setValue(newValue);
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateValue);
    updateValue();
  }, []);

  return value;
}
