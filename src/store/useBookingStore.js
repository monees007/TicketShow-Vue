import {defineStore} from 'pinia'

export const useBookingStore = defineStore('BookingStore', {
    state: () => (
        {
            count: 123,
            selectedSeats: '',
            show: {},
            theatre: {},
            showModal1: false,
            showModal2: false,
        }
    ),
    getters: {
        double: state => state.count * 2,
    },
    actions: {
        setValue(t, m) {
            console.log(t, m)
            this.theatre = t
            this.show = m

        },
        updateSeats(seats) {
            this.selectedSeats = seats
        }
    },
})
