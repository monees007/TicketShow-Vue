import {defineStore} from 'pinia'
import {useAppStore} from "@/store/index";

export const useEditorStore = defineStore('EditorStore', {
    state: () => (
        {
            show_list: [],
            theatre_list: [],
            running_list: [],
            appstore: useAppStore(),
        }
    ),
    getters: {},
    actions: {

        async getData(show_or_theatre) {
            const asd = this.appstore
            const steam = (show_or_theatre === 1 ? 'theatre' : show_or_theatre === 2 ? 'running' : 'shows')
            try {
                this.loading = true;
                const response = await fetch(asd.api + "/bulk/" + steam, {
                    method: 'GET',
                    headers: asd.getheader()
                });
                if (response.status === 200) {
                    if (show_or_theatre === 1) {
                        this.theatre_list = await response.json();
                    } else if (show_or_theatre === 0) {
                        this.show_list = await response.json();
                    } else if (show_or_theatre === 2) {
                        this.running_list = await response.json();
                    }

                } else {
                    console.log(response.status, "Failed to load bulk " + steam)
                    throw new TypeError("Token expired"); // will check for token and push to log in
                }
            } catch (e) {
                console.log("Failed to load bulk" + steam, e)
            }
        },
        csvToJson(show_or_theatre) {
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
                    if (show_or_theatre) {
                        this.theatre_list = data

                    } else {
                        this.show_list = data
                    }
                }

            }

            input.click();
        },
        jsonToCSV(show_or_theatre, fileTitle = 'export') {
            let items
            if (show_or_theatre) {
                items = this.theatre_list

            } else {
                items = this.show_list
            }
            const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
            const header = Object.keys(items[0])
            let csv = [
                header.join(','), // header row first
                ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer).replace(/"/g, '')).join(','))
            ].join('\n')
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
