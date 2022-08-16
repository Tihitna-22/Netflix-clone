import axios from 'axios'


 const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });
  export default instance