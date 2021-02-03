import React, { useState } from 'react'
import { Button, CircularProgress, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Alert } from '@material-ui/lab'
import { login, getRoom } from '../controllers/roomControllers'
import { TOKEN_INSERT } from '../types/tokenTypes'
import { useDispatch } from 'react-redux'
import { ROOM_LOGIN } from '../types/roomTypes'

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

  const dispatch = useDispatch()

  const [state, setState] = useState({
    loading: '',
    error: '',
    name: 'טסט',
    password: '123456',
  })

  const { loading, error, name, password } = state

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setState({ ...state, loading: true })

    try {
      const { data } = await login(name, password)
      localStorage.setItem('token', JSON.stringify(data.token))

      dispatch({
        type: TOKEN_INSERT,
        payload: data.token,
      })

      const roomResponse = await getRoom(data.token)
      localStorage.setItem(
        'roomDetails',
        JSON.stringify({
          id: roomResponse.data._id,
          name: roomResponse.data.name,
        })
      )

      dispatch({
        type: ROOM_LOGIN,
        payload: { id: roomResponse.data._id, name: roomResponse.data.name },
      })
    } catch (error) {
      setState({ ...state, loading: false, error: error.response.data.error })
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <form className={classes.formBlock} onSubmit={handleLogin}>
        {loading && (
          <div style={{ textAlign: 'center', margin: '15px 0' }}>
            <CircularProgress />
          </div>
        )}
        <label htmlFor="fname">שם החדר</label>
        <input
          value={name}
          onChange={handleChange}
          className={classes.textField}
          type="text"
          name="name"
        />
        <label htmlFor="lname">סיסמה</label>
        <input
          value={password}
          onChange={handleChange}
          className={classes.textField}
          type="password"
          name="password"
        />
        {error && (
          <Alert
            variant="filled"
            style={{ margin: '15px 0' }}
            severity="error"
            onClose={() => {
              setState({ ...state, error: false })
            }}
          >
            {<spn style={{ margin: '0 10px' }}>{error}</spn>}
          </Alert>
        )}
        <Button className={classes.button} variant="contained" type="submit">
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
