<template>
  <b-button
      @click="status === 'SUCCESS'? downloadfile() : startTask()">{{
      status === 'PENDING' ? 'Generating...' : status === 'FAILED' ? 'Generate CSV' : status === 'SUCCESS' ? 'Download CSV' : 'Generate CSV'
    }}
  </b-button>
</template>
<script>
import {useAppStore} from "@/store";

export default {
  name: 'DownloadCSV',
  data: () => {
    return {
      appstore: useAppStore(),
      status: '',
      task_id: '',
    }
  },
  props: ['obj'],

  methods: {
    startTask() {
      fetch(this.appstore.api + '/export/' + this.obj, {
        method: 'GET',
        headers: this.appstore.getheader()
      })
          .then(response => response.json())
          .then(data => {
            console.log('Task started with ID:', data.task_id);
            this.status = 'PENDING'
            this.task_id = data.task_id
            this.checkTaskStatus();
            // You can save the task_id to check the status or retrieve results later
          })
          .catch(error => {
            console.error('Error starting task:', error);
          });
    },
    checkTaskStatus() {
      const eventSource = new EventSource(this.appstore.api + `/export/status/${this.task_id}`);

      eventSource.onmessage = (event) => {

        const message = event.data;
        console.log(message);

        // Handle the message, e.g., update the UI
        if (message !== 'PENDING') {
          console.log('not pending')
          if (message === 'FAILED') {
            this.status = 'FAILED'
            eventSource.close();

          } else {
            this.status = 'SUCCESS'
            this.downloadfile()
            console.log(message)
            eventSource.close();

          }
        }

      };

      eventSource.onerror = (error) => {
        // Handle errors
        console.error('SSE error:', error);
        eventSource.close();
      };
    },
    downloadfile() {
      fetch(this.appstore.api + `/export/download/${this.task_id}`)
          .then(response => {
            if (response.ok) {
              response.blob().then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'data.csv';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
              });
            } else {
              console.error('Error getting CSV data:', response.statusText);
            }
          })
          .catch(error => {
            console.error('Error getting CSV data:', error);
          });
    }

  }

}
</script>
<style>
@media (min-width: 576px ) {

}
</style>