<script>
import {defineComponent} from 'vue'
import App from "@/App.vue";
import axios from "axios";

export default defineComponent({
  name: "SignUpPage",
  methods:{
    async signup() {
      this.disable_button = true
      console.log('next='+ App.$next)
      await axios.post(App.$server + '/register', {
            email: this.email,
            password: this.password,
            username: this.username,
          }, {
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json'
            },

          }
      )
          .then(function (response) {

            App.data.logged = true
            console.log('Logged in Successfully',response)
            App.$router.push('#/login')
          })
          .catch(function (error) {
            console.log(error);
          });
      this.disable_button = false



    },
  },
  data : ()=>{
    return{
      eye: false,
      disable_button:false,
      email: '',
      password: '',
      username: '',
    }
  },
})
</script>

<template>
  <div class="container" data-bs-theme="dark">
    <div class="row">
      <div class="offset-md-2 col-lg-11 col-md-7 offset-lg-4 offset-md-3">
        <b-card class="panel border  ">
          <b-card-header class="panel-heading">
            <h4 class="py-2 font-weight-bold">SignUp</h4>
          </b-card-header>
          <b-card-body class="panel-body p-3">
            <b-form action="" method="POST">
              <b-form-group class="form-group py-2">
                <b-input-group class="input-field row py-2">
                  <b-col cols="2">
                    <b-icon class="primary far fa-user " icon="person"/>
                  </b-col>
                  <b-col cols="10">
                    <b-form-input class="" v-model="email" placeholder="Email" required type="text"/>
                  </b-col>
                </b-input-group>
                <b-input-group class="input-field row py-2 mt-2">
                  <b-col cols="2">
                    <b-icon class="primary  fa-user " icon="hash"/>
                  </b-col>
                  <b-col cols="10">
                    <b-form-input class="" v-model="username" placeholder="Username" required type="text"/>
                  </b-col>
                </b-input-group>
                <b-input-group class="input-field row py-2 mt-2">
                  <b-col cols="2">
                    <b-icon class="primary far " icon="lock"/>
                  </b-col>
                  <b-col cols="">
                    <b-form-input v-model="password" placeholder="Enter your Password" required :type="eye ?'text' : 'password'"/>
                  </b-col>
                  <b-col cols="2">
                    <button @click="eye = !eye" class="btn text-muted">
                      <b-icon class="primary" :icon="eye ? 'eye-fill': 'eye-slash-fill' "></b-icon>
                    </button>
                  </b-col>
                </b-input-group>
              </b-form-group>


              <b-button :disabled="disable_button" pill @click="signup" class=" btn btn-primary btn-block px-3 py-1 mt-3">Signup</b-button>
              <div class="text-center pt-4 text-muted">Already have an account? <a href="#/login">Login</a></div>
            </b-form>
          </b-card-body>
          <b-card-footer class="d-none mx-3 my-2 py-2 bordert">
            <div class="text-center py-3"><a class="px-2" href="https://wwww.facebook.com" target="_blank"> <img
                alt="" src="https://www.dpreview.com/files/p/articles/4698742202/facebook.jpeg"> </a> <a
                class="px-2" href="https://www.google.com" target="_blank"> <img
                alt=""
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png">
            </a> <a class="px-2" href="https://www.github.com" target="_blank"> <img
                alt="" src="https://www.freepnglogos.com/uploads/512x512-logo-png/512x512-logo-github-icon-35.png"> </a>
            </div>
          </b-card-footer>
        </b-card>
      </div>
    </div>
    <b-container class="d-none container">
      <b-row class="">
        <b-col class="offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3">
          <b-card class="panel border bg-white">
            <b-card-header class="panel-heading">
              <h3 class="pt-3 font-weight-bold">Login</h3>
            </b-card-header>
            <b-card-body class=" p-3">
              <b-form action="" method="POST">
                <b-form-group class=" py-2">
                  <b-input-group class="input-field">
                    <b-icon class="far fa-user p-2" icon="person"></b-icon>
                    <b-input placeholder="Username or Email"
                             required
                             type="text"/>
                  </b-input-group>
                </b-form-group>
                <b-form-group class=" py-1 pb-2">
                  <b-input-group class="input-field">
                    <b-icon class="fas fa-lock px-2" icon="lock"></b-icon>
                    <b-input placeholder="Enter your Password"
                             required
                             type="password"/>
                    <b-button class="btn bg-white text-muted">
                      <b-icon class="far fa-eye-slash" icon="eye-slash"></b-icon>
                    </b-button>
                  </b-input-group>
                </b-form-group>
                <b-form class="form-inline" inline>
                  <b-checkbox id="remember" name="remember" type="checkbox"/>
                  <label class="text-muted" for="remember">Remember me</label>
                </b-form>
                <a id="forgot" class="font-weight-bold" href="#">Forgot password?</a>

                <b-button class="btn btn-primary btn-block mt-3">Login</b-button>
                <div class="text-center pt-4 text-muted">Don't have an account? <a href="#">Sign up</a></div>
              </b-form>
            </b-card-body>
            <div class="mx-3 my-2 py-2 bordert">
              <div class="text-center py-3"><a class="px-2" href="https://wwww.facebook.com" target="_blank"> <img
                  alt="" src="https://www.dpreview.com/files/p/articles/4698742202/facebook.jpeg"> </a> <a
                  class="px-2" href="https://www.google.com" target="_blank"> <img
                  alt=""
                  src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png">
              </a> <a class="px-2" href="https://www.github.com" target="_blank"> <img
                  alt="" src="https://www.freepnglogos.com/uploads/512x512-logo-png/512x512-logo-github-icon-35.png">
              </a>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif
}

body {
  height: 100vh;
  background: linear-gradient(to top, #c9c9ff 50%, #9090fa 90%) no-repeat
}

.container {
  margin: 50px auto
}

.panel-heading {
  text-align: center;
  margin-bottom: 10px
}

#forgot {
  min-width: 100px;
  margin-left: auto;
  text-decoration: none
}

a:hover {
  text-decoration: none
}

.form-inline label {
  padding-left: 10px;
  margin: 0;
  cursor: pointer
}

.btn.btn-primary {
  margin-top: 20px;
  border-radius: 15px
}

.panel {
  min-height: 380px;
  box-shadow: 2px 2px 8px rgb(18, 18, 18);
  border-radius: 12px
}

.input-field {
  border-radius: 5px;
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid #333;
  color: #4343ff
}

input[type='text'],
input[type='password'] {
  border: none;
  outline: none;
  box-shadow: none;
  width: 100%
}

.fa-eye-slash.btn {
  border: none;
  outline: none;
  box-shadow: none
}

img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  position: relative
}

a[target='_blank'] {
  position: relative;
  transition: all 0.1s ease-in-out
}

.bordert {
  border-top: 1px solid #333;
  position: relative
}

.bordert:after {
  content: "or connect with";
  position: absolute;
  top: -13px;
  left: 30%;
  background-color: $secondary;
  padding: 0px 8px
}

@media (max-width: 360px) {
  #forgot {
    margin-left: 0;
    padding-top: 10px
  }

  body {
    height: 100%
  }

  .container {
    margin: 30px 0
  }

  .bordert:after {
    left: 25%
  }
}
</style>