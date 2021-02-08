import React from 'react'
import { makeStyles } from '@material-ui/core'
import NavBar from './components/NavBar'
import { Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CreateRoom from './pages/Create-room'
import Main from './pages/Main'
import Mylist from './pages/Mylist'
import Favorites from './pages/Favorites'
import PrivateRoute from './components/routes/PrivateRoute'

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, black 30%, #757575 90%)',
    minHeight: '100vh',
    direction: 'rtl',
    color: 'white',
  },
})

const theme = createMuiTheme({
  typography: {
    fontFamily: ['David Libre', 'serif'],
  },
})

const App = () => {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <NavBar />
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/create-room" component={CreateRoom} exact />
          <PrivateRoute path="/" component={Main} exact />
          <PrivateRoute path="/my-list" component={Mylist} exact />
          <PrivateRoute path="/favorites" component={Favorites} exact />
        </Switch>
      </div>
    </ThemeProvider>
  )
}

export default App
