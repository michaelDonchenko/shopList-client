import axios from 'axios'
const { REACT_APP_SERVER_URL } = process.env

export const login = async (name, password) =>
  await axios.post(`${REACT_APP_SERVER_URL}/api/room/login`, { name, password })

export const register = async (name, password, passwordConfirm) =>
  await axios.post(`${REACT_APP_SERVER_URL}/api/room/register`, {
    name,
    password,
    passwordConfirm,
  })

export const getRoom = async (token) =>
  await axios.get(`${REACT_APP_SERVER_URL}/api/room`, {
    headers: {
      authToken: token,
    },
  })
