import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Person from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  paper: {
    background: '#2b2b2b'
  }
});

function SwitchMUI (props) {
  const styles = useStyles();

  //Drawer hommat
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); }


  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
            <IconButton  color='inherit' onClick={ handleOpen }>
                <MenuIcon />
            </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor='left' open={ open } onClick={ handleClose } classes={{ paper: styles.paper }}>
        <List>
          <ListItem button component={Link} to = '/user'>
            <ListItemIcon><Person style={{fill: "FFFFFF"}}/></ListItemIcon>
            <ListItemText primary='Users' />
          </ListItem>
          <ListItem button component={Link} to = '/login'>
            <ListItemIcon><ExitToAppIcon style={{fill: "FFFFFF"}}/></ListItemIcon>
            <ListItemText primary='Login' />
          </ListItem>
          <ListItem button component={Link} to = '/admin'>
            <ListItemIcon><SupervisorAccountIcon style={{fill: "FFFFFF"}}/></ListItemIcon>
            <ListItemText primary='Admin' />
          </ListItem>
        </List>
      
      </Drawer>
    </div>
  );
}

export default SwitchMUI;
