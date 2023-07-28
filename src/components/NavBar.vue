<template>
  <div class="NavBar">
    <b-navbar class="text-primary fixed-top bg-dark " style="justify-content: space-between !important;">
      <b-navbar-nav>
        <b-avatar v-show="search_not_toggled" class="d-flex justify-content-center align-items-center mx-3 bg-secondary" style="width: 50px"/>
        <b-navbar-brand v-show="search_not_toggled" class="hide text-light" href="#">
          <img alt="Kitten"
               class="d-inline-block align-top"
               src="https://cdn4.iconfinder.com/data/icons/flat-design-development-set-3/24/color-wheel-512.png"
               style="height: 37px">
          TicketShow
        </b-navbar-brand>
      </b-navbar-nav>
      <div class="d-inline-flex align-items-center">

      <b-input-group v-show="!search_not_toggled" id="search" class="mx-lg-5 bg-secondary text-light d-md-flex" style="max-width: 730px">
        <b-icon class="mx-3" icon="search"></b-icon>
        <b-form-input class="text-right bg-secondary text-light border-0" data-bs-theme="dark"
                      placeholder="search"></b-form-input>
        <b-dropdown class="mx-3 border-0 text-light" data-bs-theme="dark" right text="City" variant="outline">
          <b-dropdown-item>Item 1</b-dropdown-item>
          <b-dropdown-item>Item 2</b-dropdown-item>
          <b-dropdown-item>Item 3</b-dropdown-item>
        </b-dropdown>
      </b-input-group>

        <b-icon @click="search_not_toggled=!search_not_toggled" class="mx-3 d-sm-inline-block d-md-none" :icon="search_not_toggled ? 'search': 'x-lg' "></b-icon>
        <b-button v-show="search_not_toggled" data-bs-theme pill variant="outline-secondary">
          <b-icon aria-hidden="true" icon="sun-fill"></b-icon>
        </b-button>
        <b-button v-b-toggle.sidebar-1 v-show="search_not_toggled" pill variant="outline-secondary">SB</b-button>

      </div>


    </b-navbar>
  </div>


</template>

<script>

export default {
  name: 'NavBar',
  data: () => {
    return {
      search_not_toggled: true
    }
  }
};
</script>

<style scoped>
#search {

  border-radius: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
@media (max-width:768px){
  .hide{
    display: none !important;
  }
}
</style>