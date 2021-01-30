import React from 'react'
import { makeStyles } from '@material-ui/core'
import LoginForm from '../components/LoginForm'

const useStyles = makeStyles({
  heading1: {
    textAlign: 'center',
    color: '#d3ebd3',
  },
})

const Login = () => {
  const classes = useStyles()
  return (
    <div>
      <h1 className={classes.heading1}>התחבר</h1>
      <LoginForm />
    </div>
  )
}

export default Login
