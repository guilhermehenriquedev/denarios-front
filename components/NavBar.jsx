import * as React from 'react'
import Box from '@material-ui/core/Box'
import Drawer from '@material-ui/core/Drawer'
import DehazeIcon from '@material-ui/icons/Dehaze'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import styles from '@/styles/main.module.scss'
import Link from '@material-ui/core/Link'

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      className={styles.boxNav}
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          {/* <ListItemIcon>
            <HomeIcon />
          </ListItemIcon> */}
          <Link
            color="inherit"
            href="/"
          >
            HOME
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <Link
            color="inherit"
            href="quem-somos"
          >
            DENÁRIOS
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <Link
            color="inherit"
            href="#compartilhe"
          >
            COMPARTILHE
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <Link
            color="inherit"
            href="https://api.whatsapp.com/send?phone=5586995620722"
          >
            CONTATO
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <DehazeIcon className={styles.dehazeButton} sx={{ fontSize: 30 }} onClick={toggleDrawer(anchor, true)} />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}