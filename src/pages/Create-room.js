import React from 'react'
import { makeStyles } from '@material-ui/core'
import CreateRoomForm from '../components/CreateRoomForm'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
  heading1: {
    textAlign: 'center',
    color: '#d3ebd3',
  },
})

const CreateRoom = ({ history }) => {
  const room = useSelector((state) => state.room)
  const token = useSelector((state) => state.token)

  {
    room && token && history.push('/')
  }

  const classes = useStyles()
  return (
    <div>
      <h1 className={classes.heading1}>צור חדר חדש</h1>
      <CreateRoomForm />
    </div>
  )
}

export default CreateRoom
