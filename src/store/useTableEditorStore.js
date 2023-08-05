import {defineStore} from 'pinia'
// import router from "@/router";

export const useTableEditorStore = defineStore('TableEditorStore', {
    state: () => ({
        app_name: 'TicketShow',
        server: 'http://127.0.0.1:4433',
        api: 'http://localhost:4433/api',
        logged_in: false,
        login_error: [],
        next_page: '#/',
        admin: false,
        csrf_token: '',
        auth_token: '',
        show_field: [{key: "edit", label: ''}, {key: "delete", label: ""}, {key: "edit", label: ""}, {
            key: 'index',
            class: 'id-col'
        }, {key: "name", label: "Name", type: "text", editable: true,}, {
            key: "year",
            label: "Year",
            editable: true
        }, {key: "director", label: "Director", editable: true}, {
            key: "duration",
            label: "Duration",
            editable: true
        }, {key: "tags", label: "Tags", type: "text", editable: true}, {
            key: "ticket_price",
            label: "Ticket Price",
            type: "text",
            editable: true
        }, {key: "format", label: "Format", type: "text", editable: true}, {
            key: "language",
            label: "Language",
            type: "text",
            editable: true
        }, {key: "image_url", label: "Poster", type: "url", editable: true, class: 'link-col'}, {
            key: "image_sqr",
            label: "Thumbnail",
            type: "url",
            editable: true,
            class: 'link-col'
        }, {key: "description", label: "Description", editable: true},],
        theatre_field: [{key: "edit", label: ''}, {key: "edit", label: ''}, {
            key: "delete",
            label: ""
        }, {key: 'index', class: 'id-col'}, {
            key: "name",
            label: "Name",
            type: "text",
            editable: true,
        }, {key: "place", label: "Place", editable: true}, {key: "capacity", label: "Capacity", editable: true},


        ],
        show_data: [],
        theatre_data: [],
        // router: router

    }), getters: {
        header: () => {
            // if (this.auth_token) {
            //     this.auth_token = window.localStorage.getItem('Authentication-Token');
            //     this.$csrf = window.localStorage.getItem('csrf_token');
            // } else
            if (this.auth_token) {
                return {
                    "Content-Type": "application/json", "Authentication-Token": this.auth_token,
                }
            } else {
                console.log('token missing (?or expired)')
                // this.next = router.currentRoute.path
                // router.push({path: 'login'})
            }
        }, next: () => {
            if (this.next_page === '#/login') {
                this.next_page = '#/'
            }
            return this.next_page
        }

    }, actions: {
        setValue(t, m) {
            console.log(t, m)
            this.theatre = t
            this.show = m

        }, updateSeats(seats) {
            this.selectedSeats = seats
        }, async update_data(show_or_theatre) {
            try {
                this.loading = true;
                const response = await fetch("http://127.0.0.1:4433/api/bulk/" + (show_or_theatre ? 'shows' : 'theatre'), {
                    method: 'GET', headers: this.header,
                });
                console.log(response.status)
                if (response.status === 200) {
                    if (show_or_theatre) {
                        this.show_data = await response.json();
                    } else {
                        this.theatre_data = await response.json();
                    }
                    this.loading = false;
                } else {
                    throw new TypeError("Token expired"); // will check for token and push to log in
                }
            } catch (e) {
                this.next_page = '#/dashboard'
                // router.push({path: 'login'})
            }


        }, async logout() {
            let res = await fetch(this.server + '/logout', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json', 'accept': '*/*'
                },
            })
            console.log(res.status)
        }, async login(email, password, remember) {
            const rawResponse = await fetch(this.server + '/login?include_auth_token=true', {
                method: 'POST', headers: {
                    'Accept': 'application/json', 'Content-Type': 'application/json'
                }, body: JSON.stringify({email: email, password: password, remember: remember})
            });

            const content = await rawResponse.json();
            if (content.meta.code === 200) {
                this.auth_token = content.response.user['authentication_token']
                this.csrf = content.response['csrf_token']
                window.localStorage.setItem("Authentication-Token", this.auth_token);
                window.localStorage.setItem("csrf_token", this.csrf);
                console.log(200, "Login Successful")
            } else if (content.meta.code === 400) {
                this.login_error = [400, 'Incorrect Credentials']
                console.log(this.login_error)
            }


        }, csvToJson() {
            var input = document.createElement('input');
            input.type = 'file';

            input.onchange = e => {

                // getting a hold of the file reference
                let file = e.target.files[0];

                // setting up the reader
                let reader = new FileReader();
                reader.readAsText(file, 'UTF-8');

                // here we tell the reader what to do when it's done reading...
                reader.onload = readerEvent => {
                    let csv = readerEvent.target.result; // this is the content!
                    let data = require('jquery-csv').toObjects(csv);
                    console.log(data)
                    this.rows = data
                }

            }

            input.click();
        }, jsonToCSV(show_or_theatre, fileTitle = 'export') {
            let items
            if (show_or_theatre) {
                items = this.show_data
            } else {
                items = this.theatre_data
            }
            const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
            const header = Object.keys(items[0])
            let csv = [header.join(','), // header row first
                ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer).replace(/"/g, '')).join(','))].join('\n')
            console.log(csv)
            let exportedFilename = fileTitle + '.csv' || 'export.csv';

            let blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
            if (navigator.msSaveBlob) { // IE 10+
                navigator.msSaveBlob(blob, exportedFilename);
            } else {
                let link = document.createElement("a");
                if (link.download !== undefined) { // feature detection
                    // Browsers that support HTML5 download attribute
                    let url = URL.createObjectURL(blob);
                    link.setAttribute("href", url);
                    link.setAttribute("download", exportedFilename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        },
    },
})
