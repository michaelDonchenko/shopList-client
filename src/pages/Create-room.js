import React from 'react'
import { makeStyles } from '@material-ui/core'
import CreateRoomForm from '../components/CreateRoomForm'

const useStyles = makeStyles({
  heading1: {
    textAlign: 'center',
    color: '#d3ebd3',
  },
})

const CreateRoom = () => {
  const classes = useStyles()
  return (
    <div>
      <h1 className={classes.heading1}>צור חדר חדש</h1>
      <CreateRoomForm />
    </div>
  )
}

export default CreateRoom
