import { AppBar, Button, Toolbar } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#004d40',
    padding: 0,
  },
  navLink: {
    textDecoration: 'none',
    color: 'white',
    borderLeft: '1px solid',
  },
})

const NavBar = () => {
  const classes = useStyles()

  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar style={{ minHeight: '20px' }}>
        <NavLink
          activeStyle={{
            backgroundColor: '#00695c',
          }}
          className={classes.navLink}
          to="/login"
        >
          <Button
            style={{
              fontSize: '16px',
            }}
            color="inherit"
          >
            כניסה
          </Button>
        </NavLink>

        <NavLink
          activeStyle={{
            backgroundColor: '#00695c',
          }}
          className={classes.navLink}
          to="/create-room"
        >
          <Button style={{ fontSize: '16px' }} color="inherit">
            הרשמה
          </Button>
        </NavLink>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
