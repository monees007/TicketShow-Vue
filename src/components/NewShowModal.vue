<template>
  <b-modal id="modal-xl" :data-bs-theme="appstore.app_theme" class="modal-fullscreen-sm-down"
           size="xl"
           visible>
    <template v-slot:modal-header="{ hide }">
      <b class="h3 mx-3">Create</b>
      <div class="pa-2 mx-4" @click="hide">
        <b-icon class="" icon="x-lg"/>

      </div>
    </template>
    <!--    body-bg-variant="dark"-->
    <!--    body-text-variant="light"-->
    <!--    data-bs-theme="dark"-->
    <!--    footer-bg-variant="dark"-->
    <!--    footer-text-variant="light"-->
    <!--    header-bg-variant="dark"-->
    <!--    header-text-variant="light"-->
    <b-button-group class="col mb-3 " cols="3">
      <b-button :pressed="displaymode===0" class="" @click="displaymode=0">New Theatre</b-button>
      <b-button :pressed="displaymode===1" class="" @click="displaymode=1">New Show</b-button>
    </b-button-group>
    <b-button-group class="col mb-3 mx-2 " cols="3">
      <b-button :pressed.sync="show_preview">{{ show_preview ? "Hide Image Preview" : "Show Image Preview" }}</b-button>
    </b-button-group>
    <div v-if="displaymode===0">

      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-namet">Name</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="input-namet" v-model="theatre.name"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-place">Place</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="input-place" v-model="theatre.place"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-city">City</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="input-city" v-model="theatre.city"
          ></b-form-input>
        </b-col>
      </b-row>
    </div>
    <div v-if="displaymode===1" class="d-md-flex flex-row align-items-start">
      <b-form :validated="state_show" class="col mx-md-4">
        <b-row class="my-1">
          <b-col sm="4">
            <label for="input-name-s">Name</label>
          </b-col>
          <b-col sm="7">
            <b-form-input id="input-name-s" v-model="show.name" required></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="input-year">Year</label>
          </b-col>
          <b-col sm="7">
            <b-form-input id="input-year" v-model="show.year" required type="number"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="input-director">Director</label>
          </b-col>
          <b-col sm="7">
            <b-form-input id="input-director" v-model="show.director" required></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="input-description">Description</label>
          </b-col>
          <b-col sm="7">
            <b-form-input id="input-description" v-model="show.description" required></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="input-duration">Duration</label>
          </b-col>
          <b-col sm="7">
            <b-form-input id="input-duration" v-model="show.duration" required></b-form-input>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="4">
            <label for="input-poster">Poster</label>
          </b-col>
          <b-col sm="7">
            <b-form-input id="input-poster" v-model="show.image_url" required></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="input-thumbnail">Thumbnail</label>
          </b-col>
          <b-col sm="7">
            <b-form-input id="input-thumbnail" v-model="show.image_sqr" required></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="input-tags">Tags</label>
          </b-col>
          <b-col sm="7">
            <b-form-input id="input-tags" v-model="show.tags" required></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="input-ticket_price">Ticket Price</label>
          </b-col>
          <b-col sm="7">
            <b-form-input id="input-ticket_price" v-model="show.ticket_price" required></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="input-format">Format</label>
          </b-col>
          <b-col sm="7">
            <b-form-input id="input-format" v-model="show.format" required></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="input-language">Language</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="show.language" list="my-list-id" required></b-form-input>

            <datalist id="my-list-id">
              <option>English</option>
              <option>Hindi</option>
              <option>Tamil</option>
              <option>Kannada</option>
            </datalist>
          </b-col>
        </b-row>

      </b-form>
      <b-img v-show="show_preview" :src="show.image_sqr" class="ml-2 imgr" fluid-grow style="max-width: 30%" thumbnail/>
      <b-img v-show="show_preview" :src="show.image_url" class="imgr" fluid-grow style="min-height: 400px !important;"
             thumbnail/>
    </div>
    <template v-slot:modal-footer="{ cancel,hide }">
      <b-button size="sm" variant="secondary" @click="cancel()">Hide</b-button>
      <b-button size="sm" variant="success" @click="displaymode===0 ? postTheatre(hide) :postShow(hide)">Save</b-button>
    </template>
  </b-modal>
</template>
<style>
.imgr {
  display: block;
  max-width: 300px !important;
  min-height: 300px !important;
  max-height: 10%;
  width: auto;
  height: auto;
}
</style>
<script>
import {useAppStore} from "@/store";
import axios from "axios";

export default {
  name: 'NewShowModal',
  data: () => {
    return {
      appstore: useAppStore(),
      show_preview: false,
      displaymode: 1,
      state_show: false,
      state_theatre: false,
      theatre: {
        name: '',
        place: '',
        city: '',
      },
      show: {
        name: "",
        image_url: "",
        image_sqr: "",
        tags: "",
        ticket_price: "",
        format: "",
        language: "",
        year: '',
        director: '',
        description: '',
        duration: '',
      }
    }
  },
  methods: {
    async postShow(hide) {
      this.state_show = true

      if (this.show.name === '' || this.show.image_url === '' || this.show.image_sqr === '' || this.show.tags === '' || this.show.ticket_price === '' || this.show.format === '' || this.show.language === '' || this.show.year === '' || this.show.director === '' || this.show.description === '' || this.show.duration === '') {
        return
      }
      const this2 = this

      await axios.post(this.appstore.api + '/shows', this.show,
          {
            headers: this.appstore.getheader()
          }).then(function (response) {
        if (response.status === 200) {
          this2.show.name = ''
          this2.show.image_url = ''
          this2.show.image_sqr = ''
          this2.show.tags = ''
          this2.show.ticket_price = ''
          this2.show.format = ''
          this2.show.language = ''
          this2.show.year = ''
          this2.show.director = ''
          this2.show.description = ''
          this2.show.duration = ''
          hide()
        } else {
          console.log(response)
          this2.error = true;

        }
      }).catch(function (error) {
        console.log(error);
        this2.error = true;
      });
    },
    async postTheatre(hide) {
      this.state_theatre = true
      if (this.theatre.name === '' || this.theatre.place === '' || this.theatre.city === '') {
        return
      }
      const this2 = this
      await axios.post(this.appstore.api + '/theatre', this.theatre,
          {
            headers: this.appstore.getheader()
          }).then(function (response) {
        if (response.status === 200) {
          this2.theatre.name = ''
          this2.theatre.place = ''
          this2.theatre.city = ''
          hide()
        } else {
          console.log(response)
          this2.error = true;
        }
      }).catch(function (error) {
        console.log(error);
        this2.error = true;
      });
    }
  }
}
</script>
