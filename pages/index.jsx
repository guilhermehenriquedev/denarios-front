import React, { useState, useEffect } from "react";
import api from "@/config/api.jsx";
import AppBar from '@/components/AppBar'
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import { useTheme, ThemeProvider, createTheme } from '@material-ui/core/styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function MyApp() {
  const [cryptos, setCrypto] = useState([]);

  useEffect(() => {
    async function loadCryptos() {
      try {
        const response = await api.get("/exchanges/list/");
        setCrypto(response.data);
        console.log('response.....: ', response.data)
      } catch (err) {
        console.error(err);
      }
    }
    loadCryptos();
  }, []);

  if (cryptos.length == 0) {
    return null;
  }
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <>
      <Box
        sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          color: 'text.primary',
          borderRadius: 1,
          p: 3,
        }}
      >
        <AppBar/>
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <div>
          {cryptos.data.binance.map(item => (
            <div key={item.no_cripto}>
              <h2>{item.no_cripto}</h2>
              <span>{item.vl_compra}</span>
              <span>{item.vl_venda}</span>
            </div>
          ))}
        </div>
      </Box>
    </>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}