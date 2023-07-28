<template>
  <b-button
      variant="outline"
      v-b-modal.modal-xl
      id="fab1"
      class="d-flex align-items-center justify-content-center position-fixed ">
    <b-icon icon="plus-lg"></b-icon>
  </b-button>
</template>
<script>
export default {
  name: 'FloatingActionButton'
}
</script>
<style>
#fab1 {
  width: 7vh;
  height: 7vh;
  border-radius: 90px;
  background: #0c5460;
  color: #f8f9fa;
  bottom: 20px;
  right: 20px
}
</style>