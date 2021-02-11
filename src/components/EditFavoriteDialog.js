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

const EditFavoriteDialog = ({
  editItemOpen,
  handleEditClose,
  handleChange,
  editItemName,
  editItemPrice,
  handleEdit,
  editItemError,
  setState,
  state,
}) => {
  return (
    <div>
      <Dialog
        open={editItemOpen}
        onClose={handleEditClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">ערוך מוצר</DialogTitle>

        <DialogContent>
          <TextField
            onChange={handleChange}
            autoFocus
            value={editItemName}
            margin="dense"
            name="editItemName"
            label="שם המוצר"
            type="text"
            required
            fullWidth
          />
          <TextField
            onChange={handleChange}
            value={editItemPrice}
            margin="dense"
            name="editItemPrice"
            label="מחיר"
            type="number"
            fullWidth
          />
          {editItemError && (
            <Alert
              style={{ margin: '15px 0' }}
              severity="error"
              onClose={() => {
                setState({ ...state, editItemError: false })
              }}
            >
              {<spn style={{ margin: '0 10px' }}>{editItemError}</spn>}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEdit} type="submit" color="primary">
            ערוך מוצר
          </Button>
          <Button onClick={handleEditClose}>ביטול</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EditFavoriteDialog
