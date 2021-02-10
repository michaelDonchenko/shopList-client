import React from 'react'
import { makeStyles } from '@material-ui/core'

import UpdateRoomForm from '../components/UpdateRoomForm'

const useStyles = makeStyles({
  heading1: {
    textAlign: 'center',
    color: '#d3ebd3',
  },
})

const RoomDetails = ({ history }) => {
  const classes = useStyles()
  return (
    <div>
      <h1 className={classes.heading1}>עדכון פרטי החדר</h1>
      <UpdateRoomForm />
    </div>
  )
}

export default RoomDetails
