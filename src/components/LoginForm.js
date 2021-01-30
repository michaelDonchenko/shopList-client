import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  formBlock: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: { width: '85%' },
    [theme.breakpoints.up('sm')]: { width: '400px' },
  },
  textField: {
    padding: '7px',
    margin: '12px 0',
    borderRadius: '9999em',
    border: 'none',
    outline: 'none',
    fontSize: '16px',
  },
  button: {
    borderRadius: '9999em',
    margin: '15px 0',
    backgroundColor: '#00695c',
    fontSize: '16px',
    color: 'white',
    '&:hover': {
      backgroundColor: '#00695c',
    },
  },
  link: {
    textDecoration: 'none',
    color: '#1b5e20',
  },
}))

const LoginForm = () => {
  const classes = useStyles()
  let history = useHistory()

  const handleLogin = () => {
    history.push('/')
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <form className={classes.formBlock}>
        <label htmlFor="fname">שם החדר</label>
        <input className={classes.textField} type="text" name="name" />
        <label htmlFor="lname">סיסמה</label>
        <input className={classes.textField} type="password" name="password" />
        <Button
          onClick={handleLogin}
          className={classes.button}
          variant="contained"
        >
          התחבר
        </Button>
        <div>
          <p>
            <span style={{ marginLeft: '5px' }}>האם אין לך חדר?</span>
            <span>
              <Link className={classes.link} to="/create-room">
                צור חדר חדש
              </Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
