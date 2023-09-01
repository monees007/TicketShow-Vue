<script>
import {defineComponent} from 'vue'
import App from "../App.vue";
import {useAppStore} from "@/store";

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
    }
  },
  methods: {
    async login() {
      this.disable_button = true
      await this.appstore.login(this.email, this.password)
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
            <h4 class="py-2 font-weight-bold">Login</h4>
          </b-card-header>
          <b-card-body class="panel-body p-3">
            <b-form action="" method="POST">
              <b-form-group class=" py-2">
                <b-input-group class="input-field row py-2">
                  <b-col cols="2">
                    <b-icon class="primary far fa-user " icon="person"/>
                  </b-col>
                  <b-col cols="10">
                    <b-form-input v-model="email"  class="" placeholder="Username or Email" required type="text"/>

                  </b-col>
                </b-input-group>
                <b-input-group class="input-field row py-2 mt-2">
                  <b-col cols="2">
                    <b-icon class="primary far " icon="lock"/>
                  </b-col>
                  <b-col cols="">
                    <b-form-input v-model="password" :type="eye ?'text' : 'password'" placeholder="Enter your Password" required/>

                  </b-col>
                  <b-col cols="2">
                    <b-button variant="outline" class="border-0 btn text-muted" @click="eye = !eye">
                      <b-icon :icon="eye ? 'eye-fill': 'eye-slash-fill' " class="primary"></b-icon>
                    </b-button>
                  </b-col>
                </b-input-group>
              </b-form-group>


              <b-form  class="form-inline" inline>
                <input v-model="remember" id="remember" name="remember" type="checkbox">
                <label class="text-muted me-2" for="remember">Remember me</label>
                <a id="forgot" class="d-none font-weight-bold" href="#">Forgot password?</a></b-form>

              <b-button :disabled="disable_button" class=" btn btn-primary btn-block px-3 py-1 mt-3" pill
                        @click="login">Login
              </b-button>

              <div class="text-center pt-4 text-muted">Don't have an account? <a href="#/signup">Sign up</a></div>
            </b-form>
          </b-card-body>
          <b-card-footer class=" d-none  mx-3 my-2 py-2 bordert">
            <div class="text-center py-3"><a class="px-2" href="https://wwww.facebook.com" target="_blank"> <img
                alt="" src="https://www.dpreview.com/files/p/articles/4698742202/facebook.jpeg"> </a> <a
                class="px-2" :href="App.$server+'/login/oauthstart/google'" target="_blank"> <img
                alt=""
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png">
            </a> <a class="px-2" href="https://www.github.com" target="_blank"> <img
                alt="" src="https://www.freepnglogos.com/uploads/512x512-logo-png/512x512-logo-github-icon-35.png"> </a>
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