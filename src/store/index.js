import {defineStore} from 'pinia'
import axios from "axios";
import router from "@/router";

export const useAppStore = defineStore('AppStore', {
    state: () => (
        {
            app_name: 'TicketShow',
            server: 'http://127.0.0.1:4433',
            api: 'http://127.0.0.1:4433/api',
            next_page: '/',
            auth_token: '',
            user: {
                role: '',
                email: '',
                username: '',
            },
            csrf: '',
            is_logged_in: false,

        }
    ),
    getters: {
        double: state => state.count * 2,

    },
    actions: {
        check_for_token() {
            try {
                this.auth_token = window.localStorage.getItem('Authentication-Token');
                this.csrf = window.localStorage.getItem('csrf_token');
                this.is_logged_in = true
                console.log('Token Found')
                this.get_user()
            } catch (e) {
                console.log(e)
                router.push({path: 'login'})
            }
        },
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
                self.get_user()
                self.is_logged_in = true
                console.log('Logged in Successfully')
                router.push({path: self.next_page})
            }).catch(function (error) {
                console.log(error);
            });
        },
        async get_user() {
            const rawResponse = await fetch(this.api + '/user',
                {
                    method: 'GET',
                    headers: this.getheader(),
                }
            );
            const content = await rawResponse.json();
            this.user.email = content.email
            this.user.role = content.name
            this.user.username = content.username
        },
        async logout() {
            const self = this
            await axios.post(this.server + '/logout'
            ).then((response) => {
                if (response.status === 200) {
                    window.localStorage.removeItem("Authentication-Token");
                    window.localStorage.removeItem("csrf_token");
                    self.auth_token = ''
                    self.csrf = ''
                    self.is_logged_in = false
                    console.log("logout Successful")
                }
            })


        },
        getheader() {
            if (this.is_logged_in && this.auth_token) {
                return {
                    "Content-Type": "application/json", "Authentication-Token": this.auth_token,
                }
            }
            this.next_page = router.currentRoute.path
            router.push({path: 'login'})
        }

    },
})
