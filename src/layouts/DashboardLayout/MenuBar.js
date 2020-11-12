import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import { Typography } from '@material-ui/core';
import { NavLink as RouterLink } from 'react-router-dom';

import EqualizerIcon from '@material-ui/icons/Equalizer';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import HelpIcon from '@material-ui/icons/Help';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles({
  list: {
    width: 360,
  },
  fullList: {
    width: 'auto',
  },
  listItem: {
    height: '75px',
  },
});
const items = [
  {
    href: '/app/dashboard',
    icon: EqualizerIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/review',
    icon: VisibilityIcon,
    title: 'Review'
  },
  {
    href: '/app/products',
    icon: ReceiptIcon,
    title: 'Status'
  },
  {
    href: '/app/register',
    icon: PersonAddIcon,
    title: 'Register Profile'
  },
  {
    href: '/app/helpcenter',
    icon: HelpIcon,
    title: 'Help Center'
  },
  {
    href: '/app/settings',
    icon: CameraAltIcon,
    title: 'Settings Camera'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Setting'
  },
];

const itemSubmenu = [
  {
    icon: PersonIcon,
    title: 'Insider',
  },
  {
    icon: PersonIcon,
    title: 'Outsider',
  },
];

export default function SwipeableTemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  function showSubmanu() {

  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* <List>
      <Typography variant='h1'>IMPEKPA</Typography>
        {['Dashboard', 'Review', 'Status', 'Register Profile','Help Center','Settings Camera','Settings'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><EqualizerIcon/></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
      <List>
        {items.map((item) => (
          <ListItem
            botton
            className={classes.listItem}
            component={RouterLink}
            to={item.href}
            onMouseOver={showSubmanu()}
          >
            <ListItemIcon><item.icon color="primary" fontSize="large" /></ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon onClick={toggleDrawer(anchor, true)} />
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
