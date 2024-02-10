import { useEffect, useState } from 'react';
import useDarkMode from '../../utils/useDarkMode';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useThemeContext } from '../../context/ThemeContext';

const ThemeModeSwitcher = () => {
  const [colorTheme, setTheme] = useDarkMode();
  const { mode, toggleColorMode } = useThemeContext();
  const [darkMode, setDarkMode] = useState(colorTheme === 'light');

  useEffect(() => {
    setDarkMode(colorTheme === 'light');
  }, [colorTheme]);

  const toggleDarkMode = (checked: boolean) => {
    toggleColorMode();
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
