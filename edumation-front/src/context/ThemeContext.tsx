import { createContext, useContext, useMemo, useState } from 'react';
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';

const ThemeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light', // Add the current mode to the context
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('light'); // Use a simple state for theme mode

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
