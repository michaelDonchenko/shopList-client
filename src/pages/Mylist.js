import React, { useState, useEffect } from 'react'
import {
  Button,
  Checkbox,
  CircularProgress,
  makeStyles,
  Menu,
  MenuItem,
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
import {
  getRoom,
  addItem,
  deleteItem,
  editCurrentList,
  updateChecked,
  pushFromFavorites,
} from '../controllers/roomControllers'
import { useSelector } from 'react-redux'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddNewItemDialog from '../components/AddNewItemDialog'
import { Alert } from '@material-ui/lab'
import FavoriteIcon from '@material-ui/icons/Favorite'
import EditCurrentListDialog from '../components/EditCurrentListDialog'
import AddFromFavorites from '../components/AddFromFavorites'

const useStyles = makeStyles({
  root: {
    maxWidth: '650px',
    margin: 'auto',
  },
  heading: {
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  headingButton: {
    margin: '10px 5px',
    width: '180px',
    borderRadius: '9999em',
    backgroundColor: '#ffcc80',
    '&:hover': {
      backgroundColor: '#ffcc80',
    },
  },
  headingButton2: {
    margin: '10px 5px',
    width: '180px',
    borderRadius: '9999em',
    backgroundColor: '#eeeeee',
    '&:hover': {
      backgroundColor: '#eeeeee',
    },
  },
  tableDiv: {
    maxWidth: '95%',
    margin: 'auto',
    maxHeight: '400px',
    width: '500px',
    overflowY: 'scroll',
  },
  goBackButton: {
    width: '100%',
    margin: '30px auto',
    borderRadius: '9999em',
    backgroundColor: '#ffcc80',
    color: 'black',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#ffcc80',
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
    color: 'black',
    backgroundColor: 'white',
  },
  editIcon: {
    marginLeft: '5px',
    color: '#8c9eff',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  deleteIcon: {
    marginRight: '5px',
    color: '#ec407a',
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

const Mylist = () => {
  const classes = useStyles()
  const token = useSelector((state) => state.token)

  const [menu, setMenu] = useState(null)

  const handleMenuOpen = (e) => {
    setMenu(e.currentTarget)
  }

  const handleMenuClose = () => {
    setMenu(null)
  }

  const [state, setState] = useState({
    room: {
      currentList: [],
      favorites: [],
    },
    loading: '',
    error: '',
    newItemName: '',
    newItemPrice: '',
    addItemError: '',
    deleteItemError: '',
    deleteItemLoading: '',
    editItemName: '',
    editItemPrice: '',
    editItemError: '',
    editItemId: '',
    checkLoading: '',
  })

  const [newItemOpen, setNewItemOpen] = useState(false)
  const [editItemOpen, setEditItemOpen] = useState(false)
  const [addFromFavorites, setAddFromFavorites] = useState(false)

  const handleCheck = async (e) => {
    setState({ ...state, checkLoading: e.target.id })
    try {
      const { data } = await updateChecked(e.target.id, e.target.checked, token)
      setState({ ...state, room: data, checkLoading: false })
    } catch (error) {
      setState({
        ...state,
        error: error.response.data.error,
        checkLoading: false,
      })
    }
  }

  const handleClickOpen = () => {
    setNewItemOpen(true)
  }

  const handleClose = () => {
    setNewItemOpen(false)
  }

  const handleAddFavoriteOpen = () => {
    setAddFromFavorites(true)
    console.log(room.favorites)
  }

  const handleAddFavoriteClose = () => {
    setAddFromFavorites(false)
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

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const {
    room,
    loading,
    error,
    newItemName,
    newItemPrice,
    addItemError,
    deleteItemError,
    deleteItemLoading,
    editItemName,
    editItemPrice,
    editItemError,
    editItemId,
    checkLoading,
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

  const handleAddItem = async (e) => {
    e.preventDefault()
    setState({ ...state, loading: true })
    try {
      if (!newItemName) {
        return setState({
          ...state,
          loading: false,
          addItemError: 'חובה לבחור שם למוצר',
        })
      }
      const { data } = await addItem(newItemName, newItemPrice, token)
      setState({
        ...state,
        room: data,
        loading: false,
        newItemName: '',
        newItemPrice: '',
      })
      handleClose()
    } catch (error) {
      setState({
        ...state,
        loading: false,
        addItemError: error.response.data.error,
      })
    }
  }

  const handleDeleteItem = async (id, token) => {
    setState({ ...state, deleteItemLoading: id })
    try {
      const { data } = await deleteItem(id, token)
      setState({ ...state, room: data, deleteItemLoading: false })
    } catch (error) {
      setState({
        ...state,
        deleteItemLoading: false,
        deleteItemError: error.response.data.error,
      })
    }
  }

  const handleEdit = async () => {
    setState({ ...state, loading: true })

    try {
      const { data } = await editCurrentList(
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

  const handleAddFromFavorites = async (x) => {
    setState({ ...state, loading: true })
    try {
      const { data } = await pushFromFavorites(x, token)
      setState({ ...state, room: data, loading: false })
      handleAddFavoriteClose()
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error.response.data.error,
      })
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
        <Button
          onClick={handleClickOpen}
          className={classes.headingButton}
          variant="contained"
        >
          מוצר חדש
        </Button>
        <Button
          endIcon={
            <FavoriteIcon style={{ color: 'orange', marginRight: '10px' }} />
          }
          onClick={handleAddFavoriteOpen}
          className={classes.headingButton2}
          variant="contained"
        >
          מוצר מהמועדפים
        </Button>
        <Button
          onClick={handleMenuOpen}
          className={classes.headingButton2}
          variant="contained"
        >
          אפשרויות נוספות
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

      {deleteItemError && (
        <Alert
          style={{ margin: '15px 0' }}
          severity="error"
          onClose={() => {
            setState({ ...state, error: false })
          }}
        >
          {<spn style={{ margin: '0 10px' }}>{deleteItemError}</spn>}
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
                      {x.checked ? (
                        <strong
                          style={{
                            textDecorationLine: 'line-through',
                            color: 'GrayText',
                          }}
                        >
                          {x.name}
                        </strong>
                      ) : (
                        <strong>{x.name}</strong>
                      )}
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
                        {deleteItemLoading && deleteItemLoading === x._id ? (
                          <CircularProgress style={{ textAlign: 'center' }} />
                        ) : (
                          <span
                            onClick={() => handleDeleteItem(x._id, token)}
                            className={classes.deleteIcon}
                          >
                            <Tooltip placement="top-start" title="מחק מוצר">
                              <DeleteIcon />
                            </Tooltip>
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {checkLoading && checkLoading === x._id ? (
                        <CircularProgress style={{ textAlign: 'center' }} />
                      ) : (
                        <Checkbox
                          checked={x.checked}
                          onChange={handleCheck}
                          id={x._id}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

      {/* ADD new item dialog*/}
      <AddNewItemDialog
        newItemOpen={newItemOpen}
        handleClose={handleClose}
        handleChange={handleChange}
        newItemName={newItemName}
        newItemPrice={newItemPrice}
        handleAddItem={handleAddItem}
        addItemError={addItemError}
        setState={setState}
        state={state}
      />

      {/* Edit item dialog*/}
      <EditCurrentListDialog
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

      {/* ADD from favorites dialog*/}
      <AddFromFavorites
        addFromFavorites={addFromFavorites}
        handleAddFavoriteClose={handleAddFavoriteClose}
        room={room}
        handleAddFromFavorites={handleAddFromFavorites}
        setState={setState}
        state={state}
      />

      <Menu
        id="menu"
        anchorEl={menu}
        keepMounted
        open={Boolean(menu)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>סמן הכל</MenuItem>
        <MenuItem onClick={handleMenuClose}>בטל סימונים</MenuItem>
        <MenuItem onClick={handleMenuClose}>מחק מסומנים</MenuItem>
        <MenuItem onClick={handleMenuClose}>מחק הכל</MenuItem>
      </Menu>

      <div>
        <Link className={classes.link} to="/">
          <Button className={classes.goBackButton}>חזרה לעמוד הראשי</Button>
        </Link>
      </div>
    </div>
  )
}

export default Mylist
