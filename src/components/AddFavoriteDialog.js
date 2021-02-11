import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'

const AddFavoriteDialog = ({
  newFavoriteOpen,
  handleClose,
  handleChange,
  newFavoriteName,
  newFavoritePrice,
  handleAddFavorite,
  addFavoriteError,
  setState,
  state,
}) => {
  return (
    <div>
      <Dialog
        open={newFavoriteOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">מוצר מועדף</DialogTitle>

        <DialogContent>
          <TextField
            onChange={handleChange}
            autoFocus
            value={newFavoriteName}
            margin="dense"
            name="newFavoriteName"
            label="שם המוצר"
            type="text"
            required
            fullWidth
          />
          <TextField
            onChange={handleChange}
            value={newFavoritePrice}
            margin="dense"
            name="newFavoritePrice"
            label="מחיר"
            type="number"
            fullWidth
          />
          {addFavoriteError && (
            <Alert
              style={{ margin: '15px 0' }}
              severity="error"
              onClose={() => {
                setState({ ...state, addFavoriteError: false })
              }}
            >
              {<spn style={{ margin: '0 10px' }}>{addFavoriteError}</spn>}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddFavorite} type="submit" color="primary">
            הוסף למועדפים
          </Button>
          <Button onClick={handleClose}>ביטול</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddFavoriteDialog
