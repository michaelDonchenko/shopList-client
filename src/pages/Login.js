import React from 'react'
import { makeStyles } from '@material-ui/core'
import LoginForm from '../components/LoginForm'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
  heading: {
    textAlign: 'center',
    color: '#d3ebd3',
  },
})

const Login = ({ history }) => {
  const room = useSelector((state) => state.room)
  const token = useSelector((state) => state.token)

  {
    room && token && history.push('/')
  }

  const classes = useStyles()
  return (
    <div>
      <h1 className={classes.heading}>התחבר</h1>
      <LoginForm />
    </div>
  )
}

export default Login
