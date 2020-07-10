import axios from 'axios'

export default axios.create({
  // baseURL: 'https://yoursite.com/api',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
})
