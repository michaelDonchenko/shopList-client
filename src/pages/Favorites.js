import React, { useState, useEffect } from 'react'
import {
  Button,
  CircularProgress,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  getRoom,
  addFavorite,
  deleteFavorite,
  editFavorite,
} from '../controllers/roomControllers'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddFavoriteDialog from '../components/AddFavoriteDialog'
import { Alert } from '@material-ui/lab'
import EditFavoriteDialog from '../components/EditFavoriteDialog'

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
    borderRadius: '9999em',
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
  editIcon: {
    margin: '0 3px',
    color: '#8c9eff',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  deleteIcon: {
    margin: '0 3px',
    color: '#ec407a',
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

const Favorites = () => {
  const classes = useStyles()
  const token = useSelector((state) => state.token)

  const [state, setState] = useState({
    room: {
      favorites: [],
    },
    loading: '',
    error: '',
    newFavoriteName: '',
    newFavoritePrice: '',
    addFavoriteError: '',
    deleteFavoriteError: '',
    editItemName: '',
    editItemPrice: '',
    editItemError: '',
    editItemId: '',
  })

  const [newFavoriteOpen, setNewFavoriteOpen] = useState(false)
  const [editItemOpen, setEditItemOpen] = useState(false)

  const handleClickOpen = () => {
    setNewFavoriteOpen(true)
  }

  const handleClose = () => {
    setNewFavoriteOpen(false)
  }

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleEditOpen = (currentItemId, currentListName, currentListPrice) => {
    setEditItemOpen(true)
    setState({
      ...state,
      editItemName: currentListName,
      editItemPrice: currentListPrice,
      editItemId: currentItemId,
    })
  }

  const handleEditClose = () => {
    setEditItemOpen(false)
  }

  const {
    room,
    loading,
    error,
    newFavoriteName,
    newFavoritePrice,
    addFavoriteError,
    deleteFavoriteError,
    editItemName,
    editItemPrice,
    editItemError,
    editItemId,
  } = state

  const roomDetails = async () => {
    setState({ ...state, loading: true })
    try {
      const { data } = await getRoom(token)
      setState({
        ...state,
        loading: false,
        room: data,
      })
    } catch (error) {
      setState({ ...state, loading: false, error: error.response.data.error })
    }
  }

  const handleAddFavorite = async (e) => {
    e.preventDefault()
    setState({ ...state, loading: true })
    try {
      if (!newFavoriteName) {
        return setState({
          ...state,
          loading: false,
          addFavoriteError: 'חובה לבחור שם למוצר',
        })
      }
      const { data } = await addFavorite(
        newFavoriteName,
        newFavoritePrice,
        token
      )
      setState({
        ...state,
        room: data,
        loading: false,
        newFavoriteName: '',
        newFavoritePrice: '',
      })
      handleClose()
    } catch (error) {
      setState({
        ...state,
        loading: false,
        addFavoriteError: error.response.data.error,
      })
    }
  }

  const handleDeleteFavorite = async (id, token) => {
    setState({ ...state, loading: true })

    try {
      const { data } = await deleteFavorite(id, token)
      setState({ ...state, room: data, loading: false })
    } catch (error) {
      setState({
        ...state,
        loading: false,
        deleteFavoriteError: error.response.data.error,
      })
    }
  }

  const handleEdit = async () => {
    setState({ ...state, loading: true })

    try {
      const { data } = await editFavorite(
        editItemId,
        editItemName,
        editItemPrice,
        token
      )
      setState({ ...state, room: data, loading: false })
      handleEditClose()
    } catch (error) {
      setState({
        ...state,
        loading: false,
        editItemError: error.response.data.error,
      })
    }
  }

  useEffect(() => {
    roomDetails()
  }, [])

  return (
    <div className={classes.root}>
      <div>
        <h1 className={classes.header}>מוצרים מועדפים</h1>
      </div>
      <div className={classes.heading}>
        <Button
          onClick={handleClickOpen}
          className={classes.headingButton}
          variant="contained"
        >
          הוסף מוצר למועדפים
        </Button>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', margin: '15px 0' }}>
          <CircularProgress />
        </div>
      )}

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

      {deleteFavoriteError && (
        <Alert
          style={{ margin: '15px 0' }}
          severity="error"
          onClose={() => {
            setState({ ...state, error: false })
          }}
        >
          {<spn style={{ margin: '0 10px' }}>{deleteFavoriteError}</spn>}
        </Alert>
      )}

      {editItemError && (
        <Alert
          style={{ margin: '15px 0' }}
          severity="error"
          onClose={() => {
            setState({ ...state, error: false })
          }}
        >
          {<spn style={{ margin: '0 10px' }}>{editItemError}</spn>}
        </Alert>
      )}

      <div className={classes.tableDiv}>
        {room && room.favorites.length === 0 && (
          <p style={{ textAlign: 'center' }}>אין לך מוצרים ברשימה</p>
        )}
        {room && room.favorites.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="right">שם המוצר</TableCell>
                  <TableCell align="right">מחיר</TableCell>
                  <TableCell align="right">ערוך / מחק</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {room.favorites.map((x, i) => (
                  <TableRow key={i}>
                    <TableCell align="right">
                      <strong>{x.name}</strong>
                    </TableCell>
                    <TableCell align="right">₪ {x.price}</TableCell>
                    <TableCell align="right">
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-around',
                        }}
                      >
                        <span
                          onClick={() => handleEditOpen(x._id, x.name, x.price)}
                          className={classes.editIcon}
                        >
                          <Tooltip placement="top-start" title="ערוך מוצר">
                            <EditIcon />
                          </Tooltip>
                        </span>
                        <span
                          onClick={() => handleDeleteFavorite(x._id, token)}
                          className={classes.deleteIcon}
                        >
                          <Tooltip placement="top-start" title="מחק מוצר">
                            <DeleteIcon />
                          </Tooltip>
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

      {/* ADD favorite item dialog*/}
      <AddFavoriteDialog
        newFavoriteOpen={newFavoriteOpen}
        handleClose={handleClose}
        handleChange={handleChange}
        newFavoriteName={newFavoriteName}
        newFavoritePrice={newFavoritePrice}
        handleAddFavorite={handleAddFavorite}
        addFavoriteError={addFavoriteError}
        setState={setState}
        state={state}
      />

      {/* Edit item dialog*/}
      <EditFavoriteDialog
        editItemOpen={editItemOpen}
        handleEditClose={handleEditClose}
        handleChange={handleChange}
        editItemName={editItemName}
        editItemPrice={editItemPrice}
        handleEdit={handleEdit}
        editItemError={editItemError}
        setState={setState}
        state={state}
      />

      <div>
        <Link className={classes.link} to="/">
          <Button className={classes.goBackButton}>חזרה לעמוד הראשי</Button>
        </Link>
      </div>
    </div>
  )
}

export default Favorites
