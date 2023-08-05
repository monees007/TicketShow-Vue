import {defineStore} from 'pinia'
import axios from "axios";

export const useAppStore = defineStore('AppStore', {
    state: () => (
        {
            app_name: 'TicketShow',
            server: 'http://127.0.0.1:4433',
            api: 'http://127.0.0.1:4433/api',
            next_page: '/',
            auth_token: '',
            csrf: '',
            is_logged_in: false,

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
        },
        async login(email, password) {
            const self = this
            await axios.post(self.server + '/login?&include_auth_token=true', {
                    email: email,
                    password: password,
                    remember: false
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json'
                    },
                }).then(function (response) {
                self.auth_token = response.data.response.user['authentication_token']
                self.csrf = response.data.response['csrf_token']
                window.localStorage.setItem("Authentication-Token", self.auth_token);
                window.localStorage.setItem("csrf_token", self.csrf);
                self.is_logged_in = true
                console.log('Logged in Successfully')
            }).catch(function (error) {
                console.log(error);
            });
        },
        async logout() {
            await axios.post(this.server + '/logout'
            ).then((response) => {
                if (response.status === 200) {
                    console.log("logout Successful")
                }
            })


        },
        getheader() {
            if (!this.auth_token) {
                this.auth_token = window.localStorage.getItem('Authentication-Token');
                this.csrf = window.localStorage.getItem('csrf_token');
            }
            return {
                "Content-Type": "application/json", "Authentication-Token": this.auth_token,
            }
        }

    },
})
