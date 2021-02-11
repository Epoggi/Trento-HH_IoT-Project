import React, { useState } from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import User from './pages/User'
import Login from './pages/Login'
import Admin from './pages/Admin'

import SwitchMUI from './pages/SwitchMUI';

const theme = createMuiTheme({
  palette: {
      primary: {main: '#2b2b2b', contrastText: '#FFFFFF'},
      secondary: {main: '#232323', contrastText: '#FFFFFF'},
      text: {primary: '#FFFFFF', secondary: '#bdbdbd' },
      background: {default: '#1a1a1a'}
  },
  overrides:{
      MuiExpansionPanelSummary: {
          root: {
              backgroundColor: '#2D2D2D',
              borderBottom: '1px solid #151515',
              minHeight: 20,
              marginBottom: -5,
              '&$expanded': {
                minHeight: 20,
              }   
          },
            content: {
              '&$expanded': {
                margin: '12px 0',
              }
          }
      },
      MuiExpansionPanelDetails: {
          root:{
              backgroundColor: '#262626',
              paddingBottom: 8,
              paddingTop: 10,
          }
      }
  }
});

function App() {
  const [token, setToken] = useState();
  const [type, setType] = useState();

  if(!token){
  return(    
    <MuiThemeProvider theme={ theme }>
      <CssBaseline />
      <Login setToken={setToken} setType={setType}/>
    </MuiThemeProvider>
  );
  }

  return(
      <MuiThemeProvider theme={ theme }>
          <BrowserRouter>
            <div>
              <CssBaseline />
              <SwitchMUI/>
                <Switch>
                  <Route exact path='/' exact render={(props) => <User/> }/>
                </Switch>
                <Switch>
                  <Route exact path='/admin' render={(props) => <Admin/> }/>
                </Switch> 
            </div>
          </BrowserRouter>
      </MuiThemeProvider>
  );
}

export default App;
