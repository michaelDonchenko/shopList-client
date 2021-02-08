import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    textAlign: 'center',
    marginTop: '30px',
  },
  listButton: {
    width: '100%',
    margin: '15px 0',
    borderRadius: '9999em',
    backgroundColor: '#ffc107',
    color: 'white',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#ffa000',
    },
  },
  favoritesButton: {
    width: '100%',
    margin: '15px 0',
    borderRadius: '9999em',
    backgroundColor: '#00796b',
    color: 'white',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#00796b',
    },
  },
  link: {
    textDecoration: 'none',
    margin: 'auto',
    display: 'inherit',
    width: '400px',
    maxWidth: '90%',
  },
})

const Main = () => {
  const classes = useStyles()
  const room = useSelector((state) => state.room)

  return (
    <div className={classes.root}>
      <h2 className={classes.heading}>{`ברוך הבא ל${
        room ? room.name : ''
      }`}</h2>

      <Link className={classes.link} to="/my-list">
        <Button className={classes.listButton} variant="contained">
          <span>הרשימה שלך</span>
        </Button>
      </Link>

      <Link className={classes.link} to="/favorites">
        <Button
          endIcon={<FavoriteIcon style={{ color: 'orange' }} />}
          className={classes.favoritesButton}
          variant="contained"
        >
          <span style={{ marginLeft: '10px' }}>ערוך מוצרים מועדפים</span>
        </Button>
      </Link>
    </div>
  )
}

export default Main
