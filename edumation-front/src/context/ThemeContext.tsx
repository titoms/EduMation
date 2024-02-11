import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';

const ThemeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light',
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', mode);
    const root = window.document.documentElement;
    root.classList.remove(mode === 'dark' ? 'light' : 'dark');
    root.classList.add(mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ toggleColorMode, mode }}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
