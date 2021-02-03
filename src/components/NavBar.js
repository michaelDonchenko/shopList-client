import { AppBar, Button, Toolbar } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { TOKEN_REMOVE } from '../types/tokenTypes'
import { ROOM_LOGOUT } from '../types/roomTypes'

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
  const room = useSelector((state) => state.room)
  const token = useSelector((state) => state.token)

  const dispatch = useDispatch()

  const handleLogout = async () => {
    localStorage.removeItem('roomDetails')
    localStorage.removeItem('token')

    dispatch({
      type: ROOM_LOGOUT,
      payload: null,
    })

    dispatch({
      type: TOKEN_REMOVE,
      payload: null,
    })
  }

  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar style={{ minHeight: '20px' }}>
        {!room && !token && (
          <>
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
          </>
        )}

        {token && room && (
          <Button
            onClick={handleLogout}
            style={{ fontSize: '16px' }}
            color="inherit"
          >
            התנתק
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
