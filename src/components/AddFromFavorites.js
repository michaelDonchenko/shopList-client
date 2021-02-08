import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'

const AddFromFavorites = ({
  addFromFavorites,
  handleAddFavoriteClose,
  room,
  handleAddFromFavorites,
  setState,
  state,
}) => {
  return (
    <div>
      <Dialog
        scroll={'paper'}
        open={addFromFavorites}
        onClose={handleAddFavoriteClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">מוצרים מועדפים</DialogTitle>

        <DialogContent>
          <div>
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
                      <TableCell align="right">סמן</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {room.favorites.map((x, i) => (
                      <TableRow key={i}>
                        <TableCell align="right">
                          <strong>{x.name}</strong>
                        </TableCell>
                        <TableCell align="right">₪ {x.price}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleAddFromFavorites(x)}
                            color="primary"
                          >
                            הוסף
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddFromFavorites
