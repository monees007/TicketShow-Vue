<template>
  <div>
    <b-modal id="modal-booking" v-model="storeX.showModal1" body-bg-variant="dark" body-text-variant="light"
             class="d-flex flex-column" title="Book Tickets"
             footer-bg-variant="dark"
             footer-text-variant="light"
             header-bg-variant="dark"
             header-text-variant="light"
             no-stacking
             size="lg"
             visible>
      <b-row>
        <span class="left">Show</span>
        <b-col class="right"><h3> {{ show.name }}</h3>
          <span class="pillx" >{{ show.format }}</span>
          <span class="pillx" >{{ lang || 'ENG' }}</span>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <span class="left" >Theatre</span>
        <b-col class="right">
          <h4 style="max-width: fit-content">{{ theatre.name }} </h4>
          <h5 style="max-width: fit-content">{{ theatre.place }} </h5>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <span class="left">Date</span>
        <b-col class="right d-inline">

          <b-datepicker id="datepicker" v-model="value" class=""></b-datepicker>
        </b-col>

      </b-row>
      <b-row cols="mt-3">
        <span class="left">Time</span>
        <b-col class="right">
          <b-form-select class="w-100" v-model="time" :options="times" size="sm" variant="dark"></b-form-select>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <span class="left">Seats</span>
        <b-col class="right">
          <span v-for="x in (this.storeX.selectedSeats.split(',').splice(1))" :key="x" class="pillx">{{ x }}</span>
          <b-button v-b-modal.modal-multi-2>Select Seats</b-button>
        </b-col>

      </b-row>
    </b-modal>

    <b-modal id="modal-multi-2" v-model="storeX.showModal2"
             body-bg-variant="dark"
             body-text-variant="light"
             data-bs-theme="dark"
             footer-bg-variant="dark"
             footer-text-variant="light"
             header-bg-variant="dark"
             header-text-variant="light"
             ok-only title="Select seats">
      <div class="movie-container">


        <ul class="showcase">
          <li>
            <div class="seat"></div>
            <small>Available</small>
          </li>
          <li>
            <div class="seat selected"></div>
            <small>Selected</small>
          </li>
          <li>
            <div class="seat occupied"></div>
            <small>Occupied</small>
          </li>
        </ul>

        <div class="container">
          <div class="screen">Screen this side.</div>

          <div v-for="j in alphas" :key="j" class="row">
            <div v-for="i in 8" :id="j+i" :key="i"
                 :class="['seat', (occupiedSeat.includes(''+j+i))? 'occupied': '',(storeX.selectedSeats.includes(''+j+i))? 'selected': ''  ]"
                 @click="seatclick">{{ j + i }}
            </div>

          </div>
          <p class="mt-3">
            <span v-for="x in (this.storeX.selectedSeats.split(',').splice(1))" :key="x" class="pillx">{{ x }}</span>

          </p>
        </div>

      </div>
      <template #modal-footer="{cancel}">
        <b-button v-b-modal.modal-booking size="md" variant="success" @click="cancel()">
          {{ 'Done' }}
        </b-button>


      </template>
    </b-modal>


  </div>
</template>
<script>
import {useBookingStore} from "@/store/useBookingStore";

export default {
  name: 'BookingModal',
  props: ['show', 'theatre'],
  data: () => {
    return {
      storeX: useBookingStore(),

      lang: "",
      occupiedSeat: ['D6', 'E5', 'C5', 'C3',],

      value: null
    }
  },
  computed: {
    alphas: () => {
      return ["A", "B", "C", "D", "E", "F", "G", "H", "I",
        "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
        "T", "U", "V", "W", "X", "Y", "Z"].slice(0, 8)
    }

  },
  methods: {
    seatclick(e) {
      if (e.target.classList.contains('seat') &&
          !e.target.classList.contains('occupied')) {

        if (e.target.classList.contains('selected')) {
          this.storeX.updateSeats(this.storeX.selectedSeats.replace(',' + e.target.id, ''));
        } else
          this.storeX.updateSeats(this.storeX.selectedSeats + "," + e.target.id)
        e.target.classList.toggle('selected');
      }
    }
  }
}

</script>
<style>

.b-calendar-grid {
  width: 100% !important;
}

#datepicker__outer_ {
  display: inline-flex;
}
.left {
  width: 100px;
  margin-right: 10px;
  margin-left: 50px;
}

.right {
  padding-left: 20px;
  border-left: darkcyan dashed 2px;
}
.pillx{
  padding: 3px 5px;
  border-radius: 90px;
  margin:5px;
  font-weight: bold;
  background: #121212;
}

</style>
<style>


.container {
  perspective: 1000px;
  margin: 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.seat {
  background-color: darkgoldenrod;
  height: 25px !important;
  width: 30px !important;
  margin: 7px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: small;
}

.selected {
  background-color: #0081cb;
}

.occupied {
  background-color: gray;
}

.seat:nth-of-type(2) {
  margin-right: 18px;
}

.seat:nth-last-of-type(2) {
  margin-left: 18px;
}

.seat:not(.occupied):hover {
  cursor: pointer;
  transform: scale(1.2);
}

.showcase .seat:not(.occupied):hover {
  cursor: default;
  transform: scale(1);
}

.showcase {
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  background: rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  border-radius: 5px;
  color: #777;
  font-weight: bold;
}

.showcase li {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
}

.showcase li small {
  margin-left: 2px;
}

.row {
  display: flex;
  align-items: center;
  justify-content: center;
}

.screen {
  border: #a3cfbb solid 5px;
  background: #1f1611;
  height: 40px;
  width: 100%;
  margin: 15px 0 50px;
  transform: rotateX(-45deg);
  box-shadow: 0 3px 10px rgba(55, 55, 55, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: 768px) {

  .seat {
    height: 30px;
    width: 30px !important;
    margin: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    font-weight: bold;

  }
}
</style>