import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useThemeContext } from '../../context/ThemeContext';

const ThemeModeSwitcher = () => {
  const { toggleColorMode, mode } = useThemeContext();
  const isDarkMode = mode === 'dark';

  return (
    <div className="rounded-lg p-2 bg-blue-500 dark:bg-slate-800">
      <DarkModeSwitch
        checked={isDarkMode}
        onChange={toggleColorMode}
        size={22}
      />
    </div>
  );
};

export default ThemeModeSwitcher;
