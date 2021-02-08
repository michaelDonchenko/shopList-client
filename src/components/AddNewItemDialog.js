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

const AddNewItemDialog = ({
  newItemOpen,
  handleClose,
  handleChange,
  newItemName,
  newItemPrice,
  handleAddItem,
  addItemError,
  setState,
  state,
}) => {
  return (
    <div>
      <Dialog
        open={newItemOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">מוצר חדש</DialogTitle>

        <DialogContent>
          <TextField
            onChange={handleChange}
            autoFocus
            value={newItemName}
            margin="dense"
            name="newItemName"
            label="שם המוצר"
            type="text"
            required
            fullWidth
          />
          <TextField
            onChange={handleChange}
            value={newItemPrice}
            margin="dense"
            name="newItemPrice"
            label="מחיר"
            type="number"
            fullWidth
          />
          {addItemError && (
            <Alert
              style={{ margin: '15px 0' }}
              severity="error"
              onClose={() => {
                setState({ ...state, addItemError: false })
              }}
            >
              {<spn style={{ margin: '0 10px' }}>{addItemError}</spn>}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddItem} type="submit" color="primary">
            הוסף מוצר
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddNewItemDialog
