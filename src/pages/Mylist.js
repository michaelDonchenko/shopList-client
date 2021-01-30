import React from 'react'
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
})

const Mylist = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.heading}>
        <Button className={classes.headingButton} variant="contained">
          מוצר חדש
        </Button>
        <Button className={classes.headingButton} variant="contained">
          מוצר מהמועדפים
        </Button>
      </div>

      <div className={classes.tableDiv}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">שם המוצר</TableCell>
                <TableCell align="right">כמות</TableCell>
                <TableCell align="right">מחיר</TableCell>
                <TableCell align="right">ערוך / מחק</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell align="right">
                  <strong>בדיקה</strong>
                </TableCell>
                <TableCell align="right">200 גרם</TableCell>
                <TableCell align="right">30</TableCell>
                <TableCell align="right">אייקון מחיקה ועריכה</TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="right">
                  <strong>בננות</strong>
                </TableCell>
                <TableCell align="right">10</TableCell>
                <TableCell align="right">5</TableCell>
                <TableCell align="right">ייקון מחיקה ועריכהא</TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="right">
                  <strong>בננות</strong>
                </TableCell>
                <TableCell align="right">10</TableCell>
                <TableCell align="right">5</TableCell>
                <TableCell align="right">ייקון מחיקה ועריכהא</TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="right">
                  <strong>בננות</strong>
                </TableCell>
                <TableCell align="right">10</TableCell>
                <TableCell align="right">5</TableCell>
                <TableCell align="right">ייקון מחיקה ועריכהא</TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="right">
                  <strong>בננות</strong>
                </TableCell>
                <TableCell align="right">10</TableCell>
                <TableCell align="right">5</TableCell>
                <TableCell align="right">ייקון מחיקה ועריכהא</TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="right">
                  <strong>בננות</strong>
                </TableCell>
                <TableCell align="right">10</TableCell>
                <TableCell align="right">5</TableCell>
                <TableCell align="right">ייקון מחיקה ועריכהא</TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="right">
                  <strong>בננות</strong>
                </TableCell>
                <TableCell align="right">10</TableCell>
                <TableCell align="right">5</TableCell>
                <TableCell align="right">ייקון מחיקה ועריכהא</TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="right">
                  <strong>בננות</strong>
                </TableCell>
                <TableCell align="right">10</TableCell>
                <TableCell align="right">5</TableCell>
                <TableCell align="right">ייקון מחיקה ועריכהא</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
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
