import React, { useState, useEffect } from "react";
import api from "@/config/api.jsx";
import GlobalStyles from '@material-ui/core/GlobalStyles'
import CssBaseline from '@material-ui/core/CssBaseline'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useTheme, ThemeProvider, createTheme } from '@material-ui/core/styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import NavDrawer from '@/components/NavBar'
import SearchBar from '@/components/SearchBar'
import Image from 'next/image'
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
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          alignItems: 'center'
        }}
      >
        <Box>
          <NavDrawer />
        </Box>
        <Box className={styles.navBrand}>
          <Typography className={styles.textBrand} variant="h2" component="div" sx={{ flexGrow: 1 }}>
            Denários
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Button sx={{ display: { xs: 'none', sm: 'block' } }} color="inherit">Login</Button>
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Box>
      <SearchBar/>
      <Grid container spacing={2} p={4}>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image src="/binance.svg" height={100} width={500} />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
        >
          <Grid container spacing={2}>
            {cryptos.data.binance.map(item => (
              <Grid
                container
                item
                xs={4}
                md={2}
              >
                <Container>
                  <div className={styles.cryptoCard} key={item.no_cripto}>
                    <h2>{item.no_cripto}</h2>
                    <span>{item.vl_compra}</span>
                    <span>{item.vl_venda}</span>
                  </div>
                </Container>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <hr></hr>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image src="/brasilbitcoin.svg" height={70} width={350} />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
        >
          <Grid container spacing={2}>
            {cryptos.data.brasilbitcoin.map(item => (
              <Grid
                item
                xs={4}
                md={2}
              >
                <Container>
                  <div key={item.no_cripto}>
                    <h2>{item.no_cripto}</h2>
                    <span>{item.vl_compra}</span>
                    <span>{item.vl_venda}</span>
                  </div>
                </Container>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
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