import React, { useState } from 'react'
import { Button, CircularProgress, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { register, getRoom } from '../controllers/roomControllers'
import { Alert } from '@material-ui/lab'
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
    backgroundColor: '#ffc107',
    fontSize: '16px',
    color: 'white',
    '&:hover': {
      backgroundColor: '#ffa000',
    },
  },
  link: {
    textDecoration: 'none',
    color: '#e65100',
  },
}))

const CreateRoomForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [state, setState] = useState({
    loading: '',
    error: '',
    name: '',
    password: '',
    passwordConfirm: '',
  })

  const { loading, error, name, password, passwordConfirm } = state

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setState({ ...state, loading: true })
    try {
      const { data } = await register(name, password, passwordConfirm)
      localStorage.setItem('token', JSON.stringify(data.token))

      dispatch({
        type: TOKEN_INSERT,
        payload: data.token,
      })

      const roomResponse = await getRoom(data.token)
      localStorage.setItem('roomDetails', JSON.stringify(roomResponse.data))

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
      <form onSubmit={handleRegister} className={classes.formBlock}>
        {loading && (
          <div style={{ textAlign: 'center', margin: '15px 0' }}>
            <CircularProgress />
          </div>
        )}

        <label htmlFor="fname">שם החדר</label>
        <input
          onChange={handleChange}
          value={name}
          className={classes.textField}
          type="text"
          name="name"
        />
        <label htmlFor="lname">סיסמה</label>
        <input
          onChange={handleChange}
          value={password}
          className={classes.textField}
          type="password"
          name="password"
        />
        <label htmlFor="lname">בדוק סיסמה</label>
        <input
          onChange={handleChange}
          value={passwordConfirm}
          className={classes.textField}
          type="password"
          name="passwordConfirm"
        />

        {error && (
          <Alert
            style={{ margin: '15px 0' }}
            severity="error"
            onClose={() => {
              setState({ ...state, error: false })
            }}
          >
            {<spn style={{ margin: '0 10px' }}>{error}</spn>}
          </Alert>
        )}

        <Button type="submit" className={classes.button} variant="contained">
          צור חדר
        </Button>
        <div>
          <p>
            <span style={{ marginLeft: '5px' }}>האם יש לך חדר?</span>
            <span>
              <Link className={classes.link} to="/login">
                התחבר
              </Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default CreateRoomForm
