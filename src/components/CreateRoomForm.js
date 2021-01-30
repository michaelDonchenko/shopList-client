import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'

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

const CreateRoomForm = () => {
  const classes = useStyles()
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
        <label htmlFor="lname">בדוק סיסמה</label>
        <input
          className={classes.textField}
          type="password"
          name="passwordConfirm"
        />
        <Button className={classes.button} variant="contained">
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
