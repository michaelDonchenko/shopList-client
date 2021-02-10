import React, { useState } from 'react'
import { Button, CircularProgress, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { updateDetails } from '../controllers/roomControllers'
import { Alert } from '@material-ui/lab'
import { useSelector } from 'react-redux'

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
  saveButton: {
    width: '100%',
    margin: '15px 0',
    borderRadius: '9999em',
    backgroundColor: '#ffcc80',
    color: 'black',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#ffcc80',
    },
  },
  button: {
    width: '100%',
    margin: '15px 0',
    borderRadius: '9999em',
    backgroundColor: '#eeeeee',
    color: 'black',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#eeeeee',
    },
  },
  link: {
    textDecoration: 'none',
    margin: 'auto',
    display: 'inherit',
    width: '100%',
  },
}))

const UpdateRoomForm = () => {
  const classes = useStyles()
  const token = useSelector((state) => state.token)

  const [state, setState] = useState({
    loading: '',
    error: '',
    name: '',
    password: '',
    passwordConfirm: '',
    message: '',
  })

  const { loading, error, name, password, passwordConfirm, message } = state

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setState({ ...state, loading: true })
    try {
      const { data } = await updateDetails(
        name,
        password,
        passwordConfirm,
        token
      )
      setState({
        ...state,
        loading: false,
        message: data,
        name: '',
        password: '',
        passwordConfirm: '',
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
      <form onSubmit={handleUpdate} className={classes.formBlock}>
        {loading && (
          <div style={{ textAlign: 'center', margin: '15px 0' }}>
            <CircularProgress />
          </div>
        )}

        <label htmlFor="fname">שם חדר חדש</label>
        <input
          onChange={handleChange}
          value={name}
          className={classes.textField}
          placeholder="האם ברצונך לבחור שם חדר חדש?"
          type="text"
          name="name"
        />
        <label htmlFor="lname">סיסמה חדשה</label>
        <input
          onChange={handleChange}
          value={password}
          className={classes.textField}
          placeholder="האם ברצונך לבחור סיסמה חדשה?"
          type="password"
          name="password"
        />
        <label htmlFor="lname">בדוק סיסמה</label>
        <input
          onChange={handleChange}
          value={passwordConfirm}
          className={classes.textField}
          placeholder="בדוק את הסיסמה שלך"
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
        {message && (
          <Alert
            style={{ margin: '15px 0' }}
            severity="success"
            onClose={() => {
              setState({ ...state, message: false })
            }}
          >
            {<spn style={{ margin: '0 10px' }}>{message}</spn>}
          </Alert>
        )}

        <Button
          type="submit"
          className={classes.saveButton}
          variant="contained"
        >
          שמור
        </Button>
        <Link className={classes.link} to="/">
          <Button className={classes.button} variant="contained">
            חזרה לעמוד הראשי
          </Button>
        </Link>
      </form>
    </div>
  )
}

export default UpdateRoomForm
