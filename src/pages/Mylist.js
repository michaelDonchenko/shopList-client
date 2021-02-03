import React, { useState, useEffect } from 'react'
import {
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { getRoom } from '../controllers/roomControllers'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
  root: {
    maxWidth: '500px',
    margin: 'auto',
  },
  heading: {
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  headingButton: {
    margin: '5px',
    width: '200px',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  tableDiv: {
    maxWidth: '95%',
    margin: 'auto',
    maxHeight: '400px',
    overflowY: 'scroll',
  },
  goBackButton: {
    width: '100%',
    margin: '30px 0',
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
  header: {
    textAlign: 'center',
    color: '#004d40',
    backgroundColor: 'white',
  },
})

const Mylist = () => {
  const classes = useStyles()
  const token = useSelector((state) => state.token)

  const [state, setState] = useState({
    room: {
      currentList: [],
    },
    loading: '',
    error: '',
  })

  const { room, loading, error } = state

  const roomDetails = async () => {
    try {
      const { data } = await getRoom(token)
      setState({
        ...state,
        loading: false,
        room: data,
      })
      console.log(data)
    } catch (error) {
      setState({ ...state, loading: false, error: error.response.data.error })
    }
  }

  useEffect(() => {
    roomDetails()
  }, [])

  return (
    <div className={classes.root}>
      <div>
        <h1 className={classes.header}>הרשימה שלי</h1>
      </div>
      <div className={classes.heading}>
        <Button className={classes.headingButton} variant="contained">
          מוצר חדש
        </Button>
        <Button className={classes.headingButton} variant="contained">
          מוצר מהמועדפים
        </Button>
      </div>

      <div className={classes.tableDiv}>
        {room && room.currentList.length === 0 && (
          <p style={{ textAlign: 'center' }}>אין לך מוצרים ברשימה</p>
        )}
        {room && room.currentList.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="right">שם המוצר</TableCell>
                  <TableCell align="right">מחיר</TableCell>
                  <TableCell align="right">ערוך / מחק</TableCell>
                  <TableCell align="right">סמן </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {room.currentList.map((x, i) => (
                  <TableRow key={i}>
                    <TableCell align="right">
                      <strong>{x.name}</strong>
                    </TableCell>
                    <TableCell align="right">₪ {x.price}</TableCell>
                    <TableCell align="right">אייקון מחיקה ועריכה</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

      <div>
        <Link className={classes.link} to="/">
          <Button className={classes.goBackButton}>חזרה לעמוד הראשי</Button>
        </Link>
      </div>
    </div>
  )
}

export default Mylist
