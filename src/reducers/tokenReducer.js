import { TOKEN_INSERT, TOKEN_REMOVE } from '../types/tokenTypes'

export const tokenReducer = (state = null, action) => {
  switch (action.type) {
    case TOKEN_INSERT:
      return action.payload
    case TOKEN_REMOVE:
      return action.payload

    default:
      return state
  }
}
