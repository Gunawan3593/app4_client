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
                <v-toolbar-title>Login with your account</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Username"
                    prepend-icon="mdi-account"
                    v-model="username"
                    :error-messages="usernameErrors"
                    required
                    @input="$v.username.$touch()"
                    @blur="$v.username.$touch()"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                    :error-messages="passwordErrors"
                    required
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-row>
                <v-col cols="12" md="12" class="text-right">
                    <v-btn @click="submit" rounded color="primary">Login</v-btn>
                </v-col>
                <v-col cols="12" md="12" class="text-center">
                    Need an account ? <v-btn small text color="primary" to="/register">Register</v-btn>
                </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex';
export default {
  mixins: [validationMixin],
  validations: {
    username: { required },
    password: { required }
  },
  computed: {
      usernameErrors () {
        const errors = []
        if (!this.$v.username.$dirty) return errors
        !this.$v.username.required && errors.push('Username is required.')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required.')
        return errors
      },
  },
  created() {
    
  },
  methods: {
      ...mapActions(['login','getProfile']),
      loginUser(){
          let user = {
              username: this.username,
              password: this.password
          };
          this.login(user)
          .then(res => {
              if(res.data.success) {
                  this.getProfile();
                  this.$router.push('/');
              }
          }).catch(err => {
              console.log(`There was an error ${err}`);
          });
      },
      submit () {
        this.$v.$touch();
        if(!this.$v.$error){
          this.loginUser();
        }
      }
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
}
</script>

<style>

</style>