<template>
  <b-modal id="modal-xl" body-bg-variant="dark"
           body-text-variant="light"
           data-bs-theme="dark"
           footer-bg-variant="dark"
           footer-text-variant="light"
           header-bg-variant="dark"
           header-text-variant="light"
           size="xl" title="Create" visible>
    <b-button-group class="col mb-3 " cols="3">
      <b-button :pressed="displaymode===0" class="bg-dark-subtle" @click="displaymode=0">New Theatre</b-button>
      <b-button :pressed="displaymode===1" class="bg-dark-subtle" @click="displaymode=1">New Show</b-button>
    </b-button-group>
    <div v-if="displaymode===0">

      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-namet">Name</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="input-namet" v-model="theatre.name"  ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-place">Place</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="input-place" v-model="theatre.place" ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-capacity">Capacity</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="input-capacity" v-model="theatre.capacity" 
                        type="number"></b-form-input>
        </b-col>
      </b-row>
    </div>
    <div class="d-flex flex-row align-items-start" v-if="displaymode===1">
      <b-col>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="input-name-s">Name</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="show.name" id="input-name-s" ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="input-year">Year</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="show.year" id="input-year" ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="input-director">Director</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="show.director" id="input-director" ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="input-description">Description</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="show.description" id="input-description" ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="input-duration">Duration</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="show.duration" id="input-duration" ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col sm="4">
            <label for="input-poster">Poster</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="show.image_url" id="input-poster" ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="input-thumbnail">Thumbnail</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="show.image_sqr" id="input-thumbnail"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="input-tags">Tags</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="show.tags" id="input-tags" ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="input-ticket_price">Ticket Price</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="show.ticket_price" id="input-ticket_price" ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="input-format">Format</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="show.format" id="input-format"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="4">
            <label for="input-language">Language</label>
          </b-col>
          <b-col sm="7">
            <b-form-input v-model="show.language" list="my-list-id"></b-form-input>

            <datalist id="my-list-id">
              <option>English</option>
              <option>Hindi</option>
              <option>Tamil</option>
              <option>Kannada</option>
            </datalist>
          </b-col>
        </b-row>

      </b-col>
      <b-img thumbnail fluid-grow class="ml-2 imgr" style="max-width: 30%" :src="show.image_sqr"/>
      <b-img thumbnail fluid-grow class="imgr" style="min-height: 400px !important;" :src="show.image_url"/>
    </div>
    <template #modal-footer="{cancel}">
      <b-button size="md" variant="success" @click="displaymode===0 ? postTheatre() : postShow()">
        {{ displaymode===0 ? 'Create new Theatre': 'Create new Show' }}
      </b-button>
      <b-button size="md" variant="danger" @click="cancel()">
        Cancel
      </b-button>

    </template>
  </b-modal>
</template>
<style>
.imgr {
  display: block;
  max-width:300px !important;
  min-height: 300px!important;
  max-height:10%;
  width: auto;
  height: auto;
}
</style>
<script>
import App from "@/App.vue";

export default {
  name: 'NewShowModal',
  data: () => {
    return {
      displaymode: 1,
      theatre: {
        name: '',
        place: '',
        capacity: 0,
      },
      show:{
        name: "",
        image_url: "",
        image_sqr: "",
        tags: "",
        ticket_price: "",
        format: "",
        language: "",
        year:'',
        director:'',
        description:'',
        duration:'',
      }
    }
  },
  methods:{
    async postShow() {
      const rawResponse = await fetch('http://127.0.0.1:4433/api/shows', {
            method: 'POST',
            headers: App.$header(),
            body: JSON.stringify(this.show)
          }
      );
      const content = await rawResponse.json();
      console.log(content)
    },
    async postTheatre() {
      const rawResponse = await fetch('http://127.0.0.1:4433/api/theatre', {
            method: 'POST',
            headers: App.$header(),
            body: JSON.stringify(this.theatre)
          }
      );
      const content = await rawResponse.status;
      console.log(content)
    }
  }
}
</script>
