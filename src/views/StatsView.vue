<template>
  <div>


    <div style="margin: 35px; ">
      <b-form-select v-model="theatre" class="px-3 rounded-4 border-0" size="lg"
                     style="width: 85%; height: 40px" @change="loadData">
        <b-form-select-option :value="null">Please select a Theatre</b-form-select-option>
        <b-form-select-option v-for="t in storeX.theatre_list" :key="t.id" :value="t" style="font-size: large">{{
            t.name
          }}
        </b-form-select-option>
      </b-form-select>
      <b-form-input v-model="theatre" class="d-none rounded-end-4 border-0" list="my-list-id" placeholder="Theatre"
                    size="lg"></b-form-input>
    </div>
    <b-row v-if="theatre" class="w-100">
      <hr>
      <h1 class="align-items-start my-3" style="min-width: fit-content; font-size: xxx-large">
        {{ theatre.name }}
      </h1>
      <span class="d-none  mx-3 d-md-block disabled my-1">
        {{ theatre.place }}
      </span>
      <hr class="">

    </b-row>
    <datalist id="my-list-id">
      <option v-for="t in storeX.theatre_list" :key="t.id">{{ t.name }}</option>
    </datalist>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8   bg-gradient-success">
      <b-row>
        <b-col md="6" xl="3">
          <stats-card :sub-title="total_revenue"
                      class="mb-4"
                      icon="ni ni-active-40"
                      title="Total Revenue"
                      type="gradient-red">

            <template slot="footer">
              <span class="text-success mr-2">3.48%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col md="6" xl="3">
          <stats-card class="mb-4"
                      icon="ni ni-chart-pie-35"
                      sub-title="2,356"
                      title="Tickets Sold"
                      type="gradient-orange">

            <template slot="footer">
              <span class="text-success mr-2">12.18%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col md="6" xl="3">
          <stats-card class="mb-4"
                      icon="ni ni-money-coins"
                      sub-title="924"
                      title="Sales"
                      type="gradient-green">

            <template slot="footer">
              <span class="text-danger mr-2">5.72%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>

        </b-col>
        <b-col md="6" xl="3">
          <stats-card class="mb-4"
                      icon="ni ni-chart-bar-32"
                      sub-title="49,65%"
                      title="Performance"
                      type="gradient-info">

            <template slot="footer">
              <span class="text-success mr-2">54.8%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
      </b-row>
    </base-header>

    <!--Charts-->
    <b-container class="mt--7" fluid>
      <b-row>
        <b-col class="mb-5 mb-xl-0" xl="8">
          <card header-classes="bg-transparent" type="default">
            <b-row slot="header" align-v="center">
              <b-col>
                <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                <h5 class="h3 text-white mb-0">Sales value</h5>
              </b-col>
              <b-col>
                <b-nav class="nav-pills justify-content-end">
                  <b-nav-item
                      :active="bigLineChart.activeIndex === 0"
                      class="mr-2 mr-md-0"
                      link-classes="py-2 px-3"
                      @click.prevent="initBigChart(0)">
                    <span class="d-none d-md-block">Month</span>
                    <span class="d-md-none">M</span>
                  </b-nav-item>
                  <b-nav-item
                      :active="bigLineChart.activeIndex === 1"
                      link-classes="py-2 px-3"
                      @click.prevent="initBigChart(1)"
                  >
                    <span class="d-none d-md-block">Week</span>
                    <span class="d-md-none">W</span>
                  </b-nav-item>
                </b-nav>
              </b-col>
            </b-row>
            <line-chart
                v-if="loaded"
                ref="bigChart"
                :chart-data="bigLineChart.chartData"
                :extra-options="bigLineChart.extraOptions"
                :height="350"
            >
            </line-chart>
          </card>
        </b-col>

        <b-col class="mb-5 mb-xl-0" xl="4">
          <card header-classes="bg-transparent">
            <b-row slot="header" align-v="center">
              <b-col>
                <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                <h5 class="h3 mb-0">Total orders</h5>
              </b-col>
            </b-row>

            <bar-chart
                ref="barChart"
                :chart-data="redBarChart.chartData"
                :height="350"
            >
            </bar-chart>
          </card>
        </b-col>
      </b-row>
      <!-- End charts-->

      <!--Tables-->
      <!--      <b-row class="mt-5">-->
      <!--        <b-col xl="8" class="mb-5 mb-xl-0">-->
      <!--          <page-visits-table></page-visits-table>-->
      <!--        </b-col>-->
      <!--        <b-col xl="4" class="mb-5 mb-xl-0">-->
      <!--          <social-traffic-table></social-traffic-table>-->
      <!--        </b-col>-->
      <!--      </b-row>-->
      <!--End tables-->
    </b-container>

  </div>
</template>
<script>
// Charts
import * as chartConfigs from '@/components/Stats/config';
import LineChart from '@/components/Stats/LineChart';
import BarChart from '@/components/Stats/BarChart';

// Components
// import BaseProgress from '@/components/Stats/BaseProgress';
import StatsCard from '@/components/Stats/StatsCard';
import card from "@/components/Stats/Card.vue";
import {useEditorStore} from "@/store/useEditorStore";
import {useAppStore} from "@/store";

// // Tables
// import SocialTrafficTable from './Dashboard/SocialTrafficTable';
// import PageVisitsTable from './Dashboard/PageVisitsTable';

export default {
  components: {
    LineChart,
    BarChart,
    card,
    // BaseProgress,
    StatsCard,
    // PageVisitsTable,
    // SocialTrafficTable
  },
  data() {
    return {
      loaded: false,
      theatre: null,
      revenue_per_day: null,
      ticket_sold_per_day: null,
      ticket_sold_per_day_label: null,
      total_revenue: null,
      appstore: useAppStore(),
      storeX: useEditorStore(),
      bigLineChart: {
        allData: [
          [0, 20, 10, 30, 15, 40, 20, 60, 60],
          [0, 20, 5, 25, 10, 30, 15, 40, 40],
          [30, 2, 55, 35, 10, 60, 35, 10, 20]
        ],
        activeIndex: 0,
        chartData: {
          labels: this.ticket_sold_per_day_label,
          datasets: [
            {
              label: 'Ticket Sold per Day',
              backgroundColor: '#f87979',
              data: this.ticket_sold_per_day
            }
          ]

        },
        // extraOptions: chartConfigs.blueChartOptions,
      },
      redBarChart: {
        chartData: {
          labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Sales',
            data: [15, 20, 30, 22, 17, 29]
          }]
        },
        extraOptions: chartConfigs.blueChartOptions
      }
    };
  },
  methods: {
    async loadData() {
      const rawResponse = await fetch(this.appstore.api + '/stat/theatre?tid=' + this.theatre.id,
          {
            method: 'GET',
            headers: this.appstore.getheader(),
            // body: JSON.stringify(this.storeX.show_list[data.index])
          }
      );
      const content = await rawResponse.json();
      this.revenue_per_day = content['revenue_per_day']
      this.total_revenue = content['total_revenue']
      this.ticket_sold_per_day = content['ticket_sold_per_day']
      this.ticket_sold_per_day_label = content['ticket_sold_per_day_label']
      this.loaded = true;
    },
    initBigChart(index) {
      let chartData = this.bigLineChart.chartData
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    }
  },
  mounted() {
    this.storeX.getData(1)
    this.initBigChart(0);
  }
};
</script>
<style>
.el-table .cell {
  padding-left: 0px;
  padding-right: 0px;
}
</style>
