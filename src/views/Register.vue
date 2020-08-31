<template>
    <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="5"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Register an account</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                    <v-text-field
                    label="Name"
                    prepend-icon="mdi-account-tie"
                    type="text"
                    v-model="name"
                    :error-messages="nameErrors"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                    ></v-text-field>

                  <v-text-field
                    label="Username"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="username"
                    :error-messages="usernameErrors"
                    required
                    @input="checkUser($event)"
                    @blur="$v.username.$touch()"
                  ></v-text-field>

                  <v-text-field
                    label="Email"
                    prepend-icon="mdi-email"
                    type="text"
                    v-model="email"
                    :error-messages="emailErrors"
                    required
                    @input="checkEmail($event)"
                    @blur="$v.email.$touch()"
                  ></v-text-field>

                  <v-text-field
                    label="Password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                    :error-messages="passwordErrors"
                    required
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                  ></v-text-field>

                  <v-text-field
                    label="Confirm Password"
                    prepend-icon="mdi-lock-reset"
                    type="password"
                    v-model="confirm_password"
                    :error-messages="confirm_passwordErrors"
                    required
                    @input="$v.confirm_password.$touch()"
                    @blur="$v.confirm_password.$touch()"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-row>
                <v-col cols="12" md="12" class="text-right">
                    <v-btn @click="submit" rounded color="primary">Register</v-btn>
                </v-col>
                <v-col cols="12" md="12" class="text-center">
                    Already have an account ? <v-btn small text color="primary" to="/login">Login</v-btn>
                </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex';
export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    username: { required },
    email: { required, email },
    password: { required, minLength: minLength(6)  },
    confirm_password: { required }
  },
  computed: {
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      usernameErrors () {
        const errors = []
        if (!this.$v.username.$dirty) return errors
        !this.$v.username.required && errors.push('Username is required.')
        this.user_exists.status && errors.push(this.user_exists.msg)
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Example : JohnDue@gmail.com')
        !this.$v.email.required && errors.push('Email is required.')
        this.email_exists.status && errors.push(this.email_exists.msg)
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('Min 6 Character')
        !this.$v.password.required && errors.push('Password is required.')
        return errors
      },
      confirm_passwordErrors () {
        const errors = []
        if (!this.$v.confirm_password.$dirty) return errors
        !this.$v.confirm_password.required && errors.push('Confirm password is required.')
        this.password !== this.confirm_password && errors.push('Password is not match.')
        return errors
      },
  },
  data() {
    return {
      name: '',
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      user_exists: {
        status: false,
        msg: null
      },
      email_exists: {
        status: false,
        msg: null
      }
    }
  },
  created() {
    
  },
  methods: {
    ...mapActions(['register','checkUsername','checkUseremail']),
    registerUser() {
        let user = {
            name: this.name,
            username: this.username,
            email: this.email,
            password: this.password,
            confirm_password: this.confirm_password
        };
        this.register(user).then(res => {
            if(res.data.success) {
                this.$router.push('login');
            }
        })
    },
    checkUser() {
      let user = {
        username : this.username
      }
      this.checkUsername(user).then(res => {
        this.user_exists.status = res.data.exists;
        this.user_exists.msg = res.data.msg;
      });
    },
    checkEmail() {
      let email = {
        email : this.email
      }
      this.checkUseremail(email).then(res => {
        this.email_exists.status = res.data.exists;
        this.email_exists.msg = res.data.msg;
      });
    },
    submit () {
      this.$v.$touch();
      if(!this.$v.$error && !this.user_exists.status && !this.email_exists.status && (this.password == this.confirm_password)){
        this.registerUser();
      }
    }
  }
}
</script>

<style>

</style>