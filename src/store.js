import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { roomReducer } from './reducers/roomReducer'
import { tokenReducer } from './reducers/tokenReducer'

const reducer = combineReducers({
  room: roomReducer,
  token: tokenReducer,
})

const roomFromLocalStorage = localStorage.getItem('roomDetails')
  ? JSON.parse(localStorage.getItem('roomDetails'))
  : null

const tokenFromLocalStorage = localStorage.getItem('token')
  ? JSON.parse(localStorage.getItem('token'))
  : null

const initialState = {
  room: roomFromLocalStorage,
  token: tokenFromLocalStorage,
}

const middleWare = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
)

export default store
