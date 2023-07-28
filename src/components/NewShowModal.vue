<template>
  <b-modal id="modal-xl" size="xl" title="Extra Large Modal">
    <b-row class="my-1">
      <b-col sm="3">
        <label for="input-default">Name</label>
      </b-col>
      <b-col sm="9">
        <b-form-input id="input-default" placeholder="Title of the show"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3">
        <label for="input-default">Rating</label>
      </b-col>
      <b-col sm="9">
        <b-form-rating id="rating-inline" class="bg-secondary " color="white" inline
                       value="4"></b-form-rating>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3">
        <label for="input-default">Poster</label>
      </b-col>
      <b-col sm="9">
        <b-form-input id="input-default" placeholder="Theatre name"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3">
        <label for="input-default">Thumbnail</label>
      </b-col>
      <b-col sm="9">
        <b-form-input id="input-default" placeholder="Theatre name"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3">
        <label for="input-default">Tags</label>
      </b-col>
      <b-col sm="9">
        <b-form-input id="input-default" placeholder="Theatre name"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3">
        <label for="input-default">Ticket Price</label>
      </b-col>
      <b-col sm="9">
        <b-form-input id="input-default" placeholder="Theatre name"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3">
        <label for="input-default">Format</label>
      </b-col>
      <b-col sm="9">
        <b-form-input id="input-default" placeholder="Show Format"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3">
        <label for="input-default">Language</label>
      </b-col>
      <b-col sm="9">
        <b-form-input list="my-list-id"></b-form-input>

        <datalist id="my-list-id">
          <option>English</option>
          <option>Hindi</option>
          <option>Tamil</option>
          <option>Kannada</option>
        </datalist>
      </b-col>
    </b-row>

  </b-modal>
</template>
<script>
export default {
  name: 'NewShowModal'
}
</script>