<script>
import {defineComponent} from 'vue'
import App from "../App.vue";
import {useAppStore} from "@/store";
import axios from "axios";
import router from "@/router";

function decodeJwtResponse(token) {
  let base64Url = token.split('.')[1]
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload)
}

window.handleCredentialResponse = async (response) => {
  // decodeJwtResponse() is a custom function defined by you
  // to decode the credential response.
  const responsePayload = decodeJwtResponse(response.credential);
  await axios.post('http://127.0.0.1:4433' + '/login/google', {
        token: response.credential
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
      }).then(function (response) {
    useAppStore().login_with_token(response.data.token, responsePayload)
    router.push('/')
  }).catch(function (error) {
    console.log(error);
  });
  // console.log("ID: " + responsePayload.sub);
  // console.log('Full Name: ' + responsePayload.name);
  // console.log('Given Name: ' + responsePayload.given_name);
  // console.log('Family Name: ' + responsePayload.family_name);
  // console.log("Image URL: " + responsePayload.picture);
  // console.log("Email: " + responsePayload.email);
}
export default defineComponent({
  name: "LoginPage",
  computed: {
    App() {
      return App
    }
  },
  data: ()=>{
    return {
      appstore: useAppStore(),
      eye: false,
      disable_button: false,
      password:'',
      email:'',
      remember:true,
      password2: '',
      signup_form: false,
      username: null,
      password_match: null
    }
  },
  beforeMount() {
    if (document.getElementById('my-gsi-client')) return; // was already loaded
    let scriptTag = document.createElement("script");
    scriptTag.src = "https://accounts.google.com/gsi/client";
    scriptTag.id = "my-gsi-client";
    document.getElementsByTagName('head')[0].appendChild(scriptTag);
  },
  methods: {
    async login() {
      this.disable_button = true
      await this.appstore.login(this.email, this.password, this.remember)
      this.disable_button = false


    },
    async signup() {
      this.disable_button = true
      await this.appstore.signup(this.email, this.password)
      this.disable_button = false
    }

  }
})
</script>

<template>
  <div :data-bs-theme="appstore.app_theme" class="container">
    <div class="row">
      <div class="offset-md-2 col-lg-11 col-md-7 offset-lg-4 offset-md-3">
        <b-card class="panel border  ">
          <b-card-header class="panel-heading">
            <h4 class="py-2 font-weight-bold">{{signup_form? 'Signup' :'Login'}}</h4>
          </b-card-header>
          <b-card-body class="panel-body p-3">
            <b-alert v-if="appstore.signup_status" :variant="appstore.signup_status===400? 'danger':'warning'">
              {{appstore.signup_status===200? 'User Registered Successfully': appstore.signup_status===400? "Email Already registered.": ''}}</b-alert>
            <b-form>
              <b-form-group class="form-group py-2">


                <b-input-group class="input-field row py-2">
                  <b-col cols="2">
                    <b-icon class="primary far fa-user " icon="person"/>
                  </b-col>
                  <b-col cols="10">
                    <b-form-input v-model="email" class="" placeholder="Email" required type="email"/>
                  </b-col>
                </b-input-group>

                <b-input-group class="input-field row py-2 mt-2">
                  <b-col cols="2">
                    <b-icon class="primary far " icon="lock"/>
                  </b-col>
                  <b-col cols="">
                    <b-form-input v-model="password" :type="eye ?'text' : 'password'" placeholder="Enter your Password"
                                  />
                  </b-col>
                  <b-col cols="2">
                    <button class="btn text-muted" @click="eye = !eye">
                      <b-icon :icon="eye ? 'eye-fill': 'eye-slash-fill' " class="primary"></b-icon>
                    </button>
                  </b-col>
                </b-input-group>

                <b-input-group v-if="signup_form" class="input-field row py-2 mt-2">
                  <b-col cols="2">
                    <b-icon class="primary far " icon="lock"/>
                  </b-col>
                  <b-col cols="">
                    <b-form-input v-model="password2" :type="eye ?'text' : 'password'" placeholder="Repeat your Password"
                                  :state="password_match" @focusout="password_match=(password===password2)"/>
                    <b-form-invalid-feedback id="input-live-feedback">
                      Your passwords do not match.
                    </b-form-invalid-feedback>
                  </b-col>

                </b-input-group>



              </b-form-group>



              <b-form  class="form-inline" inline>
                <input v-model="remember" id="remember" name="remember" type="checkbox">
                <label class="text-muted me-2" for="remember">Remember me</label>
                <a id="forgot" class="d-none font-weight-bold" href="#">Forgot password?</a></b-form>

              <b-button :disabled="disable_button" class=" btn btn-primary btn-block px-3 py-1 mt-3" pill
                        @click="signup_form? signup() :login()"> {{signup_form? 'Signup' : "Login"}}
              </b-button>

              <div class="text-center pt-4 text-muted">{{signup_form? 'Already have an account?' : "Don't have an account?"}}  <span class="btn-link"  @click="signup_form=!signup_form">{{!signup_form? 'Signup' : "Login"}}</span></div>
            </b-form>

          </b-card-body>
          <b-card-footer class=" mx-3 my-2 py-2 bordert">
            <div id="g_id_onload"
                 data-auto_prompt="false"
                 data-callback="handleCredentialResponse"
                 data-client_id="519706053397-1739mh8juqvrs4tv89mer3dvdjoshl01.apps.googleusercontent.com"
                 style="color-scheme: light">
            </div>
            <div :data-theme="appstore.app_theme==='light' ? 'filled_black' :''"
                 class="g_id_signin w-100 d-flex justify-content-center my-3"
                 data-logo_alignment="left"
                 data-shape="rectangular"
                 data-size="large"
                 data-text="sign_in_with"
                 data-type="standard"
                 style="color-scheme: light">
            </div>
          </b-card-footer>
        </b-card>
      </div>
    </div>
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

@media (max-width: 980px) {
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