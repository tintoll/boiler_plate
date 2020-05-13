import axios from 'axios'
import {
  LOGIN_USER
} from '../_actions/types'

export function loginUser(data) {

  const request = axios.post('/api/users/login', data)
    .then(response => response.data);

  return {
    type : LOGIN_USER,
    payload : request
  }
  
}