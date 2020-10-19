import { useState, useEffect } from 'react';

export default function useThemeAdaptiveValue(lightThemeValue, darkThemeValue) {
  const [value, setValue] = useState(lightThemeValue);

  useEffect(() => {
    // Mutable object
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

    const updateValue = () => {
      const newValue = mediaQueryList.matches
        ? darkThemeValue
        : lightThemeValue;
      setValue(newValue);
    };

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', updateValue);
    } else {
      mediaQueryList.addListener(updateValue);
    }

    updateValue();
  }, []);

  return value;
}
