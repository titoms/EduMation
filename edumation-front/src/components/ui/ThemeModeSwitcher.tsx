import { useEffect, useState } from 'react';
import useDarkMode from '../../utils/useDarkMode';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useThemeContext } from '../../context/ThemeContext';

const ThemeModeSwitcher = () => {
  const { toggleColorMode, mode } = useThemeContext();
  const isDarkMode = mode === 'dark';
  const [colorTheme, setTheme] = useDarkMode();
  const [darkMode, setDarkMode] = useState(colorTheme === 'light');

  useEffect(() => {
    setDarkMode(colorTheme === 'light');
  }, [colorTheme]);

  const toggleDarkMode = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
    setDarkMode(checked);
    toggleColorMode();
  };

  return (
    <>
      <div className="rounded-lg p-2 bg-blue-500 dark:bg-slate-800">
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          size={22}
        />
      </div>
    </>
  );
};

export default ThemeModeSwitcher;
