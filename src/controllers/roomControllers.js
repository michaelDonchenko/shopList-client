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

export const updateDetails = async (name, password, passwordConfirm, token) =>
  await axios.put(
    `${REACT_APP_SERVER_URL}/api/room/roomDetails`,
    {
      name,
      password,
      passwordConfirm,
    },
    {
      headers: {
        authToken: token,
      },
    }
  )

export const getRoom = async (token) =>
  await axios.get(`${REACT_APP_SERVER_URL}/api/room`, {
    headers: {
      authToken: token,
    },
  })

export const addItem = async (name, price, token) =>
  await axios.post(
    `${REACT_APP_SERVER_URL}/api/room/currentList`,
    {
      name,
      price,
    },
    {
      headers: {
        authToken: token,
      },
    }
  )

export const addFavorite = async (name, price, token) =>
  await axios.post(
    `${REACT_APP_SERVER_URL}/api/room/favorites`,
    {
      name,
      price,
    },
    {
      headers: {
        authToken: token,
      },
    }
  )

export const deleteItem = async (productId, token) =>
  await axios.delete(
    `${REACT_APP_SERVER_URL}/api/room/currentList/${productId}`,
    {
      headers: {
        authToken: token,
      },
    }
  )

export const deleteFavorite = async (id, token) =>
  await axios.delete(`${REACT_APP_SERVER_URL}/api/room/favorites/${id}`, {
    headers: {
      authToken: token,
    },
  })

export const editCurrentList = async (id, updatedName, updatedPrice, token) =>
  await axios.put(
    `${REACT_APP_SERVER_URL}/api/room/currentList/${id}`,
    { updatedName, updatedPrice },
    {
      headers: {
        authToken: token,
      },
    }
  )

export const updateChecked = async (id, checked, token) =>
  await axios.put(
    `${REACT_APP_SERVER_URL}/api/room/currentList/check/${id}`,
    { checked },
    {
      headers: {
        authToken: token,
      },
    }
  )

export const editFavorite = async (id, updatedName, updatedPrice, token) =>
  await axios.put(
    `${REACT_APP_SERVER_URL}/api/room/favorites/${id}`,
    { updatedName, updatedPrice },
    {
      headers: {
        authToken: token,
      },
    }
  )

export const pushFromFavorites = async (item, token) =>
  await axios.post(
    `${REACT_APP_SERVER_URL}/api/room/currentList/favorite`,
    { item },
    {
      headers: {
        authToken: token,
      },
    }
  )

export const checkAll = async ({}, token) =>
  await axios.post(
    `${REACT_APP_SERVER_URL}/api/room/checkAll`,
    {},
    {
      headers: {
        authToken: token,
      },
    }
  )

export const uncheckAll = async ({}, token) =>
  await axios.post(
    `${REACT_APP_SERVER_URL}/api/room/uncheckAll`,
    {},
    {
      headers: {
        authToken: token,
      },
    }
  )

export const deleteChecked = async ({}, token) =>
  await axios.post(
    `${REACT_APP_SERVER_URL}/api/room/deleteChecked`,
    {},
    {
      headers: {
        authToken: token,
      },
    }
  )

export const deleteAll = async ({}, token) =>
  await axios.post(
    `${REACT_APP_SERVER_URL}/api/room/deleteAll`,
    {},
    {
      headers: {
        authToken: token,
      },
    }
  )
