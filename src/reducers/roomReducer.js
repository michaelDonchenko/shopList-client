import { ROOM_LOGIN, ROOM_REGISTER, ROOM_LOGOUT } from '../types/roomTypes'

export const roomReducer = (state = null, action) => {
  switch (action.type) {
    case ROOM_LOGIN:
      return action.payload
    case ROOM_REGISTER:
      return action.payload
    case ROOM_LOGOUT:
      return action.payload

    default:
      return state
  }
}
