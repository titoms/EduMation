import { useEffect, useState } from 'react';
import useDarkMode from '../../utils/useDarkMode';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const ThemeModeSwitcher = () => {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkMode, setDarkMode] = useState(colorTheme === 'light');

  useEffect(() => {
    setDarkMode(colorTheme === 'light');
  }, [colorTheme]);

  const toggleDarkMode = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
    setDarkMode(checked);
  };

  return (
    <>
      <div className="rounded-lg p-2 bg-gray-300 dark:bg-slate-800">
        <DarkModeSwitch
          checked={darkMode}
          onChange={toggleDarkMode}
          size={22}
        />
      </div>
    </>
  );
};

export default ThemeModeSwitcher;
