import React, { useState, useEffect } from "react";
import api from "@/config/api.jsx";
import AppBar from '@/components/AppBar'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useTheme, ThemeProvider, createTheme } from '@material-ui/core/styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import MenuIcon from '@material-ui/icons/Menu';
import styles from '@/styles/main.module.scss'

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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
          }}
        >
          <Box>
            <IconButton
              size="large"

              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Denários
            </Typography>
          </Box>
          <Box>
            <Button color="inherit">Login</Button>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Box>
        <div className={styles.container}>
          <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
            Binance
          </Typography>
          <div>
            {cryptos.data.binance.map(item => (
              <div key={item.no_cripto}>
                <h2>{item.no_cripto}</h2>
                <span>{item.vl_compra}</span>
                <span>{item.vl_venda}</span>
              </div>
            ))}

          </div>
        </div>
        <div className={styles.container}>
          <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
            BrasilBitcoin
          </Typography>
          <div>
            {cryptos.data.brasilbitcoin.map(item => (
              <div key={item.no_cripto}>
                <h2>{item.no_cripto}</h2>
                <span>{item.vl_compra}</span>
                <span>{item.vl_venda}</span>
              </div>
            ))}

          </div>
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