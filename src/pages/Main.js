import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ListIcon from '@material-ui/icons/List'

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
    backgroundColor: '#00796b',
    color: 'white',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#00796b',
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
  return (
    <div className={classes.root}>
      <h3 className={classes.heading}>ברוך הבא ל"שם החדר</h3>

      <Link className={classes.link} to="/my-list">
        <Button
          endIcon={<ListIcon />}
          className={classes.listButton}
          variant="contained"
        >
          <span style={{ marginLeft: '10px' }}>הרשימה שלך</span>
        </Button>
      </Link>

      <Link className={classes.link} to="/favorites">
        <Button
          endIcon={<FavoriteIcon />}
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
