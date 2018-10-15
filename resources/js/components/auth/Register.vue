<template>
  <div class="container h-100">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-center">Register</h5>

            <div class="alert alert-danger" v-if="serverErrors">
              <div v-for="(value, key) in serverErrors" :key="key">
                {{ value[0] }}
              </div>
            </div>

            <form action="#" @submit.prevent="validateBeforeSubmit">
              <div class="row">
                <div class="col-md-12 text-center">
                  <div class="form-check form-check-inline">
                    <input 
                      v-validate="'required|included:employer,freelancer'" 
                      id="type_freelancer" 
                      v-model="userType"
                      class="form-check-input" 
                      type="radio" 
                      name="type" 
                      value="employer">
                    <label class="form-check-label" for="type_freelancer">Want to hire</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input 
                      id="type_employer"
                      v-model="userType"
                      class="form-check-input"
                      type="radio"
                      name="type"
                      value="freelancer">
                    <label class="form-check-label" for="type_employer">Want to work</label>
                  </div>
                  <div>
                    <small class="text-danger" v-show="errors.has('type')">{{ errors.first('type') }}</small>
                  </div>
                   
                </div>
              </div>
             
              <div class="form-group">
                <label>First Name</label>
                <input 
                  v-validate="'required'" 
                  id="first_name" 
                  v-model="firstName"
                  type="text" 
                  name="first_name" 
                  class="form-control">
                <small class="text-danger">{{ errors.first('first_name') }}</small>
              </div>

              <div class="form-group">
                <label>Last Name</label>
                <input 
                  v-validate="'required'" 
                  id="last_name" 
                  v-model="lastName"
                  type="text" 
                  name="last_name" 
                  class="form-control">
                <small class="text-danger">{{ errors.first('last_name') }}</small>
              </div>

              <div class="form-group">
                <label>Email address</label>
                <input 
                  v-validate="'required|email'" 
                  id="email"
                  v-model="email"
                  type="text"
                  name="email"
                  class="form-control">
                <small class="text-danger">{{ errors.first('email') }}</small>
              </div>

              <div class="form-group">
                <label>Password</label>
                <input 
                  v-validate="'required|confirmed:pw_confirm|min:6'" 
                  id="password"
                  v-model="password"
                  type="password"
                  name="password"
                  class="form-control">
                <small class="text-danger">{{ errors.first('password') }}</small>
              </div>

              <div class="form-group">
                <label>Confirm Password</label>
                <input 
                  id="password-confirm"
                  ref="pw_confirm"
                  v-model="passwordConfirm"
                  type="password" 
                  class="form-control" 
                  name="password_confirmation">
              </div>

              <button type="submit" class="btn btn-success btn-block">Submit</button>
            </form>
           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      userType: '',
      serverErrors: '',
      successMessage: ''
    }
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.register()
        }
      });
    },
    register() {
      this.$store.dispatch('register', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
        userType: this.userType
      })
      .then(response => {
        this.successMessage = 'Register Successfully!'
        this.$router.push({
          name: 'login',
          params: {
            dataSuccessMessage: this.successMessage
          } 
        })
      })
      .catch(error => {
        this.serverErrors = Object.values(error.response.data.errors)
      })
    }
  }
}
</script>
