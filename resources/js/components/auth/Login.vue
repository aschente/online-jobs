<template>
  <div class="container h-100">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-center">OnlineJobs</h5>

            <div v-if="successMessage" class="alert alert-success">
              {{successMessage}}
            </div>

            <div class="alert alert-danger" v-if="serverError">
              {{ serverError }}
            </div>

            <form action="#" @submit.prevent="validateBeforeSubmit">
              <div class="form-group">
                <label>Email address</label>
                <input 
                  v-validate="'required|email'"
                  id="email" 
                  v-model="username"
                  type="text" 
                  name="email" 
                  class="form-control">
                <small class="text-danger">{{ errors.first('email') }}</small>
              </div>
              <div class="form-group">
                <label>Password</label>
                <input
                  v-validate="'required|min:6'" 
                  id="password" 
                  v-model="password"
                  type="password" 
                  name="password" 
                  class="form-control">
                <small class="text-danger">{{ errors.first('password') }}</small>
              </div>
              <button type="submit" class="btn btn-success">Login</button>
            </form>
           
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
    name: 'Login',
    props: {
      dataSuccessMessage: {
        type: String
      }
    },
    data() {
      return {
        username: '',
        password: '',
        serverError: '',
        successMessage: this.dataSuccessMessage
      }
    },
    methods: {
      validateBeforeSubmit() {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.login()
          }
        });
      },
      login() {
        this.$store.dispatch('retrieveToken', {
          username: this.username,
          password: this.password,
        })
        .then(response => {
          this.$router.push({ name: 'find-work' })
        })
        .catch(error => {
          this.serverError = error.response.data
          this.password = ''
          this.successMessage = ''
        })
      }
    }
}
</script>
