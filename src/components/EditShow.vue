<template>
  <b-modal id="edit-show-modal" :data-bs-theme="appstore.app_theme" class="modal-fullscreen-sm-down"
           size="xl"
  >
    <template v-slot:modal-header="{ hide }">
      <b class="h3 mx-3">Edit Show</b>
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

    <b-button-group v-if="this.storeX.editorMode===0" class="col mb-3 mx-2 " cols="3">
      <b-button :pressed.sync="show_preview">{{ show_preview ? "Hide Image Preview" : "Show Image Preview" }}</b-button>
    </b-button-group>
    <b-form v-if="this.storeX.editorMode===1">

      <b-row class="my-1">
        <b-col sm="3">
          <label for="name">Name</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="name" v-model="this.storeX.selected_theatre.name"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label for="place">Place</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="place" v-model="this.storeX.selected_theatre.place"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label for="city">City</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="city" v-model="this.storeX.selected_theatre.city"
          ></b-form-input>
        </b-col>
      </b-row>
    </b-form>
    <div v-if="this.storeX.editorMode===0" class="d-md-flex flex-row align-items-start">
      <b-form id="show_form" :validated="state_show" class="col mx-md-4">
        <input id="id" v-model="this.show.id" hidden>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="name-s">Name</label>
          </b-col>
          <b-col sm="7">
            <b-form-input id="name" v-model="this.show.name" required></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="year">Year</label>
          </b-col>
          <b-col sm="7">
            <b-form-input id="year" v-model="this.show.year" required type="number"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="director">Director</label>
          </b-col>
          <b-col sm="7">
            <b-form-input id="director" v-model="this.show.director" required></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="description">Description</label>
          </b-col>
          <b-col sm="7">
            <b-form-input id="description" v-model="this.show.description" required></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="duration">Duration</label>
          </b-col>
          <b-col sm="7">
            <b-form-input id="duration" v-model="this.show.duration" required></b-form-input>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="4">
            <label for="poster">Poster</label>
          </b-col>
          <b-col sm="7">
            <b-form-input id="poster" v-model="this.show.image_url" required></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="thumbnail">Thumbnail</label>
          </b-col>
          <b-col sm="7">
            <b-form-input id="thumbnail" v-model="this.show.image_sqr" required></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="tags">Tags</label>
          </b-col>
          <b-col sm="7">
            <b-form-input id="tags" v-model="this.show.tags" required></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="ticket_price">Ticket Price</label>
          </b-col>
          <b-col sm="7">
            <b-form-input id="ticket_price" v-model="this.show.ticket_price" required></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="format">Format</label>
          </b-col>
          <b-col sm="7">
            <b-form-input id="format" v-model="this.show.format" required></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="language">Language</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="this.show.language" list="my-list-id" required></b-form-input>

            <datalist id="my-list-id">
              <option>English</option>
              <option>Hindi</option>
              <option>Tamil</option>
              <option>Kannada</option>
            </datalist>
          </b-col>
        </b-row>

      </b-form>
      <b-img v-show="show_preview" :src="this.show.image_sqr" class="ml-2 imgr" fluid-grow style="max-width: 30%"
             thumbnail/>
      <b-img v-show="show_preview" :src="this.show.image_url" class="imgr" fluid-grow
             style="min-height: 400px !important;"
             thumbnail/>
    </div>
    <template v-slot:modal-footer="{ cancel,hide }">
      <b-button size="sm" variant="secondary" @click="cancel()">Hide</b-button>
      <b-button size="sm" variant="success" @click="storeX.editorMode===1 ? postTheatre(hide) :postShow(hide)">Save
      </b-button>
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
import {useEditorStore} from "@/store/useEditorStore";

export default {
  name: 'EditShowModal',
  data: () => {
    return {
      appstore: useAppStore(),
      show_preview: false,
      displaymode: 1,
      state_show: false,
      state_theatre: false,
      storeX: useEditorStore(),
      show: {},
    }
  },
  async mounted() {
    this.loading = true;
    const response = await fetch(this.appstore.api + "/show?id=" + this.storeX.selected_show.id, {
      method: 'GET',
      headers: this.appstore.getheader()
    });
    if (response.status === 200) {
      this.show = await response.json()

    } else {
      this.error = true
    }
  },

  methods: {

    async postShow(hide) {
      // this.state_show = true

      // if (this.show.name === '' || this.show.image_url === '' || this.show.image_sqr === '' || this.show.tags === '' || this.show.ticket_price === '' || this.show.format === '' || this.show.language === '' || this.show.year === '' || this.show.director === '' || this.show.description === '' || this.show.duration === '') {
      //   return
      // }
      console.log(document.querySelector('#show_form'))
      const this2 = this
      await axios.put(this.appstore.api + '/shows', this.show,
          {
            headers: this.appstore.getheader()
          }).then(function (response) {
        if (response.status === 200) {
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
      await axios.put(this.appstore.api + '/theatre', this.theatre,
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
