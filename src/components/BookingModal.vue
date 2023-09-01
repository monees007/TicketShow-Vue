<template>
  <div>
    <b-modal id="modal-booking" v-model="storeX.showModal1" body-bg-variant="dark" body-text-variant="light"
             :data-bs-theme="appstore.app_theme" class="d-flex flex-column"
             footer-bg-variant="dark"
             footer-text-variant="light"
             header-bg-variant="dark"
             header-text-variant="light"
             no-stacking
             size="lg"
             title="Book Tickets"
             visible>
      <b-alert v-show="booking_successful" show variant="success">Booking Successful</b-alert>
      <b-row>
        <span class="left">Show</span>
        <b-col class="right"><h3> {{ show.name }}</h3>
          <span class="pillx">{{ show.format }}</span>
          <span class="pillx">{{ lang || 'ENG' }}</span>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <span class="left">Theatre</span>
        <b-col class="right">
          <h4 style="max-width: fit-content">{{ theatre.name }} </h4>
          <h5 style="max-width: fit-content">{{ theatre.place }} </h5>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <span class="left">Date</span>
        <b-col class="right d-inline">

          <b-datepicker id="datepicker" v-model="booking.date" class="my-2" required></b-datepicker>
        </b-col>

      </b-row>
      <b-row cols="mt-3">
        <span class="left">Slot</span>
        <b-col class="right">
          <b-form-select v-model="selected_run" :state="is_valid" class="my-2 input-field bg-dark text-light" required
                         @change="booking.rid = selected_run.id" @input="booking.total_price = total_p">
            <b-form-select-option :value="null" default disabled>Please select the show</b-form-select-option>

            <b-form-select-option v-for="r in this.storeX.running" :key="r.id" :value="r">{{
                'Starting at ' + r.start
              }}
            </b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <span class="left">Seats</span>
        <b-col class="right">
          <span v-for="x in (this.storeX.selectedSeats.split(',').splice(1))" :key="x" class="pillx">{{ x }}</span>
          <b-button v-b-modal.modal-multi-2>Select Seats</b-button>
        </b-col>

      </b-row>
      <b-row>
        <span class="left">Person</span>
        <b-col class="right my-3">
          <b-form-input v-model="person" min="1" required type="number"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <span class="left">Price</span>
        <b-col class="right my-3">
          <b-input-group prepend="₹">
            <b-form-input v-model="total_p" disabled type="number"></b-form-input>
          </b-input-group>
        </b-col>
      </b-row>
      <template #modal-footer>

        <b-button size="md" variant="danger" @click="storeX.showModal1=false">
          {{ 'Cancel' }}
        </b-button>
        <b-button size="md" variant="success" @click="booking_successful? storeX.showModal1=false : bookticket()">
          {{ booking_successful ? 'Done' : 'Confirm Booking' }}
        </b-button>
      </template>
    </b-modal>

    <b-modal id="modal-multi-2" v-model="storeX.showModal2"
             body-bg-variant="dark"
             body-text-variant="light"
             :data-bs-theme="appstore.app_theme"
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
                 :class="['seat', (selected_run.occupied_seats.includes(''+j+i))? 'occupied': '',(storeX.selectedSeats.includes(''+j+i))? 'selected': ''  ]"
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
import {useAppStore} from "@/store";
import {storeToRefs} from 'pinia'

export default {
  name: 'BookingModal',
  props: ['show', 'theatre'],
  setup() {
    const storeX = useBookingStore()
    const {showX} = storeToRefs(storeX).show
    return {showX}
  },
  data: () => {
    return {
      is_valid: true,
      selected_run: {
        ticket_price: 0,
        occupied_seats: '',
      },
      booking: {
        total_price: 0,
        person: 1,
      },
      storeX: useBookingStore(),
      appstore: useAppStore(),
      lang: "",
      value: null,

      booking_successful: false,
    }
  },

  computed: {
    alphas: () => {
      return ["A", "B", "C", "D", "E", "F", "G", "H", "I",
        "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
        "T", "U", "V", "W", "X", "Y", "Z"].slice(0, 8)
    },
    total_p() {
      return (this.person * this.selected_run.ticket_price)

    },
    person() {
      return (this.storeX.selectedSeats.split(',').splice(1).length)
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
    },
    async bookticket() {
      const rawResponse = await fetch(this.appstore.api + '/booking', {
        method: 'POST',
        headers: this.appstore.getheader(),
        body: JSON.stringify({
          running_id: this.selected_run.id,
          theatre_name: this.storeX.theatre.name,
          theatre_place: this.storeX.theatre.place,
          show_name: this.selected_run.show_name,
          language: this.selected_run.language,
          format: this.selected_run.format,
          person: this.person,
          date: this.booking.date,
          start: this.selected_run.start,
          end: this.selected_run.end,
          seats: this.storeX.selectedSeats,
          total_price: this.total_p,
        })
      });
      const content = await rawResponse.status;
      console.log('booking', content);
      const rawResponse2 = await fetch(this.appstore.api + '/running',
          {
            method: 'PATCH',
            headers: this.appstore.getheader(),
            body: JSON.stringify({
              id: this.selected_run.id,
              occupied_seats: this.selected_run.occupied_seats + this.storeX.selectedSeats
            })


          });
      const content2 = await rawResponse2.status;
      console.log('running', content2);
      this.booking_successful = true;
      setTimeout(() => {
            this.storeX.$reset()
          },
          3000
      )


    },



  },

}

</script>
<style>

.btn-outline-light {
  color: #a3cfbb !important;
  outline-color: #0a3622;
}

.b-calendar-grid-help {
  background: #121212 !important;
}

.b-calendar-grid {
  width: fit-content !important;
}

#datepicker__dialog_ {
  width: 50%;
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

.pillx {
  padding: 3px 5px;
  border-radius: 90px;
  margin: 5px;
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