import axios from 'axios';

axios.defaults.baseURL = 'http://online-jobs.test/api';

export default {
    state: {
      token: localStorage.getItem('access_token') || null,
    },
    getters: {
      isLoggedIn(state) {
        return state.token !== null
      },
    },
    mutations: {

      retrieveToken(state, token) {
        state.token = token
      },

      destroyToken(state) {
        state.token = null;
      }

    },
    actions: {
      retrieveToken(context, credentials) {
        return new Promise((resolve, reject) => {
          axios.post('/login', {
            username: credentials.username,
            password: credentials.password,
          })
          .then(response => {
            const token = response.data.access_token

            localStorage.setItem('access_token', token)
            context.commit('retrieveToken', token)

            resolve(response);

          })
          .catch(error => {
            reject(error)
          })
        })
      },
      
      destroyToken(context) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

        if (context.getters.isLoggedIn) {
          return new Promise((resolve, reject) => {
            axios.post('/logout')
            .then(response => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken');
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
          })
        }
      },

      register(context, data) {
        return new Promise((resolve, reject) => {
          axios.post('/register', {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            password: data.password,
            password_confirmation: data.passwordConfirm,
            type: data.userType,
          })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        })
      }

    }
}